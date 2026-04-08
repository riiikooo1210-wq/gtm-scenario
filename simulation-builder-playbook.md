---
name: creating-scenarios
description: >
  Create job simulation scenarios for any role — interconnected, progressively difficult workplace scenarios
  with a fictional company backdrop, detailed instructions, and AI-gradable numeric rubrics.
  Use this skill whenever the user wants to build job simulations, hiring assessments, candidate evaluation scenarios,
  role-play exercises for recruitment, situational judgment tests, or work-sample tests.
  Also trigger when the user mentions "job simulation", "hiring scenario", "candidate assessment",
  "work simulation", "day-in-the-life exercise", "practical test for hiring", or asks to
  "create scenarios for a [job title]". Even if the user just names a job title and says
  "build me a simulation" or "create an assessment", this is the skill to use.
---

# Creating Scenarios — Job Simulation Builder

You are building a single comprehensive Markdown document that an HR team will use to evaluate
job candidates through realistic, interconnected workplace scenarios. The document is also
designed so that an AI grader can later assess candidate responses using the rubrics you define.

## Overall Workflow

There are three phases. Complete them in order.

### Phase 1: Research the Role

Before writing anything, develop a solid understanding of the job.

1. **Web research.** Search for the job title the user gives you. Look for:
   - Common day-to-day responsibilities (not just the job description bullet points — look for blog posts, Reddit threads, Glassdoor reviews, and "day in the life" content that reveal what the job *actually* feels like)
   - Typical challenges and friction points people in this role face
   - Skills that separate great performers from average ones
   - Tools, systems, or processes commonly used

2. **Confirm with the user.** Present a short summary of what you found — the 5–7 key responsibility areas and the most interesting challenges. Ask the user:
   - Does this match the role they have in mind?
   - Are there specific aspects they want emphasized or excluded?
   - Any company-specific context they want woven in?

Only proceed to Phase 2 after the user confirms.

### Phase 2: Design the Narrative Arc

The scenarios must feel like a **connected story** — a candidate's first week or a single challenging project that unfolds across stages. They should NOT feel like random test questions.

**Default: 3 scenarios.** Three scenarios is the sweet spot for most assessments — enough to test a range of skills while keeping total time to 20–30 minutes (which maximizes candidate completion rates). Only go to 4–5 scenarios if the user explicitly asks for more.

**Difficulty progression (3-scenario default):**

| Scenario | Difficulty | What it tests |
|----------|-----------|---------------|
| 1 | Easy | Can the candidate execute a clear task correctly and demonstrate foundational knowledge of the role? |
| 2 | Medium | Can they diagnose problems, think analytically, and propose actionable solutions with incomplete information? |
| 3 | Hard | Can they handle a high-pressure, multi-dimensional situation that tests everything from Scenarios 1–2 combined? |

If 5 scenarios are requested, use this expanded progression:

| Scenario | Difficulty | What it tests |
|----------|-----------|---------------|
| 1 | Easy | Can the candidate follow a clear process and execute a straightforward task correctly? |
| 2 | Easy–Medium | Can they handle a task with minor ambiguity or a small wrinkle that requires judgment? |
| 3 | Medium | Can they manage competing priorities, coordinate with others, or deal with incomplete information? |
| 4 | Medium–Hard | Can they solve a problem with no obvious right answer, navigate conflict, or make a tough tradeoff? |
| 5 | Hard | Can they handle a high-pressure, multi-dimensional situation that tests everything from Scenarios 1–4 combined? |

**Narrative thread:** Each scenario should build on the one before it. The outcome of Scenario 1 should set the stage for Scenario 2. The final scenario should deal with consequences and complexities that have been accumulating. When the final scenario involves multiple simultaneous crises, make sure they are **interconnected** — each crisis should feed into or be usable as leverage for the others. Isolated crises that don't connect to each other add complexity without adding strategic depth.

Example of a connected thread (for a Customer Success Manager role, 3 scenarios):
- Scenario 1: Onboard a new client using the standard playbook
- Scenario 2: The client from Scenario 1 requests a feature that doesn't exist, and a second client escalates a billing issue — diagnose what's going wrong and propose fixes
- Scenario 3: The original client threatens to leave and leadership wants a retention strategy — but a surprise product announcement creates both a crisis to manage and a tool to save the client

### Phase 3: Write the Document

Produce a single Markdown file with the following structure:

---

```
# [Job Title] — Simulation Assessment

## Company Background
[A fictional but realistic company profile. Include: company name, industry, size,
stage (startup/growth/enterprise), products or services, recent news or context
that's relevant to the scenarios. Make it vivid enough that the candidate can
"get into character" but concise — 150–250 words.]

## How This Assessment Works
[Brief instructions for the candidate. Explain that there are N connected scenarios
of increasing difficulty. State the expected TOTAL time (e.g., "20–30 minutes total
across all 3 scenarios"). Clarify what format responses should take — emphasize that
candidates should produce actual deliverables, not describe what they would do.]

---

## Scenario 1: [Title]
**Difficulty:** Easy
**Estimated Time:** [X minutes]

### Context
[Set the scene. What just happened? What does the candidate know? What tools or
resources do they have access to? Be specific enough that the candidate can act
without guessing what you meant.]

### Your Task
[Clear, actionable instructions. What exactly does the candidate need to do?
What deliverable or decision is expected?]

### Grading Rubric

#### Criteria
For each criterion below, the AI grader must produce exactly two things:
1. **A score from 0–10** using this scale:
   - **9–10:** Exceptional — exceeds expectations for the role; demonstrates mastery
   - **7–8:** Strong — meets expectations with clear competence; minor gaps only
   - **4–6:** Developing — shows some understanding but significant gaps in execution or depth
   - **0–3:** Insufficient — fails to meet basic expectations for the role
2. **A one-sentence comment that cites specific evidence** — The comment MUST reference
   a concrete detail from the candidate's response (e.g., a specific choice they made,
   a phrase they wrote, an action they proposed, or something they omitted). Generic
   comments like "good analysis" or "could be better" are not acceptable.
   Example of a good comment: "Candidate included two government accounts despite the
   company lacking FedRAMP authorization, showing a gap in ICP awareness."
   Example of a bad comment: "Account selection was reasonable overall."

This evidence requirement applies to ALL criteria across ALL scenarios below.

**[Criterion 1 Name]**
- 9–10: [What this looks like — be specific enough for an AI to judge]
- 7–8: [What this looks like]
- 4–6: [What this looks like]
- 0–3: [What this looks like]

**[Criterion 2 Name]**
- 9–10: ...
- 7–8: ...
- 4–6: ...
- 0–3: ...

[Typically 2–4 criteria per scenario. Choose criteria that reflect what actually
matters for the role, not generic things like "communication" unless communication
IS the point of the scenario.]

---

## Scenario 2: [Title]
[Same structure as above, but explicitly reference what happened in Scenario 1
to maintain the narrative thread.]

...

## Scenario N: [Title]
[Same structure. This should be the culmination — the hardest scenario that
pulls together skills tested in all previous scenarios.]

---

## Grading Summary Template

When grading, the AI must fill in **every row** with a score (0–10) AND a one-sentence
comment **that cites specific evidence from the candidate's response** (a quote, a specific
choice they made, or a concrete omission). No criterion should be left without both.
Do NOT write generic comments.

| Scenario | Criterion | Score (0–10) | Evidence-Based Comment |
|----------|-----------|:------------:|------------------------|
| 1 | [Criterion name] | [0–10] | [Cite specific evidence from candidate's response] |
| 1 | [Criterion name] | [0–10] | [Cite specific evidence] |
| 2 | [Criterion name] | [0–10] | [Cite specific evidence] |
| ... | ... | ... | ... |

**Total Score: [sum] / [max possible]**

[Calculate max possible as: number of criteria × 10. Then set hiring thresholds
at approximately these percentages of the max:]

Score interpretation:
- **80–100%:** Strong Hire — consistently exceptional across scenarios
- **65–79%:** Hire — strong overall with minor gaps
- **45–64%:** Lean No Hire — some competence shown but significant concerns
- **0–44%:** No Hire — does not meet expectations for the role

### Overall Assessment
[The AI grader writes a holistic summary: overall readiness for the role,
standout strengths, areas of concern, and a hiring recommendation based on
the total score above, with justification.]
```

---

## Design Principles

These principles come from iterative testing and should guide every decision you make:

### 1. Optimize for signal per minute, not volume

Candidates are busy — especially employed ones interviewing at multiple companies. Every element
should earn its place. Before adding a task element, ask: "Does this test a distinct skill, or
does it overlap with something I'm already testing?" If it overlaps, cut it.

- **Prefer fewer, higher-quality deliverables.** Asking for 5 accounts with strong reasoning
  tests more than asking for 15 accounts where the candidate pads with filler picks.
- **Keep total time to 20–30 minutes** for a 3-scenario assessment. If a scenario requires a
  lengthy deliverable (like a full strategy doc), allocate time honestly — don't pack a 2-hour
  task into a "15-minute scenario."

### 2. Only score what you explicitly ask for

If the rubric rewards something, the task instructions MUST ask for it. Candidates shouldn't
be penalized for not doing something they weren't told to do.

- **Bad:** Task says "organize the list in priority order" → rubric scores whether they
  explained their prioritization framework. (They were never asked to explain it.)
- **Good:** Task says "organize the list in priority order and briefly explain the criteria
  you used to prioritize" → rubric scores their framework. (Now it's fair.)

Audit every rubric criterion against the task instructions. If there's a mismatch, fix
the instructions.

### 3. Minimize cognitive overhead in scenarios

Scenarios should test the candidate's job skills, not their ability to track complex fictional
setups. Keep the number of characters low — 2 people in a scene is usually enough to deliver
all necessary information. More characters means the candidate spends time parsing who said
what instead of thinking strategically.

- **Bad:** A pipeline review with 4 people each giving one piece of information.
- **Good:** A pipeline review with 2 people — one delivers the qualitative signal, the other
  sets up the task. Same information, less overhead.

### 4. Don't duplicate rubric guidance

Each criterion in the rubric should be the single source of truth for grading that dimension.
Do NOT add separate "Key Signals to Watch For" sections — they create redundancy and risk
confusing the AI grader about which set of criteria to prioritize. If something is important
enough to watch for, it belongs in the rubric level descriptions themselves.

### 5. Use a 0–10 numeric scale, not labels

Numeric scores are easier to understand, compare across candidates, and aggregate into a
total. Labels like "Exceptional/Proficient/Developing/Insufficient" are subjective and hard
to sum. The 0–10 scale with defined bands (9–10, 7–8, 4–6, 0–3) gives the same qualitative
anchoring while enabling quantitative comparison.

### 6. Every grading comment must cite specific evidence

This is the most important grading rule. Without it, AI graders default to vague comments
like "strong analysis" that don't help compare candidates or justify hiring decisions. The
rubric must explicitly instruct the grader to reference concrete details — a specific choice
the candidate made, a phrase they wrote, an action they proposed, or something they omitted.
Include a good example and a bad example in the rubric instructions so the grader knows
exactly what's expected.

### 7. Connect crises in the final scenario

When the hardest scenario involves multiple simultaneous problems, make them interconnected
so that solving one helps solve another. This tests strategic thinking (can the candidate
see connections?) rather than just time management (can they juggle unrelated tasks?).

- **Bad:** Deal is falling apart + SDR quits + product launch. The SDR quitting is isolated
  — it doesn't help or hinder the other two situations.
- **Good:** Deal is falling apart + product launch pulled forward. The product launch is both
  a workstream to manage AND ammunition for saving the deal. The candidate who sees the
  connection demonstrates higher-order thinking.

### 8. Use realistic details

Don't say "Client A is unhappy." Say "Priya Sharma from NovaTech sent a frustrated email at
9:47 AM saying their dashboard has been showing stale data for three days and she has a board
meeting tomorrow." Specificity makes the scenario immersive and testable.

### 9. Include just enough ambiguity

Real work is messy. In medium and hard scenarios, intentionally leave some information
incomplete or contradictory. The point is to see how the candidate navigates uncertainty —
not to trick them, but to mirror reality.

### 10. Keep the company background consistent

Every scenario should reference the same fictional company. Details introduced in the
background (company size, industry norms, team structure) should influence how scenarios
play out.

## AI Grader JSON Output Format

The simulation document is designed to be consumed by an AI grading agent. When the system
sends the scenario questions, candidate answers, and grading rubric to the AI agent, the
agent must return a JSON response in the following exact structure so the frontend can
parse and display it.

### Schema

```json
{
  "candidate_id": "string",
  "simulation": "string",
  "graded_at": "ISO 8601 timestamp",
  "scenarios": [
    {
      "scenario_number": 1,
      "scenario_title": "string",
      "criteria": [
        {
          "criterion": "string",
          "score": 0,
          "comment": "string"
        }
      ]
    }
  ],
  "total_score": 0,
  "max_score": 0,
  "score_percentage": 0.0,
  "recommendation": "Strong Hire | Hire | Lean No Hire | No Hire",
  "overall_assessment": "string"
}
```

### Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| `candidate_id` | string | Identifier for the candidate (passed in by the system) |
| `simulation` | string | The job title slug (e.g., `"gtm-manager"`) |
| `graded_at` | string | ISO 8601 timestamp of when grading was completed |
| `scenarios` | array | One entry per scenario |
| `scenarios[].scenario_number` | integer | 1-indexed scenario number |
| `scenarios[].scenario_title` | string | Title of the scenario (e.g., `"Building Your First Enterprise Target Account List"`) |
| `scenarios[].criteria` | array | One entry per grading criterion in that scenario |
| `scenarios[].criteria[].criterion` | string | Name of the criterion (e.g., `"Account Selection Quality"`) |
| `scenarios[].criteria[].score` | integer | 0–10 score |
| `scenarios[].criteria[].comment` | string | One sentence citing specific evidence from the candidate's response. Must reference a concrete detail — not a generic statement |
| `total_score` | integer | Sum of all criterion scores |
| `max_score` | integer | Number of criteria × 10 |
| `score_percentage` | float | `total_score / max_score`, rounded to 2 decimal places (e.g., `0.82`) |
| `recommendation` | string | One of exactly four values: `"Strong Hire"`, `"Hire"`, `"Lean No Hire"`, `"No Hire"` |
| `overall_assessment` | string | 2–4 sentence holistic summary: readiness for the role, standout strengths, areas of concern, and justification for the recommendation |

### Recommendation Thresholds

The `recommendation` field is derived from `score_percentage`:

| Percentage | Recommendation |
|:----------:|----------------|
| 80–100% | Strong Hire |
| 65–79% | Hire |
| 45–64% | Lean No Hire |
| 0–44% | No Hire |

### Example Response

```json
{
  "candidate_id": "cand_8f3k2m",
  "simulation": "gtm-manager",
  "graded_at": "2026-04-03T14:32:00Z",
  "scenarios": [
    {
      "scenario_number": 1,
      "scenario_title": "Building Your First Enterprise Target Account List",
      "criteria": [
        {
          "criterion": "Account Selection Quality",
          "score": 7,
          "comment": "4 of 5 accounts fit the ICP well, but the candidate included a federal agency despite Vantage Shield lacking FedRAMP authorization."
        },
        {
          "criterion": "Rationale & Entry Point Strategy",
          "score": 8,
          "comment": "Rationales cited specific triggers like Meridian's $200M cloud migration and a recent HIPAA audit finding, and entry points targeted VP-level security roles rather than generic CxO outreach."
        },
        {
          "criterion": "Prioritization Logic",
          "score": 6,
          "comment": "Candidate stated they prioritized by 'deal size potential' but didn't explain why their #1 pick (a healthcare company) ranked above their #2 (a fintech with an active cloud migration), making the framework feel incomplete."
        }
      ]
    },
    {
      "scenario_number": 2,
      "scenario_title": "The Pipeline Review That Reveals a Problem",
      "criteria": [
        {
          "criterion": "Diagnostic Depth",
          "score": 9,
          "comment": "Identified that the persona targeting issue (hitting IT Directors instead of security leaders) was the upstream cause of both the low response rate and the category education problem on discovery calls, connecting Jordan's feedback to the data table."
        },
        {
          "criterion": "Action Plan Specificity",
          "score": 7,
          "comment": "Proposed rewriting outbound sequences with compliance-led messaging by Thursday, which is concrete and time-bound, but the action to 'fix persona targeting' lacked detail on how to rebuild the contact list."
        }
      ]
    },
    {
      "scenario_number": 3,
      "scenario_title": "The Friday That Tests Everything",
      "criteria": [
        {
          "criterion": "Triage & Prioritization Judgment",
          "score": 9,
          "comment": "Immediately identified Colton as priority #1 due to the Monday deadline and recognized FedRAMP as both a parallel workstream and direct ammunition for Eric's vendor viability concern."
        },
        {
          "criterion": "Colton Deal Rescue Execution",
          "score": 8,
          "comment": "Proposed calling Sandra to advocate internally, arranging a FinLedger CISO reference call, and preparing a vendor viability one-pager with escrow terms, addressing all three of Eric's objections, though the pricing strategy defaulted to a 15% discount rather than a creative structure."
        },
        {
          "criterion": "FedRAMP Launch Handling",
          "score": 8,
          "comment": "Delegated the press release to product marketing and kept ownership of the competitive battlecard, and explicitly proposed teasing the FedRAMP news to Eric as proof of enterprise maturity."
        },
        {
          "criterion": "Communication Quality (Dana Brief)",
          "score": 7,
          "comment": "Brief covered both crises in 138 words and flagged the need for pricing authority beyond 15%, but didn't mention the FedRAMP launch timeline as a decision point for Dana."
        }
      ]
    }
  ],
  "total_score": 69,
  "max_score": 90,
  "score_percentage": 0.77,
  "recommendation": "Hire",
  "overall_assessment": "Candidate demonstrates strong diagnostic and strategic thinking, particularly in connecting upstream problems to downstream symptoms and recognizing cross-situation leverage (FedRAMP as a deal weapon). The main gap is in commercial creativity — defaulting to a standard discount rather than proposing a differentiated deal structure. Ready for the role with coaching on enterprise deal mechanics."
}
```

### Integration Notes

When building the simulation document, include a note at the bottom instructing the AI grader
to return its response in this exact JSON format. The grader prompt should include:

1. The full simulation document (company background, scenarios, rubrics)
2. The candidate's responses to each scenario
3. An instruction to return ONLY valid JSON matching the schema above — no markdown, no
   preamble, no explanation outside the JSON structure

## File Naming

Save the final document as: `[job-title-slug]-simulation.md`

For example: `customer-success-manager-simulation.md`

Save it to the user's workspace folder.
