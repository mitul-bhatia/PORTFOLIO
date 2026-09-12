# mitulbhatia.dev — Modular Engineered Editorial Portfolio

Production portfolio for **Mitul Bhatia** (AI Agent & Systems Engineer at Newton School of Technology).

Built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**. Built from the comprehensive planning corpus in [`plan/`](./plan).

---

## Design System: Option A+ (Engineered Editorial)

- **Palette**:
  - Background / Paper: `#F3E9DA`
  - Deep Ink: `#2B1D14`
  - Elevated Plate: `#EADFC8`
  - Muted Ink: `#6B5744`
  - Burnt Sienna Accent: `#A8672E`
  - Notebook Border: `#D9C9AC`
- **Typography**:
  - Display: `Fraunces`
  - Body: `Inter`
  - Labels & Code: `IBM Plex Mono`
- **Geometry**: Sharp `0px` radius sitewide. The floating AI bot launcher is the only circle in the entire product.
- **Shadow**: `shadow-notebook` (`2px 2px 0 #D9C9AC`).
- **Paper Texture**: Low Poly Grid SVG (`/public/assets/textures/haikei-lowpoly.svg`).

---

## Information Architecture & Routes

- `/` — Home (Act I: Orientation, Three Pillars, Featured AEGIS Plate)
- `/work` — Work Index (3 Flagship Case Studies + 4 Secondary Systems)
- `/work/aegis` — Flagship: Multi-Agent AI Security & Guardrail Engine (<24ms, 5-node pipeline)
- `/work/flately` — Flagship: Full-Stack & Real-Time Roommate Matching (React 19, Socket.IO, Redis)
- `/work/agrovers` — Flagship: AI Soil & Crop Intelligence (FAISS RAG, LangChain)
- `/work/creditsense` — Secondary: RBI Lending Compliance Engine
- `/work/loan-classifier` — Secondary: GEN AI Tabular Loan Classifier (XGBoost, LlamaIndex)
- `/work/f1-strategy` — Secondary: Formula 1 Strategy Intelligence (744K+ rows)
- `/work/vulnswarm` — Secondary: Autonomous Repo CVE Remediation
- `/about` — Dossier, Canonical Bio (CGPA 9.80 / 10.0), 4 Methodologies, Academics, CP
- `/skills` — 48-node technical inventory across 5 strict clusters
- `/contact` — Direct channels, resume PDF, verified GitHub/LinkedIn/LeetCode/Codeforces

---

## Local Development

No external API keys are required to run the portfolio locally.

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Verified Invariants

- **CGPA**: Strictly **9.80 / 10.0** everywhere.
- **Factual Integrity**: Derived solely from `plan/02-SOURCE-OF-TRUTH.md`.
