import { useGameStore } from '../store/gameStore'
import { gtmStoryline } from '../data/gtm-storyline'
import type { GtmNodeType, GtmNode } from '../types/game'
import SceneTransition from './SceneTransition'
import { useScrollToTopOnChange } from '../components/hooks/useScrollToTopOnChange'
import IntroScene from '../scenes/IntroScene'
import BriefingScene from '../scenes/BriefingScene'
import AccountListScene from '../scenes/AccountListScene'
import DiagnosticMemoScene from '../scenes/DiagnosticMemoScene'
import CrisisResponseScene from '../scenes/CrisisResponseScene'
import ScenarioTransitionScene from '../scenes/ScenarioTransitionScene'
import GradingScene from '../scenes/GradingScene'
import FinalReportScene from '../scenes/FinalReportScene'
import DanaBriefScene from '../scenes/DanaBriefScene'

type SceneComponent = React.ComponentType<{ node: GtmNode }>

const SCENE_MAP: Record<GtmNodeType, SceneComponent> = {
  intro: IntroScene,
  briefing: BriefingScene,
  account_list: AccountListScene,
  diagnostic_memo: DiagnosticMemoScene,
  crisis_response: CrisisResponseScene,
  scenario_transition: ScenarioTransitionScene,
  grading: GradingScene,
  final_report: FinalReportScene,
  dana_brief: DanaBriefScene,
}

export default function SceneEngine() {
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  useScrollToTopOnChange(currentNodeId)
  const node = gtmStoryline.nodes[currentNodeId]

  if (!node) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] text-game-danger">
        Error: Node "{currentNodeId}" not found
      </div>
    )
  }

  const Scene = SCENE_MAP[node.type]

  return (
    <SceneTransition nodeId={currentNodeId}>
      <Scene node={node} />
    </SceneTransition>
  )
}
