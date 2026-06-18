# Skin & Hair Insights — live preview

A Next.js app that lets a user upload a photo of their skin or hair, answer a
short questionnaire, and get a cosmetic care **score + feedback**. The photo is
analyzed by Claude vision through a **secure server route** (`/api/analyze`), so
your API key never reaches the browser.

> **Not medical advice.** This is a cosmetic/wellness assessment only. It does
> not diagnose, treat, or prevent any medical condition. Have the final copy and
> data-handling reviewed by a lawyer before a public launch.

---

## What's in here

```
skin-hair-analyzer/
├─ app/
│  ├─ api/analyze/route.js   ← secure server route (holds the API key)
│  ├─ layout.js
│  ├─ page.js                ← renders the component
│  └─ globals.css
├─ components/
│  └─ SkinHairAnalyzer.jsx   ← the full UI (upload → quiz → score)
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ next.config.js
└─ .env.local.example
```

---

## Step 1 — Get an Anthropic API key

1. Go to **https://console.anthropic.com** and sign in (or sign up).
2. Add a payment method and a little credit under **Billing** (vision calls cost
   roughly a fraction of a cent each).
3. Open **Settings → API Keys → Create Key**, name it (e.g. `skin-hair-app`),
   and **copy the key** (`sk-ant-...`). You won't be able to see it again.

## Step 2 — Run it locally (optional but recommended)

You need [Node.js 18+](https://nodejs.org).

```bash
cd skin-hair-analyzer
npm install

# create your local env file from the example
cp .env.local.example .env.local
# then open .env.local and paste your real key after ANTHROPIC_API_KEY=

npm run dev
```

Open **http://localhost:3000**. Upload a photo and run an analysis — it will use
real Claude vision.

> Want to click through the UI **without** spending API credits? Set
> `NEXT_PUBLIC_USE_MOCK=true` in `.env.local` and it uses built-in sample
> scoring. Set it to `false` (or remove it) for the real model.

## Step 3 — Put the code on GitHub

```bash
cd skin-hair-analyzer
git init
git add .
git commit -m "Skin & hair analyzer"
```

Create an empty repo at **https://github.com/new** (e.g. `skin-hair-analyzer`),
then:

```bash
git remote add origin https://github.com/<your-username>/skin-hair-analyzer.git
git branch -M main
git push -u origin main
```

`.gitignore` already excludes `.env.local`, so **your key is never committed.**

## Step 4 — Deploy to Vercel (this is the "live online" part)

1. Go to **https://vercel.com** and sign in with GitHub.
2. **Add New → Project**, then **Import** your `skin-hair-analyzer` repo.
3. Vercel auto-detects Next.js — leave the build settings as-is.
4. Before clicking Deploy, open **Environment Variables** and add:

   | Name                | Value                        |
   | ------------------- | ---------------------------- |
   | `ANTHROPIC_API_KEY` | your `sk-ant-...` key         |

   (Leave `NEXT_PUBLIC_USE_MOCK` out, or set it to `false`, for real analysis.)
5. Click **Deploy**. In ~1 minute you'll get a live URL like
   `https://skin-hair-analyzer.vercel.app` you can open and share.

Every future `git push` to `main` redeploys automatically.

---

## Embedding into your existing site later

- **If your site is already Next.js:** copy `components/SkinHairAnalyzer.jsx` and
  `app/api/analyze/route.js` into it, add the env var, and render
  `<SkinHairAnalyzer />` wherever you want.
- **If your site is something else (WordPress, Webflow, etc.):** keep this app
  deployed on Vercel and embed it with an `<iframe src="https://your-app.vercel.app">`.

---

## Tuning

- **Questions:** edit the `QUESTIONS` object in `SkinHairAnalyzer.jsx`.
- **Scoring instructions / output:** edit `SYSTEM_PROMPT` and `SCHEMA` in
  `app/api/analyze/route.js`.
- **Model:** change `MODEL` in the route (default `claude-sonnet-4-6`).

## Privacy & safety notes

- Photos are sent to Anthropic only for the duration of the request and are not
  stored by this app. Add your own privacy policy describing this.
- The system prompt forbids naming medical conditions and flags
  `seeProfessional: true` to route users to a professional.
- Consider adding rate limiting (e.g. Vercel's firewall or a per-IP limiter) so
  the endpoint can't be abused, since each call costs you API credit.
```
