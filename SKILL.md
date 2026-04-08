---
name: creating-scenarios
description: >
  Create job simulation scenarios for any role — 5 interconnected, progressively difficult workplace scenarios
  with a fictional company backdrop, detailed instructions, and AI-gradable qualitative rubrics.
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

The 5 scenarios must feel like a **connected story** — a candidate's first week or a single challenging project that unfolds across stages. They should NOT feel like 5 random test questions.

**Difficulty progression:**

| Scenario | Difficulty | What it tests |
|----------|-----------|---------------|
| 1 | Easy | Can the candidate follow a clear process and execute a straightforward task correctly? |
| 2 | Easy–Medium | Can they handle a task with minor ambiguity or a small wrinkle that requires judgment? |
| 3 | Medium | Can they manage competing priorities, coordinate with others, or deal with incomplete information? |
| 4 | Medium–Hard | Can they solve a problem with no obvious right answer, navigate conflict, or make a tough tradeoff? |
| 5 | Hard | Can they handle a high-pressure, multi-dimensional situation that tests everything from Scenarios 1–4 combined? |

**Narrative thread:** Each scenario should build on the one before it. The outcome of Scenario 1 should set the stage for Scenario 2. By Scenario 5, the candidate is dealing with consequences and complexities that have been accumulating.

Example of a connected thread (for a Customer Success Manager role):
- Scenario 1: Onboard a new client using the standard playbook
- Scenario 2: The client from Scenario 1 requests a feature that doesn't exist — figure out how to respond
- Scenario 3: While handling that, a second client escalates a billing issue and you need to prioritize
- Scenario 4: Leadership asks you to write a retention strategy because churn is rising — use data from both client situations
- Scenario 5: The original client threatens to leave, a team member quits, and you have a QBR presentation in 2 hours

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
[Brief instructions for the candidate or the HR administrator. Explain that there
are 5 connected scenarios of increasing difficulty. State the expected time per
scenario if appropriate. Clarify what format responses should take.]

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
1. **A score** — one of four levels: **Exceptional**, **Proficient**, **Developing**, or **Insufficient**
2. **A one-sentence comment** — a brief explanation of why that score was given, grounded in specific evidence from the candidate's response

**[Criterion 1 Name]**
- Exceptional: [What this looks like — be specific enough for an AI to judge]
- Proficient: [What this looks like]
- Developing: [What this looks like]
- Insufficient: [What this looks like]

**[Criterion 2 Name]**
- Exceptional: ...
- Proficient: ...
- Developing: ...
- Insufficient: ...

[Typically 2–4 criteria per scenario. Choose criteria that reflect what actually
matters for the role, not generic things like "communication" unless communication
IS the point of the scenario.]

#### Key Signals to Watch For
[Bullet list of specific behaviors, phrases, or decisions that indicate strong
or weak performance. These help the AI grader look beyond surface-level
correctness. Example: "Does the candidate acknowledge the client's frustration
before jumping to solutions?" or "Does the candidate check with engineering
before making a commitment?"]

---

## Scenario 2: [Title]
[Same structure as above, but explicitly reference what happened in Scenario 1
to maintain the narrative thread.]

...

## Scenario 5: [Title]
[Same structure. This should be the culmination — the hardest scenario that
pulls together skills tested in all previous scenarios.]

---

## Grading Summary Template

When grading, the AI must fill in **every row** with a score AND a one-sentence comment.
No criterion should be left without both.

| Scenario | Criterion | Score | Comment |
|----------|-----------|-------|---------|
| 1 | [Criterion name] | [Exceptional / Proficient / Developing / Insufficient] | [One sentence explaining why this score was given, citing specific evidence from the candidate's response] |
| 1 | [Criterion name] | [Score] | [One-sentence comment] |
| 2 | [Criterion name] | [Score] | [One-sentence comment] |
| ... | ... | ... | ... |

### Overall Assessment
[The AI grader writes a holistic summary: overall readiness for the role,
standout strengths, areas of concern, and a hiring recommendation.]
```

---

## Writing Quality Guidelines

The scenarios you write should feel **real**. A few principles:

- **Use realistic details.** Don't say "Client A is unhappy." Say "Priya Sharma from NovaTech sent a frustrated email at 9:47 AM saying their dashboard has been showing stale data for three days and she has a board meeting tomorrow." Specificity makes the scenario immersive and testable.

- **Include just enough ambiguity.** Real work is messy. In medium and hard scenarios, intentionally leave some information incomplete or contradictory. The point is to see how the candidate navigates uncertainty — not to trick them, but to mirror reality.

- **Make the rubrics AI-gradable.** Each level description should be concrete enough that a language model reading the candidate's response can reliably assign a score and write a one-sentence justification. Avoid vague language like "shows good judgment" — instead describe what good judgment *looks like* in this specific context. For example: "Proposes at least two options with tradeoffs articulated" rather than "Thinks creatively about solutions." The AI grader's job is simple: for every criterion, pick a level and explain why in one sentence. Your rubric descriptions need to make that judgment unambiguous.

- **Keep the company background consistent.** Every scenario should reference the same fictional company. Details introduced in the background (company size, industry norms, team structure) should influence how scenarios play out.

- **Respect the candidate's time.** Each scenario should be completable in a reasonable timeframe. If a scenario requires the candidate to write a full strategy document, say so and allocate appropriate time. Don't pack a 2-hour task into a "15-minute scenario."

## File Naming

Save the final document as: `[job-title-slug]-simulation.md`

For example: `customer-success-manager-simulation.md`

Save it to the user's workspace folder.
