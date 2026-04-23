# SyllaFlow — Smart Topic Segregation from Syllabus
> Problem ID: 15 | Edwisely Hackathon

Transform raw syllabus documents into clean, structured topic hierarchies using AI.

## Features
- 📄 Text paste or PDF upload
- 🧠 AI-powered topic extraction (Claude Haiku via Anthropic API)
- 🌲 Collapsible hierarchical tree UI (Units → Topics → Subtopics)
- ↓ JSON export
- 🚀 Works without API key (mock mode)

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Deployment**: Vercel
- **AI**: Anthropic Claude Haiku (optional)
- **Styling**: CSS-in-JS (no external CSS framework required)

---

## Run Locally

### 1. Clone and install
```bash
git clone <your-repo-url>
cd syllabus-app
npm install
```

### 2. Set up environment (optional)
```bash
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
# App works in mock mode without an API key
```

### 3. Start dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy on Vercel

### Option A: GitHub + Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Add environment variable: `ANTHROPIC_API_KEY` (optional)
5. Click **Deploy** ✅

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Project Structure
```
syllabus-app/
├── app/
│   ├── api/extract/route.js   # API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.jsx               # Main page
├── components/
│   ├── InputForm.jsx          # Text + PDF input
│   ├── TreeView.jsx           # Collapsible hierarchy
│   └── LoadingState.jsx       # Animated loading
├── lib/
│   ├── parser.js              # Text/PDF parser
│   ├── chunker.js             # Semantic chunker
│   └── postprocessor.js       # Clean & dedupe
├── services/
│   ├── llm.js                 # LLM extraction (+ mock)
│   └── pipeline.js            # Full pipeline orchestrator
├── .env.example
├── next.config.js
└── package.json
```

## Pipeline
```
Input (text/PDF)
    → parse         (lib/parser.js)
    → chunk         (lib/chunker.js)
    → LLM extract   (services/llm.js)
    → postprocess   (lib/postprocessor.js)
    → JSON output
```

## Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | No | Claude API key for real extraction. Falls back to mock if not set. |

---

## LLM Conversation
All Claude API interactions use this system prompt:
> "You are an expert academic syllabus parser. Given a section of a syllabus, extract a structured JSON representation. Identify units, topics, and subtopics. Maintain logical hierarchy. Remove redundancy. Return ONLY valid JSON."

Return format:
```json
{
  "unit": "Unit name",
  "topics": [
    {
      "name": "Topic name",
      "subtopics": ["subtopic 1", "subtopic 2"]
    }
  ]
}
```
