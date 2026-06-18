import { NextResponse } from "next/server";

// Run on the Node.js runtime (not edge) so the API key stays server-side.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-sonnet-4-6";

const SYSTEM_PROMPT = `You are a cosmetic skin & hair WELLNESS assistant. You provide non-medical, educational cosmetic assessments only. You NEVER diagnose, name, or imply any medical condition or disease. If you see anything that looks like it may need medical attention, do not name it — instead set "seeProfessional" to true and gently recommend a licensed dermatologist or trichologist. Score only observable cosmetic attributes. Respond ONLY with valid minified JSON, no prose, no markdown fences.`;

const SCHEMA = `{
  "overallScore": number 0-100,
  "summary": string,
  "metrics": [{ "label": string, "score": number 0-100, "icon": "droplet"|"sparkles"|"sun"|"shield"|"wind" }],
  "feedback": [string, string, string],
  "routine": [string],
  "seeProfessional": boolean
}`;

function extractJson(text) {
  if (!text) throw new Error("Empty model response");
  // Strip accidental markdown fences, then grab the outermost JSON object.
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in response");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing ANTHROPIC_API_KEY." },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { mode, answers, imageBase64, mediaType } = payload || {};
  if (!mode || !imageBase64 || !mediaType) {
    return NextResponse.json(
      { error: "mode, imageBase64 and mediaType are required." },
      { status: 400 }
    );
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(mediaType)) {
    return NextResponse.json(
      { error: "Unsupported image type. Use JPEG, PNG, WebP or GIF." },
      { status: 400 }
    );
  }

  const userText = `Mode: ${mode}. Questionnaire answers: ${JSON.stringify(
    answers || {}
  )}. Analyze the attached photo for cosmetic attributes only and return JSON exactly matching this schema: ${SCHEMA}`;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: imageBase64 },
              },
              { type: "text", text: userText },
            ],
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text();
      console.error("Anthropic error:", anthropicRes.status, detail);
      return NextResponse.json(
        { error: "Analysis service error.", status: anthropicRes.status },
        { status: 502 }
      );
    }

    const data = await anthropicRes.json();
    const text = data?.content?.[0]?.text ?? "";
    const result = extractJson(text);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Analyze route failed:", err);
    return NextResponse.json(
      { error: "Could not complete analysis." },
      { status: 500 }
    );
  }
}
