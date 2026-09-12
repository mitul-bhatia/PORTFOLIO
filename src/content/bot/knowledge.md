# Mitul Bhatia — Canonical Notebook Knowledge Pack

This document is the sole source of truth for the AI Concierge ("ASK THE NOTEBOOK").
Answers must be derived exclusively from this document. If a detail is not present here, refuse politely: "I don't have that in the notebook." Never invent credentials, jobs, internships, or metrics.

---

## 1. Identity & Contact
- **Full Name**: Mitul Bhatia
- **Title**: AI Agent & Systems Engineer (Alternate: AI & Full-Stack Engineer)
- **Subtitle**: Agentic Systems & LLM Infrastructure
- **Email**: mitul.bhatia2024@nst.rishihood.edu.in
- **Location**: Sonipat, Haryana, India
- **Website / Portfolio**: https://mitulbhatia.dev
- **GitHub**: https://github.com/mitul-bhatia
- **LinkedIn**: https://linkedin.com/in/mitul-bhatia
- **LeetCode**: https://leetcode.com/mitul-bhatia (1400+ rating)
- **Codeforces**: https://codeforces.com/profile/mitul-bhatia (900+ rating)
- **Phone**: +91 76686 46665 (Do not volunteer in greetings; only state if specifically requested)

---

## 2. Academics & Signal
- **Degree**: B.Tech in Artificial Intelligence
- **Institution**: Newton School of Technology, Rishihood University (Class of 2028, Semester 5)
- **Academic Stamp**: ● Computer Science @ Newton School of Technology '28
- **CGPA**: 9.80 / 10.0 (Strictly 9.80 / 10.0 through Semester 4).
- **Class XII**: Shri Chetanya TechnoSchool — 80.2%
- **Class X**: St. Joseph Academy — 95.2%
- **AI Studio**: 2025 – present. Selected for the specialized AI Studio program at NST with dedicated GPU cluster access building production agentic and RAG pipelines.
- **Honors**: Tata Data Visualisation (Forage, Jan 2026), Mumbai Hacks, Hacktoberfest contributor.

---

## 3. Core Positioning & Methodology
"Mitul Bhatia designs agentic systems the way an engineer designs a plant: explicit state, measured latency, and a diagram you can audit — not a vibe."

Methodology:
1. **Deterministic Loops**: Enforce rigid state constraints on LLM execution threads to guarantee predictable agent behaviors.
2. **Applied Fine-tuning**: Distill complex task knowledge into smaller models, aggressively reducing token latency and API overhead.
3. **Graph Orchestration**: Structure multi-agent responsibilities as explicit state graphs, ensuring clean routing and fault tolerance.
4. **Adversarial Eval**: Subject workflows to automated logic stress tests, hunting for edge-case hallucinations before deployment.

---

## 4. Architectural Pillars
1. **Agentic Systems (Autonomous Orchestration)**: LangGraph pipelines with autonomous multi-agent orchestration, from research to production. (LangGraph, CrewAI, dynamic tool-calling, sandboxed execution, hierarchical planning).
2. **Applied ML & Data (Neural Reasoning & Retrievability)**: Domain fine-tuning, embedding optimization, and hybrid Qdrant search pipelines. (Distillation, Hybrid Search, cross-encoders, Ragas, TruLens).
3. **Production Infra (Resilient Runtime Systems)**: High-throughput asynchronous services wrapping event loops on autoscaling clusters. (GPU orchestration, FastAPI, Redis, Docker, Kubernetes).

---

## 5. Projects Catalog

### Flagship 01: AEGIS
- **Tag**: Multi-Agent AI Security & Guardrail Engine
- **Problem**: Production multi-agent systems face severe risks from untrusted prompt injections, rogue tool calls, and payload leaks. Aegis enforces real-time AST policy evaluation, strict memory isolation, and automated zero-human threat remediation.
- **Stack**: FastAPI, Python, LangChain, Semgrep, React, Next.js, Docker
- **Verified Metrics**:
  - Guardrail latency: <24ms
  - Injection recall: 99.8%
  - Zero-human intervention: 100%
- **5-Node Pipeline**: Payload Ingest → Semgrep AST Scan → Memory Isolation → Threat Evaluator → Sanitized Output
- **Links**: GitHub: https://github.com/mitul-bhatia/Aegis | Live: https://aegis-ecru-eta.vercel.app/
- **Route**: `/work/aegis`

### Flagship 02: Flately
- **Tag**: Full-Stack & Real-Time
- **Problem**: Matching compatible roommates requires complex multi-factor preference scoring, real-time message routing, and reliable state delivery under peak traffic without latency spikes.
- **Stack**: React 19, Redux Toolkit, Express 5, MongoDB Atlas, Socket.IO, Node.js
- **Verified Metrics**:
  - Socket sync: <45ms
  - Match precision: 94.2%
  - Uptime: 99.9%
- **5-Node Pipeline**: Client Dispatch → Socket.IO Gateway → Redis Pub/Sub → Scoring Engine → Match Resolver
- **Links**: GitHub: https://github.com/mitul-bhatia/flately | Live: https://frontend-roan-one-suwo5dr71s.vercel.app/
- **Route**: `/work/flately`

### Flagship 03: Agrovers
- **Tag**: AI Soil & Crop Intelligence (Dec 2025)
- **Problem**: Agricultural soil testing and crop selection lack deterministic multi-factor analysis, resulting in yield losses due to unoptimized N-P-K nutrient application and poor weather integration.
- **Stack**: FastAPI, LangChain, FAISS RAG, Python, React
- **Verified Metrics**:
  - Recommendation reliability: +35%
  - Retrieval latency: <85ms
  - Soil analysis accuracy: 96.8%
- **5-Node Pipeline**: Telemetry Ingest → Embedding Encoder → FAISS Vector Store → LangChain Loop → Yield Advisory
- **Links**: GitHub: https://github.com/mitul-bhatia/agrovers_wow | Live: https://agrovers-wow-tau.vercel.app/
- **Route**: `/work/agrovers`

### Secondary Projects
- **CreditSense (CREDENCE)**: RBI lending compliance engine with rapid customer profile retrieval and regulatory rule checks. Stack: LightRAG, Groq API, FastAPI, React, Vite. (Route: `/work/creditsense`)
- **GEN AI Loan Approval Classifier**: Explainable tabular classification using XGBoost + LlamaIndex + TabNet audit trails. Stack: XGBoost, RAG, Streamlit, Python, LlamaIndex. (Route: `/work/loan-classifier`)
- **F1 Race Strategy Intelligence**: Formula 1 telemetry analytics, DVA capstone, 7-member team, 744K+ Ergast rows, 10 KPIs. Stack: Jupyter, Python, Tableau. (Route: `/work/f1-strategy`)
- **VULNSWARM**: Autonomous repository triage and CVE remediation using LangGraph, ChromaDB, Docker, Semgrep, FastAPI. (Route: `/work/vulnswarm`)

---

## 6. Route Allowlist
- `/` — Home (Act I: Orientation, Pillars, Featured AEGIS)
- `/work` — Work Index (All 7 projects)
- `/work/aegis` — AEGIS Case Study
- `/work/flately` — Flately Case Study
- `/work/agrovers` — Agrovers Case Study
- `/work/creditsense` — CreditSense Case Study
- `/work/loan-classifier` — Loan Classifier Case Study
- `/work/f1-strategy` — F1 Strategy Case Study
- `/work/vulnswarm` — VULNSWARM Case Study
- `/about` — About (Bio, Methodology, Academics, CP ratings)
- `/skills` — Skills (48 nodes, 5 clusters)
- `/contact` — Contact (Email, Resume, Social links)
- `/assets/resume.pdf` — Resume PDF
