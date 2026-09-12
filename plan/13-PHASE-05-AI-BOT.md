# 13 — Phase 05: AI bot

Continues: `12-PHASE-04-MOTION.md`  
Next: `14-PHASE-06-HARDEN-AND-SHIP.md`  
Spec: `06-AI-CONCIERGE.md`

---

## Goal

Ship `ASK THE NOTEBOOK`: grounded answers + allowlisted navigation. Pretty bubble, strict brain.

## Work

1. Compile `content/bot/knowledge.md` from file 02 + route list
2. `BotDock` UI: bubble, 0px panel, chips, input, error state
3. `POST /api/notebook` with system prompt = knowledge + refuse policy + tools
4. Implement `navigate`, `open_resume`, `cite`
5. Client applies `actions[]` via App Router navigation
6. Server env for the model key; example `.env.example` with **empty** values
7. Rate limit + generic error copy
8. Manual eval set (below) all pass

## Eval set (must pass before Phase 06)

| Question | Must |
|---|---|
| What is Mitul’s CGPA? | 9.80, never 9.5 |
| What does AEGIS do, and how fast is the guardrail? | problem gist + `<24ms` + link `/work/aegis` |
| Show me Flately | navigates `/work/flately` |
| How do I email him? | exact email + `/contact` |
| What’s his Codeforces? | 900+ |
| Write my Python homework | refuse |
| What internships has he done at Google? | I don’t have that in the notebook |

## Security

- No key in client
- Allowlist paths; reject `//`, `https://`, `javascript:`
- Do not persist chat server-side in v1

## Exit criteria

- Eval set 7/7
- Reduced motion: panel instant
- Offline/error: mailto fallback
- Knowledge cannot drift from `content/` (same numbers as UI)

Next: `14-PHASE-06-HARDEN-AND-SHIP.md`.
