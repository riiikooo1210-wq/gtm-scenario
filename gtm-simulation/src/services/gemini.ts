import type { GradingResult, AccountEntry, RootCauseEntry } from '../types/game'
// @ts-ignore — Vite raw import via alias
import simulationDoc from '@scenarios/gtm-manager-enterprise-security-simulation.md?raw'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

interface CandidateResponses {
  // Scenario 1
  prioritizationCriteria: string
  accounts: AccountEntry[]
  // Scenario 2
  rootCauses: RootCauseEntry[]
  // Scenario 3
  triagePrioritization: string
  coltonRescuePlan: string
  fedRampHandling: string
  danaBrief: string
}

function formatResponses(r: CandidateResponses): string {
  let text = ''

  // Scenario 1
  text += '=== SCENARIO 1: TARGET ACCOUNT LIST ===\n\n'
  text += `PRIORITIZATION CRITERIA:\n${r.prioritizationCriteria}\n\n`
  r.accounts.forEach((a, i) => {
    text += `ACCOUNT #${i + 1}:\n`
    text += `Company: ${a.name}\n`
    text += `Rationale: ${a.rationale}\n`
    text += `First Contact: ${a.contact}\n\n`
  })

  // Scenario 2
  text += '=== SCENARIO 2: DIAGNOSTIC MEMO ===\n\n'
  text += 'To: Dana Moretti, VP of Enterprise Sales\n'
  text += 'From: GTM Manager\n'
  text += 'Re: Enterprise Pipeline Diagnostic & 2-Week Action Plan\n\n'
  r.rootCauses.forEach((rc, i) => {
    if (rc.title.trim()) {
      text += `ROOT CAUSE #${i + 1}: ${rc.title}\n`
      text += `Explanation: ${rc.explanation}\n`
      text += `Action Plan: ${rc.actions}\n\n`
    }
  })

  // Scenario 3
  text += '=== SCENARIO 3: CRISIS RESPONSE ===\n\n'
  text += `TRIAGE & PRIORITIZATION:\n${r.triagePrioritization}\n\n`
  text += `COLTON BRANDS RESCUE PLAN:\n${r.coltonRescuePlan}\n\n`
  text += `FEDRAMP LAUNCH HANDLING:\n${r.fedRampHandling}\n\n`
  text += `BRIEF TO DANA (SLACK MESSAGE):\n${r.danaBrief}\n`

  return text
}

function buildPrompt(responses: CandidateResponses): string {
  const candidateText = formatResponses(responses)

  return `You are an expert hiring evaluator for a GTM Manager role at an enterprise cybersecurity company. You must grade a candidate's simulation assessment responses.

Below is the FULL SIMULATION DOCUMENT containing the company background, all 3 scenarios, and the detailed grading rubrics:

---BEGIN SIMULATION DOCUMENT---
${simulationDoc}
---END SIMULATION DOCUMENT---

Below are the CANDIDATE'S RESPONSES to all 3 scenarios:

---BEGIN CANDIDATE RESPONSES---
${candidateText}
---END CANDIDATE RESPONSES---

INSTRUCTIONS:
1. Grade each of the 9 criteria according to the rubrics in the simulation document.
2. For EVERY criterion, provide a score (0-10) AND a one-sentence evidence-based comment that cites specific details from the candidate's response. Generic comments are not acceptable.
3. Calculate the total score (sum of all 9 criteria scores), max_score (90), and score_percentage (total/max, rounded to 2 decimal places).
4. Determine the recommendation based on score_percentage: 80-100% = "Strong Hire", 65-79% = "Hire", 45-64% = "Lean No Hire", 0-44% = "No Hire".
5. Write a 2-4 sentence overall_assessment covering readiness, strengths, concerns, and recommendation justification.

Return ONLY valid JSON matching this exact schema — no markdown, no preamble, no explanation outside the JSON:

{
  "candidate_id": "candidate_001",
  "simulation": "gtm-manager",
  "graded_at": "<current ISO 8601 timestamp>",
  "scenarios": [
    {
      "scenario_number": 1,
      "scenario_title": "Building Your First Enterprise Target Account List",
      "criteria": [
        { "criterion": "Account Selection Quality", "score": 0, "comment": "" },
        { "criterion": "Rationale & Entry Point Strategy", "score": 0, "comment": "" },
        { "criterion": "Prioritization Logic", "score": 0, "comment": "" }
      ]
    },
    {
      "scenario_number": 2,
      "scenario_title": "The Pipeline Review That Reveals a Problem",
      "criteria": [
        { "criterion": "Diagnostic Depth", "score": 0, "comment": "" },
        { "criterion": "Action Plan Specificity", "score": 0, "comment": "" }
      ]
    },
    {
      "scenario_number": 3,
      "scenario_title": "The Friday That Tests Everything",
      "criteria": [
        { "criterion": "Triage & Prioritization Judgment", "score": 0, "comment": "" },
        { "criterion": "Colton Deal Rescue Execution", "score": 0, "comment": "" },
        { "criterion": "FedRAMP Launch Handling", "score": 0, "comment": "" },
        { "criterion": "Communication Quality (Dana Brief)", "score": 0, "comment": "" }
      ]
    }
  ],
  "total_score": 0,
  "max_score": 90,
  "score_percentage": 0.0,
  "recommendation": "Hire",
  "overall_assessment": ""
}`
}

export async function gradeResponses(responses: CandidateResponses): Promise<GradingResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured. Set VITE_GEMINI_API_KEY in .env file.')
  }

  const prompt = buildPrompt(responses)

  const makeRequest = async (): Promise<GradingResult> => {
    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Gemini API error (${res.status}): ${errText}`)
    }

    const data = await res.json()
    const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!jsonText) {
      throw new Error('No response content from Gemini')
    }

    return JSON.parse(jsonText) as GradingResult
  }

  // Try once, retry on failure
  try {
    return await makeRequest()
  } catch (firstError) {
    console.warn('First grading attempt failed, retrying...', firstError)
    return await makeRequest()
  }
}
