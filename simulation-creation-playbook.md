name: creating-scenarios
description: >
  Create job simulation scenarios for any role — interconnected, progressively difficult workplace
  scenarios with a fictional company backdrop, immersive workplace UI, and AI-gradable numeric rubrics.
  Use this skill whenever the user wants to build job simulations, hiring assessments, candidate
  evaluation scenarios, role-play exercises for recruitment, situational judgment tests, or work-sample tests.
  Also trigger when the user mentions "job simulation", "hiring scenario", "candidate assessment",
  "work simulation", "day-in-the-life exercise", "practical test for hiring", or asks to
  "create scenarios for a [job title]". Even if the user just names a job title and says
  "build me a simulation" or "create an assessment", this is the skill to use.

---

# Creating Scenarios — Job Simulation Builder

You are building a single comprehensive Markdown document that an HR team will use to evaluate
job candidates through realistic, interconnected workplace scenarios. The document is also
designed so that an AI grader can later assess candidate responses using the rubrics you define.

The simulation is not a quiz or a reading assignment — it is an **immersive workplace experience**.
The player should feel like they are sitting at a desk on their first week, receiving real messages
from real colleagues, and producing real deliverables on real tools. Every design decision should
serve this goal.

---

## Overall Workflow

There are three phases. Complete them in order.

### Phase 1: Research the Role

Before writing anything, develop a solid understanding of the job.

1. **Web research.** Search for the job title the user gives you. Look for:
   - Common day-to-day responsibilities (not just the job description bullet points — look for blog posts, Reddit threads, Glassdoor reviews, and "day in the life" content that reveal what the job actually feels like)
   - Typical challenges and friction points people in this role face
   - Skills that separate great performers from average ones
   - Tools, systems, or processes commonly used

2. **Confirm with the user.** Present a short summary of what you found — the 5–7 key responsibility areas and the most interesting challenges. Ask the user:
   - Does this match the role they have in mind?
   - Are there specific aspects they want emphasized or excluded?
   - Any company-specific context they want woven in?

Only proceed to Phase 2 after the user confirms.

---

### Phase 2: Design the Narrative Arc

The scenarios must feel like a connected story — a candidate's first week or a single challenging
project that unfolds across stages. They should NOT feel like random test questions.

**Default: 3 scenarios.** Three scenarios is the sweet spot for most assessments — enough to test a
range of skills while keeping total time to 20–30 minutes (which maximizes candidate completion
rates). Only go to 4–5 scenarios if the user explicitly asks for more.

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

**Narrative thread:** Each scenario should build on the one before it. The outcome of Scenario 1
should set the stage for Scenario 2. The final scenario should deal with consequences and
complexities that have been accumulating. When the final scenario involves multiple simultaneous
crises, make sure they are interconnected — each crisis should feed into or be usable as leverage
for the others. Isolated crises that don't connect to each other add complexity without adding
strategic depth.

**Example of a connected thread** (for a Customer Success Manager role, 3 scenarios):
- Scenario 1: Onboard a new client using the standard playbook
- Scenario 2: The client from Scenario 1 requests a feature that doesn't exist, and a second client escalates a billing issue — diagnose what's going wrong and propose fixes
- Scenario 3: The original client threatens to leave and leadership wants a retention strategy — but a surprise product announcement creates both a crisis to manage and a tool to save the client

---

### Phase 3: Write the Document

Produce a single Markdown file with the following structure. Pay close attention to both the **content structure** and the **experience design rules** that follow — the document must specify both *what* the scenarios contain and *how the player experiences them*.

---

## Document Structure

```
[Job Title] — Simulation Assessment
```

### Player Setup

Before the simulation begins, the player enters their name. This name is used throughout the
simulation wherever the player character is referenced (in messages addressed to them, in email
headers, etc.). This makes the experience personal and immersive.

### Company Background

[A fictional but realistic company profile. Include: company name, industry, size,
stage (startup/growth/enterprise), products or services, recent news or context
that's relevant to the scenarios. Make it vivid enough that the candidate can
"get into character" but concise — 150–250 words.]

### How This Assessment Works

[Brief instructions for the candidate. Explain that there are N connected scenarios
of increasing difficulty. State the expected TOTAL time (e.g., "20–30 minutes total
across all 3 scenarios"). Clarify what format responses should take — emphasize that
candidates should produce actual deliverables, not describe what they would do.]

### Your Role

[Prominently describe the player's role. This is the most important part of the intro and must
stand out visually — it should NOT be buried in a wall of text. State who the player is, who they
report to, who their key colleagues are, and what they're responsible for. Keep it punchy and
scannable.]

---

### Scenario 1: [Title]

**Difficulty:** Easy
**Estimated Time:** [X minutes]

#### Context

[Set the scene. What just happened? What does the candidate know? What tools or
resources do they have access to? Be specific enough that the candidate can act
without guessing what you meant.]

#### Your Task

[Clear, actionable instructions. What exactly does the candidate need to do?
What deliverable or decision is expected?]

#### Grading Rubric

**Criteria**

For each criterion below, the AI grader must produce exactly two things:

**A score from 0–10** using this scale:
- 9–10: Exceptional — exceeds expectations for the role; demonstrates mastery
- 7–8: Strong — meets expectations with clear competence; minor gaps only
- 4–6: Developing — shows some understanding but significant gaps in execution or depth
- 0–3: Insufficient — fails to meet basic expectations for the role

**A one-sentence comment that cites specific evidence** — The comment MUST reference
a concrete detail from the candidate's response (e.g., a specific choice they made,
a phrase they wrote, an action they proposed, or something they omitted). Generic
comments like "good analysis" or "could be better" are not acceptable.

Example of a good comment: "Candidate included two government accounts despite the company lacking FedRAMP authorization, showing a gap in ICP awareness."

Example of a bad comment: "Account selection was reasonable overall."

This evidence requirement applies to ALL criteria across ALL scenarios below.

```
[Criterion 1 Name]
9–10: [What this looks like — be specific enough for an AI to judge]
7–8: [What this looks like]
4–6: [What this looks like]
0–3: [What this looks like]

[Criterion 2 Name]
9–10: ...
7–8: ...
4–6: ...
0–3: ...

[Typically 2–4 criteria per scenario. Choose criteria that reflect what actually
matters for the role, not generic things like "communication" unless communication
IS the point of the scenario.]
```

---

### Scenario 2: [Title]

[Same structure as above, but explicitly reference what happened in Scenario 1
to maintain the narrative thread.]

---

### Scenario N: [Title]

[Same structure. This should be the culmination — the hardest scenario that
pulls together skills tested in all previous scenarios.]

---

## Experience Design Rules

These rules define how the simulation should *feel* when built into an interactive app. They are
just as important as the scenario content. Every simulation built from this playbook must follow
them.

### 1. It's a game, not an assignment

The simulation should feel like a workplace game, not a school assignment. Specific implications:
- **No page numbers or step counters** (e.g., "1 of 4", "Step 2 of 3"). Players navigate freely through content; numbering makes it feel like a worksheet.
- **No "response saved" confirmations** before the player intentionally submits. The submit action itself is the confirmation.
- **No progress bars** within individual scenarios. The player should feel immersed in the moment, not tracking how much is left.

### 2. The player has a name

At the very beginning of the simulation, before any scenario content appears, the player inputs the name they want to be called in this office. Every future scene that references the main character (the player) uses this input name — in Slack messages addressed to them, email headers, briefing greetings, etc.

### 3. All work happens on a laptop screen

Every place where the player reads workplace content (messages, emails, data, documents) or writes a response, it must be rendered **inside a laptop screen frame** — a visual container that looks like a macOS-style application window with:
- Traffic-light window buttons (red/yellow/green circles)
- A top bar appropriate to the content type (see "Content type variants" below)
- A bezel/stand at the bottom for authentic laptop appearance

This is the single most important immersion tool. The player should feel like they're looking at their work laptop, not reading a webpage.

**Content type variants** — the laptop frame should adapt its chrome to match what's being displayed:

| Variant | Top bar looks like | Use for |
|---------|-------------------|---------|
| `document` | File / Edit / View / Format menu bar | Writing deliverables (strategy docs, lists, memos, plans) |
| `email-compose` | New Message header with To/Subject fields | Writing emails or email-style responses |
| `email-read` | Received email header with From/To/Subject/Date | Displaying received emails from characters |
| `slack` | Workspace name + channel/DM in sidebar header | Slack-style messages from colleagues |

**When the content is too tall for the visible laptop frame, it must be scrollable within the frame** — just like scrolling a real app window. The frame itself stays fixed; the content inside scrolls.

### 4. Messages and emails are collapsible

All messages (Slack DMs, emails, forwarded threads) that the player receives should be **collapsible and expandable**:
- **Default state: collapsed.** The collapsed view shows just enough to identify the message — sender name/avatar, subject or first line preview, timestamp. It should look like an unread message in a real inbox.
- **Expanding:** The player clicks to expand and read the full content. This mimics the real experience of checking new messages.
- **Collapsed size must be compact** — no extra padding or margins below the preview text. The collapsed row should be as tight as a real inbox row.
- **Always re-collapsible** after reading.

This pattern serves two purposes: it makes receiving information feel realistic (you check your messages), and it reduces visual overwhelm from walls of text.

### 5. Professional terms get persistent glossary tooltips

Every domain-specific or professional term in the simulation should have a small circular "?" icon to its upper-right. When clicked, it shows a tooltip with a short definition of that term.

Critical rules:
- **The "?" icon must be persistent** — it does not disappear after being clicked. Players may want to re-check definitions.
- **Every instance of a term gets its own "?"** — if "GTM" appears three times on a page, all three get the icon. Do not deduplicate. The player shouldn't have to scroll back to find the one instance that had the definition.
- **Track clicks secretly.** Log which terms the player clicks and how many times. This data can reveal the player's familiarity with domain vocabulary — useful signal for the hiring company. Do not surface this tracking to the player.

When writing scenarios, mark professional terms in the text so the app knows where to place tooltips. Include a glossary of all terms with short definitions (1–2 sentences each) as part of the simulation document.

### 6. Character images are placed contextually

When a scenario introduces a character (e.g., showing their photo in a "meeting" or "office" context), the image must appear **between the narrative setup and the character's actual message**. Specifically:
- **Below** the general description text (e.g., "Dana sends you this Slack message at 9:14 AM:")
- **Above** the actual Slack message or email from that character

This keeps images close to the content they're most directly relevant to, rather than floating at the top of the page disconnected from context.

### 7. Navigation within scenario intros is reversible

When a scenario introduction is split into multiple sub-pages (e.g., page 1 shows Slack messages, page 2 shows an email and additional context), the player must be able to **move back and forth freely** between these pages. Navigation should never be irreversible within a scenario's intro/briefing content.

Similarly, the intro pages at the start of the game (company background, role description, instructions) should allow back-and-forth navigation.

### 8. Scenario intros break into logical sub-pages

When a scenario's briefing contains multiple distinct information sources (e.g., two Slack messages + one forwarded email + background context), break them into logical sub-pages rather than dumping everything on one screen. Each sub-page should group related information:
- **Good:** Page 1 = Slack messages from colleagues. Page 2 = Forwarded email + additional context.
- **Bad:** Everything on one scrolling page.

Sub-pages are reversible (see Rule 7). The character image (if any) appears on the first sub-page, below the opening narrative text.

### 9. Reference drawers let players look back

On every page where the player is writing a response, there must be a **"View Briefing" or "View Reference" button** that opens a slide-out panel containing all the information they received for that scenario (messages, data tables, emails, character quotes — but no character images or decorative elements, just the actionable content).

This lets the player work without having to memorize everything. It mirrors real work where you can always tab back to your inbox or the original brief.

For the final scenario (or any scenario with multi-part responses), if the player moves to a second submission page (e.g., writing a separate message after submitting their main response), the reference drawer should include **both** the original briefing info **and** the player's own prior responses from that scenario.

### 10. Response inputs are styled to match the deliverable type

The input areas where the player types should match the *kind* of deliverable being produced:
- **Strategy doc / list / memo:** Document-style editor inside a `document` laptop frame
- **Email response:** Email compose UI inside an `email-compose` laptop frame, with a "Send" button styled like a real email send button
- **Slack message:** Slack-style message input inside a `slack` laptop frame, with a "Send" button styled like Slack's send
- **Diagnostic report:** Document-style with clearly separated input fields for each section

**All input fields within a single response type should have consistent styling.** Don't mix bordered fields, shaded fields, and card-style groups on the same page. Pick one input style and use it throughout.

**No grouping boxes around related inputs** (e.g., don't wrap "Root Cause Title" + "Explanation" + "Action Plan" in a white card). The individual input fields themselves are enough visual structure. Background grouping boxes add clutter.

### 11. Multi-part submissions where appropriate

When a scenario naturally involves producing multiple distinct deliverables for different audiences (e.g., an internal strategy document AND a Slack message to your boss), split them into separate submission steps:
1. Player completes and submits the main deliverable
2. Player moves to a new page to compose the communication piece (in its appropriate UI — Slack, email, etc.)
3. On this second page, the player can still reference both the original briefing AND their own submitted response from step 1

This mimics real workflow: you write the analysis, then you write the message summarizing it.

### 12. Consistent visual container sizing

The main content container (the outermost card/box that holds everything on each page) must maintain **consistent width across all scenes**. Only the height/length should change based on content. Width jumping between scenes feels broken and unprofessional.

### 13. Warm, professional color palette

The visual style should feel warm and professional — not clinical or sterile:
- **No pure white backgrounds.** Use warm off-whites or beige tones as the primary background.
- **Black borders** for containers, frames, and interactive elements (keeps things crisp).
- **A warm accent color** (e.g., rust, terracotta, muted coral) for buttons, highlights, and active states.
- **Muted teal or sage** for the outer page background.

### 14. Outlined icons only — no emojis

Anywhere an icon is needed (buttons, labels, section markers), use **clean outlined SVG icons** — not Apple/system emojis. Emojis break the professional aesthetic and render inconsistently across platforms.

### 15. Received emails must look like real email windows

When displaying a received email (forwarded thread, notification, etc.), it should look like an actual email client's reading pane:
- Show From, To, Date, Subject in a header area
- Body text below in a natural reading format
- **No "File / Edit / View / Format" menu bar** on received emails — that's only for compose windows
- **No nested title bars** — if the email is already inside a laptop frame, the email itself should not have its own redundant chrome
- Match the visual style of the compose variant so the player recognizes both as "email"

---

## Grading Summary Template

When grading, the AI must fill in every row with a score (0–10) AND a one-sentence
comment that cites specific evidence from the candidate's response (a quote, a specific
choice they made, or a concrete omission). No criterion should be left without both.
Do NOT write generic comments.

| Scenario | Criterion | Score (0–10) | Evidence-Based Comment |
|----------|-----------|-------------|----------------------|
| 1 | [Criterion name] | [0–10] | [Cite specific evidence from candidate's response] |
| 1 | [Criterion name] | [0–10] | [Cite specific evidence] |
| 2 | [Criterion name] | [0–10] | [Cite specific evidence] |
| ... | ... | ... | ... |

**Total Score:** [sum] / [max possible]

[Calculate max possible as: number of criteria x 10. Then set hiring thresholds
at approximately these percentages of the max:]

**Score interpretation:**
- 80–100%: Strong Hire — consistently exceptional across scenarios
- 65–79%: Hire — strong overall with minor gaps
- 45–64%: Lean No Hire — some competence shown but significant concerns
- 0–44%: No Hire — does not meet expectations for the role

**Overall Assessment**

[The AI grader writes a holistic summary: overall readiness for the role,
standout strengths, areas of concern, and a hiring recommendation based on
the total score above, with justification.]

---

## Design Principles

These principles come from iterative testing and should guide every decision you make:

### 1. Optimize for signal per minute, not volume

Candidates are busy — especially employed ones interviewing at multiple companies. Every element
should earn its place. Before adding a task element, ask: "Does this test a distinct skill, or
does it overlap with something I'm already testing?" If it overlaps, cut it.

- Prefer fewer, higher-quality deliverables. Asking for 5 accounts with strong reasoning tests more than asking for 15 accounts where the candidate pads with filler picks.
- Keep total time to 20–30 minutes for a 3-scenario assessment. If a scenario requires a lengthy deliverable (like a full strategy doc), allocate time honestly — don't pack a 2-hour task into a "15-minute scenario."

### 2. Only score what you explicitly ask for

If the rubric rewards something, the task instructions MUST ask for it. Candidates shouldn't
be penalized for not doing something they weren't told to do.

- Bad: Task says "organize the list in priority order" -> rubric scores whether they explained their prioritization framework. (They were never asked to explain it.)
- Good: Task says "organize the list in priority order and briefly explain the criteria you used to prioritize" -> rubric scores their framework. (Now it's fair.)

Audit every rubric criterion against the task instructions. If there's a mismatch, fix the instructions.

### 3. Minimize cognitive overhead in scenarios

Scenarios should test the candidate's job skills, not their ability to track complex fictional
setups. Keep the number of characters low — 2 people in a scene is usually enough to deliver
all necessary information. More characters means the candidate spends time parsing who said
what instead of thinking strategically.

- Bad: A pipeline review with 4 people each giving one piece of information.
- Good: A pipeline review with 2 people — one delivers the qualitative signal, the other sets up the task. Same information, less overhead.

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

- Bad: Deal is falling apart + SDR quits + product launch. The SDR quitting is isolated — it doesn't help or hinder the other two situations.
- Good: Deal is falling apart + product launch pulled forward. The product launch is both a workstream to manage AND ammunition for saving the deal. The candidate who sees the connection demonstrates higher-order thinking.

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

### 11. Immersion over instruction

The simulation should feel like a day at work, not a test. Every UI element — the laptop frame, the collapsible messages, the Slack/email/doc styling, the character photos — exists to sustain the illusion that the player is actually in this office. When in doubt about a design choice, ask: "Would this feel more like real work or more like a school assignment?" Always choose the former.

### 12. Make information accessible, not memorizable

Players should never need to memorize briefing content before writing their response. Reference drawers, look-back buttons, and persistent access to prior information are not "helping the candidate cheat" — they mirror how real work operates (you can always re-read the email). The simulation tests judgment and skill, not short-term memory.

---

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
| `scenarios[].scenario_title` | string | Title of the scenario |
| `scenarios[].criteria` | array | One entry per grading criterion in that scenario |
| `scenarios[].criteria[].criterion` | string | Name of the criterion |
| `scenarios[].criteria[].score` | integer | 0–10 score |
| `scenarios[].criteria[].comment` | string | One sentence citing specific evidence from the candidate's response. Must reference a concrete detail — not a generic statement |
| `total_score` | integer | Sum of all criterion scores |
| `max_score` | integer | Number of criteria x 10 |
| `score_percentage` | float | `total_score / max_score`, rounded to 2 decimal places (e.g., `0.82`) |
| `recommendation` | string | One of exactly four values: `"Strong Hire"`, `"Hire"`, `"Lean No Hire"`, `"No Hire"` |
| `overall_assessment` | string | 2–4 sentence holistic summary: readiness for the role, standout strengths, areas of concern, and justification for the recommendation |

### Recommendation Thresholds

| Percentage | Recommendation |
|-----------|---------------|
| 80–100% | Strong Hire |
| 65–79% | Hire |
| 45–64% | Lean No Hire |
| 0–44% | No Hire |

### Hidden Analytics

In addition to the grading JSON, the system should collect and surface the following engagement data to the hiring team (never shown to the player):

| Metric | What it reveals |
|--------|----------------|
| Glossary term clicks (which terms, how many times) | Domain vocabulary familiarity — a player who clicks "ICP" 3 times likely has less experience than one who never clicks it |
| Time per scenario | Speed and confidence signals |
| Reference drawer usage | Whether the player reviews information before responding (thoroughness signal) |

---

## Integration Notes

When building the simulation document, include a note at the bottom instructing the AI grader
to return its response in the exact JSON format above. The grader prompt should include:

1. The full simulation document (company background, scenarios, rubrics)
2. The candidate's responses to each scenario
3. An instruction to return ONLY valid JSON matching the schema above — no markdown, no preamble, no explanation outside the JSON structure

---

## File Naming

Save the final document as: `[job-title-slug]-simulation.md`

For example: `customer-success-manager-simulation.md`

Save it to the user's workspace folder.
