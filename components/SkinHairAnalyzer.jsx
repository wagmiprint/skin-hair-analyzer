"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import {
  Camera, Upload, Sparkles, Droplet, Sun, Wind, ShieldCheck,
  ChevronRight, ChevronLeft, RotateCcw, AlertTriangle, Loader2,
  CheckCircle2, Info, ScanFace, Scissors, X,
} from "lucide-react";

/**
 * SkinHairAnalyzer  —  Next.js integrated build
 * ------------------------------------------------------------------
 * Calls the secure server route at /api/analyze, which holds the
 * Anthropic API key. The key NEVER touches the browser.
 *
 * USE_MOCK: set to true to preview the full UX with no key / no API
 * cost (deterministic local scoring). Set to false to use real Claude
 * vision via /api/analyze. You can also flip it with the
 * NEXT_PUBLIC_USE_MOCK env var ("true"/"false").
 *
 * This is a COSMETIC / WELLNESS assessment, NOT a medical diagnosis.
 */

const API_ENDPOINT = "/api/analyze";
const USE_MOCK =
  (process.env.NEXT_PUBLIC_USE_MOCK ?? "false").toLowerCase() === "true";

// ----------------------------------------------------------------------
const QUESTIONS = {
  skin: [
    {
      id: "type",
      q: "How does your skin usually feel a few hours after washing?",
      options: ["Tight / dry", "Comfortable / balanced", "Shiny / oily", "Oily in some areas only"],
    },
    {
      id: "concern",
      q: "What's your main concern right now?",
      options: ["Dryness / flaking", "Breakouts", "Dullness / uneven tone", "Fine lines / texture"],
    },
    {
      id: "sun",
      q: "Do you wear SPF on most days?",
      options: ["Every day", "Sometimes", "Rarely", "Never"],
    },
    {
      id: "sensitivity",
      q: "How does your skin react to new products?",
      options: ["Often reacts / stings", "Occasionally", "Rarely", "Never"],
    },
  ],
  hair: [
    {
      id: "type",
      q: "How would you describe your hair's natural texture?",
      options: ["Straight", "Wavy", "Curly", "Coily"],
    },
    {
      id: "concern",
      q: "What's your main concern right now?",
      options: ["Dryness / frizz", "Breakage / split ends", "Thinning / shedding", "Oily scalp"],
    },
    {
      id: "wash",
      q: "How often do you wash your hair?",
      options: ["Daily", "Every 2–3 days", "Weekly", "Less than weekly"],
    },
    {
      id: "heat",
      q: "How often do you use heat styling or chemical treatments?",
      options: ["Very often", "Sometimes", "Rarely", "Never"],
    },
  ],
};

const MODE_META = {
  skin: { label: "Skin", icon: ScanFace, blurb: "Hydration, oiliness, texture & tone" },
  hair: { label: "Hair & Scalp", icon: Scissors, blurb: "Density, shine, dryness & breakage" },
};

// ----------------------------------------------------------------------
// Local mock analyzer (preview without an API key)
// ----------------------------------------------------------------------
function mockAnalyze(mode, answers) {
  const optIndex = (id) => {
    const qq = QUESTIONS[mode].find((x) => x.id === id);
    return qq ? qq.options.indexOf(answers[id]) : 1;
  };

  if (mode === "skin") {
    const hydration = [40, 80, 70, 65][optIndex("type")] ?? 65;
    const oil = [70, 80, 45, 60][optIndex("type")] ?? 65;
    const protection = [90, 65, 40, 25][optIndex("sun")] ?? 50;
    const barrier = [45, 65, 80, 90][optIndex("sensitivity")] ?? 70;
    const overall = Math.round((hydration + oil + protection + barrier) / 4);
    return {
      overallScore: overall,
      summary:
        "Your skin shows balanced characteristics overall, with the clearest opportunity in sun protection and consistent hydration.",
      metrics: [
        { label: "Hydration", score: hydration, icon: "droplet" },
        { label: "Oil Balance", score: oil, icon: "sparkles" },
        { label: "Sun Protection Habit", score: protection, icon: "sun" },
        { label: "Barrier Resilience", score: barrier, icon: "shield" },
      ],
      feedback: [
        "Looks like hydration could be more consistent — a humectant (hyaluronic acid or glycerin) layered under a moisturizer can help.",
        protection < 70
          ? "Daily broad-spectrum SPF 30+ is the single highest-impact habit for long-term skin health and tone."
          : "Great SPF habit — keep it up, and reapply when you're outdoors for long stretches.",
        "Introduce new actives one at a time, a few days apart, so you can spot what your skin likes.",
      ],
      routine: ["Gentle cleanser", "Hydrating serum", "Moisturizer", "SPF 30+ (AM)"],
      seeProfessional: false,
    };
  }

  const moisture = [45, 60, 70, 90][optIndex("wash")] ?? 60;
  const damage = [40, 65, 80, 92][optIndex("heat")] ?? 70;
  const scalp = [80, 70, 60, 50][optIndex("wash")] ?? 65;
  const concernHit = [60, 55, 50, 70][optIndex("concern")] ?? 60;
  const overall = Math.round((moisture + damage + scalp + concernHit) / 4);
  return {
    overallScore: overall,
    summary:
      "Your hair shows generally healthy traits, with the biggest gains likely from reducing damage and locking in moisture.",
    metrics: [
      { label: "Moisture", score: moisture, icon: "droplet" },
      { label: "Strand Integrity", score: damage, icon: "shield" },
      { label: "Scalp Balance", score: scalp, icon: "wind" },
      { label: "Manageability", score: concernHit, icon: "sparkles" },
    ],
    feedback: [
      damage < 70
        ? "Heat and chemical styling are the main stressors — a heat protectant and lower tool temperatures go a long way."
        : "Low heat exposure is doing your strands a favor — keep protective habits going.",
      "A weekly deep-conditioning or mask treatment will help with moisture retention and reduce frizz.",
      "Trimming every 8–12 weeks keeps split ends from traveling up the shaft.",
    ],
    routine: ["Sulfate-free shampoo", "Conditioner (mid → ends)", "Weekly mask", "Heat protectant"],
    seeProfessional: false,
  };
}

// ----------------------------------------------------------------------
// Live call to our secure server route (key stays server-side)
// ----------------------------------------------------------------------
async function callAnalyzeApi(mode, answers, imageBase64, mediaType) {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, answers, imageBase64, mediaType }),
  });
  if (!res.ok) {
    let msg = `Analysis failed (${res.status})`;
    try {
      const e = await res.json();
      if (e?.error) msg = e.error;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

// ----------------------------------------------------------------------
const METRIC_ICON = {
  droplet: Droplet, sparkles: Sparkles, sun: Sun, shield: ShieldCheck, wind: Wind,
};

function scoreColor(s) {
  if (s >= 75) return "text-emerald-600";
  if (s >= 55) return "text-amber-500";
  return "text-rose-500";
}
function scoreBar(s) {
  if (s >= 75) return "bg-emerald-500";
  if (s >= 55) return "bg-amber-400";
  return "bg-rose-400";
}
function scoreLabel(s) {
  if (s >= 80) return "Excellent";
  if (s >= 65) return "Good";
  if (s >= 50) return "Fair";
  return "Needs care";
}

function Gauge({ score }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const stroke = score >= 75 ? "#10b981" : score >= 55 ? "#f59e0b" : "#f43f5e";
  return (
    <div className="relative h-40 w-40">
      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="64" cy="64" r={r} fill="none" stroke={stroke} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${scoreColor(score)}`}>{score}</span>
        <span className="text-xs font-medium text-gray-500">{scoreLabel(score)}</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
export default function SkinHairAnalyzer() {
  const [step, setStep] = useState("intro");
  const [consent, setConsent] = useState(false);
  const [mode, setMode] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [qIndex, setQIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const fileRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Stop the webcam stream whenever the camera closes or the component unmounts.
  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraOn(false);
  }

  useEffect(() => () => stopCamera(), []);

  async function startCamera() {
    setCameraError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Your browser doesn't support camera access. Please upload a photo instead.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraOn(true);
      // Attach after render so the <video> element exists.
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 0);
    } catch (err) {
      if (err?.name === "NotAllowedError") {
        setCameraError("Camera permission was denied. Allow access in your browser, or upload a photo instead.");
      } else if (err?.name === "NotFoundError") {
        setCameraError("No camera found. Please upload a photo instead.");
      } else {
        setCameraError("Couldn't start the camera. Please upload a photo instead.");
      }
    }
  }

  function capturePhoto() {
    const video = videoRef.current;
    if (!video) return;
    const w = video.videoWidth || 720;
    const h = video.videoHeight || 720;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const base64 = dataUrl.split(",")[1];
    setImageData({ dataUrl, base64, mediaType: "image/jpeg" });
    setError(null);
    stopCamera();
  }

  const questions = mode ? QUESTIONS[mode] : [];
  const currentQ = questions[qIndex];
  const quizComplete = useMemo(
    () => mode && questions.every((q) => answers[q.id]),
    [mode, questions, answers]
  );

  function reset() {
    stopCamera();
    setCameraError(null);
    setStep("intro");
    setMode(null);
    setImageData(null);
    setAnswers({});
    setQIndex(0);
    setResult(null);
    setError(null);
    setConsent(false);
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64 = String(dataUrl).split(",")[1];
      setImageData({ dataUrl, base64, mediaType: file.type });
      setError(null);
    };
    reader.readAsDataURL(file);
  }

  async function runAnalysis() {
    setStep("analyzing");
    setError(null);
    try {
      let r;
      if (USE_MOCK) {
        await new Promise((res) => setTimeout(res, 1800));
        r = mockAnalyze(mode, answers);
      } else {
        r = await callAnalyzeApi(mode, answers, imageData.base64, imageData.mediaType);
      }
      setResult(r);
      setStep("results");
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setStep("quiz");
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4 font-sans">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-rose-50 px-5 py-4">
          <Sparkles className="h-5 w-5 text-violet-500" />
          <h1 className="text-base font-semibold text-gray-800">Skin &amp; Hair Insights</h1>
          {step !== "intro" && (
            <button
              onClick={reset}
              className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 hover:bg-white hover:text-gray-700"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Start over
            </button>
          )}
        </div>

        <div className="p-5">
          {step === "intro" && (
            <div className="space-y-5">
              <div className="flex justify-center gap-3 py-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
                  <ScanFace className="h-8 w-8 text-violet-500" />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
                  <Scissors className="h-8 w-8 text-rose-500" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Get a quick cosmetic assessment
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Upload a photo, answer 4 quick questions, and get a personalized
                  care score with tailored tips.
                </p>
              </div>

              <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>
                  <strong>Not medical advice.</strong> This tool offers cosmetic and
                  wellness suggestions only — it does not diagnose, treat, or
                  prevent any medical condition. For any skin or scalp concern,
                  please consult a licensed dermatologist or trichologist.
                </p>
              </div>

              <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-violet-600"
                />
                <span>
                  I understand this is a cosmetic assessment and not medical advice,
                  and I consent to my photo being analyzed.
                </span>
              </label>

              <button
                disabled={!consent}
                onClick={() => setStep("mode")}
                className="flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                Get started <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === "mode" && (
            <div className="space-y-4">
              <h2 className="text-center text-base font-semibold text-gray-800">
                What would you like to analyze?
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Object.entries(MODE_META).map(([key, meta]) => {
                  const Icon = meta.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setMode(key);
                        setStep("upload");
                      }}
                      className="group flex flex-col items-center gap-2 rounded-2xl border-2 border-gray-100 p-5 text-center transition hover:border-violet-300 hover:bg-violet-50"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white">
                        <Icon className="h-7 w-7 text-violet-500" />
                      </div>
                      <span className="font-semibold text-gray-800">{meta.label}</span>
                      <span className="text-xs text-gray-500">{meta.blurb}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "upload" && (
            <div className="space-y-4">
              <h2 className="text-center text-base font-semibold text-gray-800">
                Add a clear, well-lit photo
              </h2>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />

              {/* Live camera view */}
              {cameraOn ? (
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-2xl bg-black">
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="h-72 w-full object-cover"
                    />
                    <button
                      onClick={stopCamera}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                      aria-label="Close camera"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={stopCamera}
                      className="flex items-center justify-center gap-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={capturePhoto}
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                      <Camera className="h-4 w-4" /> Capture photo
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Preview / upload drop zone */}
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-10 transition hover:border-violet-300 hover:bg-violet-50"
                  >
                    {imageData ? (
                      <img
                        src={imageData.dataUrl}
                        alt="preview"
                        className="h-40 w-40 rounded-xl object-cover shadow"
                      />
                    ) : (
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                          <Upload className="h-6 w-6 text-violet-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          Click to upload a photo
                        </span>
                        <span className="text-xs text-gray-400">JPG or PNG</span>
                      </>
                    )}
                  </button>

                  {/* Action row: upload + use camera */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <Upload className="h-3.5 w-3.5" /> {imageData ? "Choose another" : "Upload photo"}
                    </button>
                    <button
                      onClick={startCamera}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <Camera className="h-3.5 w-3.5" /> Use camera
                    </button>
                  </div>
                </>
              )}

              {cameraError && (
                <p className="text-center text-xs text-rose-500">{cameraError}</p>
              )}

              <div className="flex items-start gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-500">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                <p>
                  Tip: natural lighting, a clean lens, and a close but in-focus shot
                  give the best results. Your photo is used only for this assessment.
                </p>
              </div>

              {error && <p className="text-center text-xs text-rose-500">{error}</p>}

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    stopCamera();
                    setStep("mode");
                  }}
                  className="flex items-center justify-center gap-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button
                  disabled={!imageData || cameraOn}
                  onClick={() => {
                    setQIndex(0);
                    setStep("quiz");
                  }}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === "quiz" && currentQ && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                <span>Question {qIndex + 1} of {questions.length}</span>
                <span>{MODE_META[mode].label}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-100">
                <div
                  className="h-1.5 rounded-full bg-violet-500 transition-all"
                  style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h2 className="text-base font-semibold text-gray-800">{currentQ.q}</h2>
              <div className="space-y-2">
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers((a) => ({ ...a, [currentQ.id]: opt }))}
                      className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
                        selected
                          ? "border-violet-500 bg-violet-50 font-medium text-violet-700"
                          : "border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                      {selected && <CheckCircle2 className="h-4 w-4 text-violet-500" />}
                    </button>
                  );
                })}
              </div>

              {error && <p className="text-center text-xs text-rose-500">{error}</p>}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() =>
                    qIndex === 0 ? setStep("upload") : setQIndex((i) => i - 1)
                  }
                  className="flex items-center justify-center gap-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                {qIndex < questions.length - 1 ? (
                  <button
                    disabled={!answers[currentQ.id]}
                    onClick={() => setQIndex((i) => i + 1)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    disabled={!quizComplete}
                    onClick={runAnalysis}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    <Sparkles className="h-4 w-4" /> Analyze
                  </button>
                )}
              </div>
            </div>
          )}

          {step === "analyzing" && (
            <div className="flex flex-col items-center justify-center gap-3 py-14">
              <div className="relative">
                <img
                  src={imageData.dataUrl}
                  alt="analyzing"
                  className="h-28 w-28 rounded-2xl object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">
                Analyzing your {MODE_META[mode].label.toLowerCase()}…
              </p>
              <p className="text-xs text-gray-400">Reviewing texture, tone &amp; your answers</p>
            </div>
          )}

          {step === "results" && result && (
            <div className="space-y-5">
              <div className="flex flex-col items-center gap-2">
                <Gauge score={result.overallScore} />
                <p className="max-w-sm text-center text-sm text-gray-600">{result.summary}</p>
              </div>

              {result.seeProfessional && (
                <div className="flex items-start gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p>
                    We noticed something worth a professional's eye. Consider booking
                    a licensed dermatologist or trichologist for a proper evaluation.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {result.metrics.map((m) => {
                  const Icon = METRIC_ICON[m.icon] || Sparkles;
                  return (
                    <div key={m.label}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1.5 text-gray-700">
                          <Icon className="h-4 w-4 text-gray-400" /> {m.label}
                        </span>
                        <span className={`font-semibold ${scoreColor(m.score)}`}>{m.score}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-2 rounded-full ${scoreBar(m.score)}`}
                          style={{ width: `${m.score}%`, transition: "width 1s ease" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-800">Personalized tips</h3>
                {result.feedback.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-500" />
                    <p>{f}</p>
                  </div>
                ))}
              </div>

              {result.routine?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800">Suggested routine</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.routine.map((r, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
                      >
                        {i + 1}. {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>
                  This is a cosmetic assessment, not a medical diagnosis. Persistent,
                  painful, changing, or concerning symptoms should be reviewed by a
                  licensed healthcare professional.
                </p>
              </div>

              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" /> Analyze another photo
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-400">
        Photos are processed for this assessment only. Cosmetic guidance — not a
        substitute for professional medical care.
      </p>
    </div>
  );
}
