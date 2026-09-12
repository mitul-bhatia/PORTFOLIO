# 02 — Source of truth

Continues: `01-STORY.md`  
Next: `03-PRODUCT.md`  
Input: `/mydata.md` (complete extract) + `/prd.md` §2 conflicts

If copy, the bot, SEO, or a case study disagree with this file, **this file wins**.

---

## Identity

| Field | Value |
|---|---|
| Full name | Mitul Bhatia |
| Primary title | AI Agent & Systems Engineer |
| Alternate title (resume/meta ok) | AI & Full-Stack Engineer |
| Subtitle | Agentic Systems & LLM Infrastructure |
| Email | mitul.bhatia2024@nst.rishihood.edu.in |
| Phone | +91 76686 46665 (Contact page / resume; **do not** put in hero or bot greeting) |
| Location | Sonipat, Haryana, India |
| Domain | https://mitulbhatia.dev |
| GitHub | https://github.com/mitul-bhatia |
| LinkedIn | https://linkedin.com/in/mitul-bhatia |
| LeetCode | https://leetcode.com/mitul-bhatia |
| Codeforces | https://codeforces.com/profile/mitul-bhatia |

---

## Resolved contradictions

| Topic | Decision | Do not use |
|---|---|---|
| CGPA | **9.80 / 10.0** (resume, through Semester 4) | 9.5 / 10.0 in any UI, meta, or bot answer |
| React on Flately | **React 19** as project fact | Do not “fix” Flately copy to React 18 |
| Site stack for this rebuild | Next.js App Router + React 19 + TypeScript | Mixing React 18 site with React 19 copy without noting it |
| Hero | Multi-page Home with a strong first viewport; **optional** long scrollytelling chapter — not the whole product | Assuming the entire site is a 400vh WebGL scene |
| WebGL `Scene.tsx` | **Out of default scope** for this rebuild. 2D DOM + SVG + motion. Revisit only if Phase 04 still feels thin | Rebuilding a vestigial R3F canvas “because old CLAUDE.md said so” |

---

## Academics & signal

- **Degree:** B.Tech in Artificial Intelligence
- **School:** Newton School of Technology, Rishihood University
- **Years:** 2024 – 2028 (Class of 2028, currently Semester 5 as of the source extract)
- **CGPA:** 9.80 / 10.0
- **Class XII:** Shri Chetanya TechnoSchool — 80.2%
- **Class X:** St. Joseph Academy — 95.2%
- **LeetCode:** 1400+
- **Codeforces:** 900+
- **AI Studio:** 2025 – present; dedicated GPU cluster; production agentic + RAG pipelines
- **Tata Data Visualisation** (Forage, Jan 2026)
- **Mumbai Hacks**
- **Hacktoberfest contributor**

School percentages live on About / resume, not the Home hero.

---

## Canonical copy (use, do not paraphrase into weaker English)

### Hero stamp

`● Computer Science @ Newton School of Technology '28`

(Degree is AI; the stamp historically said Computer Science. Keep the stamp as a brand line; About states B.Tech Artificial Intelligence explicitly.)

### Meta description

Portfolio of Mitul Bhatia — Computer Science student at Newton School of Technology specializing in multi-agent systems, LangGraph pipelines, RAG architecture, and production AI infrastructure.

### Open Graph

Architecting autonomous coordination loops, RAG pipelines, and high-reliability AI infrastructure.

### About bio (CGPA corrected)

I am an AI Systems Engineer currently pursuing a B.Tech in Artificial Intelligence at Newton School of Technology, Rishihood University (Class of 2028), holding a CGPA of 9.80/10.0.

My technical focus lies at the intersection of agentic orchestration loops, memory consistency, and predictable scaling runtimes. When I am not designing state machines in LangGraph, I test my skills algorithmically: I am rated 1400+ on LeetCode and 900+ on Codeforces.

### Resume summary

AI/CS undergraduate selected for the AI Studio program at Newton School of Technology. Builds production-oriented agentic systems end-to-end — multi-agent orchestration (LangGraph), RAG pipelines, and full-stack apps (FastAPI, Next.js, PostgreSQL). Product-first engineering mindset with a competitive-programming foundation (1400+ LeetCode, 900+ Codeforces).

---

## Methodology (About)

1. **Deterministic Loops** — I enforce rigid state constraints on LLM execution threads to guarantee predictable agent behaviors.
2. **Applied Fine-tuning** — I distill complex task knowledge into smaller models, aggressively reducing token latency and API overhead.
3. **Graph Orchestration** — I structure multi-agent responsibilities as explicit state graphs, ensuring clean routing and fault tolerance.
4. **Adversarial Eval** — I subject my workflows to automated logic stress tests, hunting for edge-case hallucinations before deployment.

---

## Pillars (keep proof points)

### 1. Agentic Systems — Autonomous Orchestration

Proof: LangGraph pipelines with autonomous multi-agent orchestration, from research to production.

- Multi-agent loop design (LangGraph, CrewAI)
- Dynamic tool-calling & sandbox executions
- Hierarchical planning & state machine control
- Short/Long-term vector database memory integration

### 2. Applied ML & Data — Neural Reasoning & Retrievability

Proof: Domain fine-tuning, embedding optimization, and hybrid Qdrant search pipelines.

- Supervised fine-tuning & model distillation
- Advanced RAG (Hybrid Search, Re-ranking)
- High-volume data streaming pipelines
- Evaluation framework integration (Ragas, TruLens)

### 3. Production Infra — Resilient Runtime Systems

Proof: High-throughput asynchronous services wrapping event loops on autoscaling clusters.

- GPU orchestration & autoscaling nodes
- Async event-driven execution (FastAPI, Redis)
- Dockerization, Kubernetes, & cloud deployments
- Low-latency streaming & token caching layers

---

## Projects

### Flagship 01 — AEGIS

- Tag: Multi-Agent AI Security & Guardrail Engine
- Problem: Production multi-agent systems face severe risks from untrusted prompt injections, rogue tool calls, and payload leaks. Aegis enforces real-time AST policy evaluation, strict memory isolation, and automated zero-human threat remediation.
- Stack: FastAPI, Python, LangChain, Semgrep, React, Next.js, Docker
- Metrics: Guardrail latency **<24ms** · Injection recall **99.8%** · Zero-human intervention **100%**
- Reflection: Autonomous multi-agent guardrails filtering malicious payloads and enforcing strict execution bounds before tools execute.
- Nodes: Payload Ingest → Semgrep AST Scan → Memory Isolation → Threat Evaluator → Sanitized Output
- GitHub: https://github.com/mitul-bhatia/Aegis
- Live: https://aegis-ecru-eta.vercel.app/

### Flagship 02 — Flately

- Tag: Full-Stack & Real-Time
- Problem: Matching compatible roommates requires complex multi-factor preference scoring, real-time message routing, and reliable state delivery under peak traffic without latency spikes.
- Stack: React 19, Redux Toolkit, Express 5, MongoDB Atlas, Socket.IO, Node.js
- Metrics: Socket sync **<45ms** · Match precision **94.2%** · Uptime **99.9%**
- Reflection: Implement horizontal Redis Pub/Sub scaling across WebSocket worker instances to handle high concurrent chat volume with zero message loss.
- Nodes: Client Dispatch → Socket.IO Gateway → Redis Pub/Sub → Scoring Engine → Match Resolver
- GitHub: https://github.com/mitul-bhatia/flately
- Live: https://frontend-roan-one-suwo5dr71s.vercel.app/

### Flagship 03 — Agrovers

- Tag: AI Soil & Crop Intelligence (Dec 2025)
- Problem: Agricultural soil testing and crop selection lack deterministic multi-factor analysis, resulting in yield losses due to unoptimized N-P-K nutrient application and poor weather integration.
- Stack: FastAPI, LangChain, FAISS RAG, Python, React
- Metrics: Rec reliability **+35%** · Retrieval latency **<85ms** · Soil analysis acc. **96.8%**
- Reflection: Integrate multi-modal satellite spectral imagery to automatically validate soil nitrogen-phosphorus-potassium readings and soil moisture.
- Nodes: Telemetry Ingest → Embedding Encoder → FAISS Vector Store → LangChain Loop → Yield Advisory
- GitHub: https://github.com/mitul-bhatia/agrovers_wow
- Live: https://agrovers-wow-tau.vercel.app/

### Secondary

| Name | One-liner | Stack | Links |
|---|---|---|---|
| CreditSense (CREDENCE) | RBI lending compliance engine with rapid customer profile retrieval and regulatory rule checks | LightRAG, Groq API, FastAPI, React, Vite | https://github.com/mitul-bhatia/creditsense |
| GEN AI Loan Approval Classifier | Explainable tabular classification: XGBoost + LlamaIndex + TabNet audit trails | XGBoost, RAG, Streamlit, Python, LlamaIndex | GitHub + https://genailoanapproval-fdwemcnw96p8fgwpen6xcd.streamlit.app/ |
| F1 Race Strategy Intelligence | DVA capstone, 7-member team, 744K+ Ergast rows, 10 KPIs | Jupyter, Python, Tableau | https://github.com/mitul-bhatia/Sec-A_g-4_F1_Race_Strategy_Intelligence |
| VULNSWARM | Autonomous repo triage and CVE remediation | LangGraph, ChromaDB, Docker, Semgrep, FastAPI | https://github.com/mitul-bhatia/zombie-api-defense-operator |

Do not invent extra metrics for secondary projects.

---

## Skills (48 nodes, five clusters)

Keep this taxonomy on the Skills page. Do not flatten into a logo cloud.

1. **Agentic Orchestration & Protocols** — MCP, LangGraph, CrewAI, AutoGen, LangChain, LlamaIndex, Tool / Function Calling, Sub-Graph Compiling, Episodic & Semantic Memory, Hierarchical Planning
2. **Models, Fine-Tuning & Inference Runtimes** — PyTorch, Hugging Face Transformers, vLLM, Ollama, Groq LPU API, Anthropic Claude API, OpenAI API, LoRA & QLoRA, Quantization (GGUF / AWQ), Model Distillation
3. **RAG, Vector DBs & Knowledge Retrieval** — Qdrant, ChromaDB, FAISS, Pinecone, Hybrid Search, GraphRAG / LightRAG, Cross-Encoder Reranking, BM25, Ragas & TruLens
4. **Backend, Async Runtime & Infrastructure** — Python 3.12+, FastAPI, Asyncio, Redis & Celery, PostgreSQL, MongoDB, Docker & Compose, Kubernetes, gRPC & WebSockets
5. **Frontend UI, Languages & Engineering Tools** — TypeScript, Next.js 14 (App Router), React 19, Tailwind CSS, Framer Motion (record on-site as Motion / Motion.dev after the rename), Git & GitHub Actions, Vercel / Cloud Deploy, VS Code & MCP Dev

---

## Assets expected at build time

| Path (suggested) | Use |
|---|---|
| `/public/assets/portrait.jpg` | About |
| `/public/assets/resume.pdf` | Nav, Contact, bot “resume” intent |
| `/public/assets/og-image.png` | 1200×630 |
| `/public/assets/projects/aegis.jpg` etc. | Case study stills |
| `/public/assets/textures/haikei-lowpoly.svg` | Generated in Phase 01, not from mydata |

If an asset is missing, the builder uses a paper-framed placeholder labeled with the filename — never a stock Unsplash face.

Next: product purpose and users — `03-PRODUCT.md`.
