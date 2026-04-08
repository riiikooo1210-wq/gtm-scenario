export type GtmNodeType =
  | 'intro'
  | 'briefing'
  | 'account_list'
  | 'diagnostic_memo'
  | 'crisis_response'
  | 'scenario_transition'
  | 'grading'
  | 'final_report'
  | 'dana_brief'

export interface SlackMessageData {
  sender: string
  role: string
  timestamp: string
  content: string
}

export interface EmailData {
  from: string
  to: string
  subject: string
  content: string
  isForwarded?: boolean
}

export interface MetricRow {
  metric: string
  target: string
  actual: string
  status: 'on_track' | 'warning' | 'critical'
}

export interface QuoteData {
  speaker: string
  role: string
  text: string
}

export interface GtmNode {
  id: string
  type: GtmNodeType
  scenario: 0 | 1 | 2 | 3
  title: string
  content: string
  slackMessages?: SlackMessageData[]
  emails?: EmailData[]
  metrics?: MetricRow[]
  quotes?: QuoteData[]
  illustration?: string
  next: string | null
}

export interface GtmStoryline {
  gameTitle: string
  nodes: Record<string, GtmNode>
  startNode: string
}

export interface CriterionResult {
  criterion: string
  score: number
  comment: string
}

export interface ScenarioResult {
  scenario_number: number
  scenario_title: string
  criteria: CriterionResult[]
}

export interface GradingResult {
  candidate_id: string
  simulation: string
  graded_at: string
  scenarios: ScenarioResult[]
  total_score: number
  max_score: number
  score_percentage: number
  recommendation: 'Strong Hire' | 'Hire' | 'Lean No Hire' | 'No Hire'
  overall_assessment: string
}

export interface AccountEntry {
  name: string
  rationale: string
  contact: string
}

export interface RootCauseEntry {
  title: string
  explanation: string
  actions: string
}
