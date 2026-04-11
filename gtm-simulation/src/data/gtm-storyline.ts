import type { GtmStoryline } from '../types/game'

export const gtmStoryline: GtmStoryline = {
  gameTitle: 'GTM Manager — Enterprise Security Simulation',
  startNode: 'intro',
  nodes: {
    intro: {
      id: 'intro',
      type: 'intro',
      scenario: 0,
      title: 'GTM Manager Simulation',
      content: '',
      illustration: '/intro.jpg',
      next: 's1_briefing',
    },

    // ── Scenario 1 ──────────────────────────────────────────────
    s1_briefing: {
      id: 's1_briefing',
      type: 'briefing',
      scenario: 1,
      title: 'Scenario 1: Building Your First Enterprise Target Account List',
      content: "It's your first Monday. Dana Moretti (your VP of Enterprise Sales) sends you this Slack message at 9:14 AM:",
      // Note: Slack message content contains jargon terms that are rendered via renderContentWithGlossary in BriefingScene
      illustration: '/desktop.jpg',
      slackMessages: [
        {
          sender: 'Dana Moretti',
          role: 'VP of Enterprise Sales',
          timestamp: '9:14 AM',
          content: `Hey {{PLAYER_NAME}} — welcome aboard! I need something from you by end of day Wednesday. We're kicking off our first enterprise prospecting sprint next week and I need a target account list. We want to start with 5 accounts that make sense for our first enterprise deals. Think Fortune 1000 companies where we have a realistic shot at getting in the door within 6 months.

Here's what we know:
• Our sweet spot has been companies going through cloud migrations or multi-cloud expansions — that's when security posture becomes a fire drill
• We've had the most success in financial services, healthcare, and SaaS/tech verticals
• We're SOC 2 Type II and ISO 27001 certified but NOT yet FedRAMP authorized (that's in progress, expected Q3)
• Our two best customer references are MedVault (healthcare, 3,200 employees) and FinLedger (fintech, 4,800 employees)

Don't just give me a list of big logos. I want your reasoning for each pick — why would they buy from us, and what's our angle in? Bonus points if you can identify a likely entry point (the person we'd try to reach first).`,
        },
      ],
      next: 's1_response',
    },

    s1_response: {
      id: 's1_response',
      type: 'account_list',
      scenario: 1,
      title: 'Your Target Account List',
      content: 'Create your target account list of 5 enterprise companies. List them in order of importance — your #1 pick should be the account you believe is the strongest opportunity. At the top, briefly explain the criteria you used to prioritize.',
      next: 's1_s2_transition',
    },

    s1_s2_transition: {
      id: 's1_s2_transition',
      type: 'scenario_transition',
      scenario: 1,
      title: 'Week 1 Complete',
      content: "Your target account list has been submitted. The enterprise prospecting sprint has launched with {{TOP_ACCOUNT}} as your top-priority target. It's the end of your first week — Dana is pulling you into a pipeline review.",
      next: 's2_briefing',
    },

    // ── Scenario 2 ──────────────────────────────────────────────
    s2_briefing: {
      id: 's2_briefing',
      type: 'briefing',
      scenario: 2,
      title: 'Scenario 2: The Pipeline Review That Reveals a Problem',
      content: "It's the end of your first week. The enterprise prospecting sprint launched using the target account list you built. Dana pulls you and the SDR team lead, Jordan Park, into a pipeline review. She shares the following data from the first 4 weeks of the enterprise push:",
      illustration: '/pipeline.jpg',
      metrics: [
        { metric: 'Outbound sequences launched', target: '50 accounts', actual: '47 accounts', status: 'on_track' },
        { metric: 'Response rate', target: '12%', actual: '4.2%', status: 'critical' },
        { metric: 'Discovery calls booked', target: '6', actual: '2', status: 'critical' },
        { metric: 'Discovery → Demo conversion', target: '50%', actual: '50% (1 of 2)', status: 'on_track' },
        { metric: 'Average deal size (pipeline)', target: '$200K', actual: '$145K', status: 'warning' },
        { metric: 'Avg. days in Stage 1 (Discovery)', target: '14 days', actual: '31 days', status: 'critical' },
      ],
      quotes: [
        {
          speaker: 'Jordan Park',
          role: 'SDR Team Lead',
          text: "We started outreach to {{TOP_ACCOUNT}} first like you prioritized, but the contacts we pulled aren't the right persona — we're hitting IT Directors, not security leaders. The messaging templates we brought over from mid-market are getting us flagged as spam by enterprise email filters. And the AEs are telling me they're spending 45 minutes on discovery calls just explaining what cloud security posture management even is. These enterprise prospects don't know the category.",
        },
        {
          speaker: 'Dana Moretti',
          role: 'VP of Enterprise Sales',
          text: "We also have one deal with a F500 retailer — Colton Brands (8,500 employees, $4.2B revenue) — that's been stuck in legal review for 3 weeks. Their security team loves us but procurement is asking for a SOC 2 bridge letter because our Type II report is from 8 months ago.",
        },
        {
          speaker: 'Dana Moretti',
          role: '(private, after the meeting)',
          text: "I need you to diagnose what's going wrong and come back Monday with a concrete plan to fix it. Not a 30-page strategy deck — I want 3–5 specific actions we can execute in the next 2 weeks that will move the needle on response rate and discovery calls booked.",
        },
      ],
      next: 's2_response',
    },

    s2_response: {
      id: 's2_response',
      type: 'diagnostic_memo',
      scenario: 2,
      title: 'Your Diagnostic Memo',
      content: 'Write a diagnostic memo (1–2 pages) addressed to Dana that includes a root cause analysis (3–5 underlying problems) and an action plan with specific, executable actions for each root cause that can be completed within 2 weeks.',
      next: 's2_s3_transition',
    },

    s2_s3_transition: {
      id: 's2_s3_transition',
      type: 'scenario_transition',
      scenario: 2,
      title: 'End of Week 1',
      content: "Your diagnostic memo has been submitted. Your quick wins are starting to show results — the SDR team paused the old templates and you helped rewrite the outreach with compliance-led messaging. Response rates ticked up to 7% in the last 4 days, and {{TOP_ACCOUNT}} responded to the rewritten outreach — an intro call is scheduled for next week. Then two things hit before 10 AM on Friday of your second week...",
      next: 's3_briefing',
    },

    // ── Scenario 3 ──────────────────────────────────────────────
    s3_briefing: {
      id: 's3_briefing',
      type: 'briefing',
      scenario: 3,
      title: 'Scenario 3: The Friday That Tests Everything',
      content: "It's Friday of your second week. Your quick wins from Scenario 2 are starting to show results — response rates ticked up to 7% in the last 4 days. Then two things hit before 10 AM:",
      illustration: '/desktop.jpg',
      emails: [
        {
          from: 'Sandra Mullins (Sr. Cloud Security Engineer, Colton Brands)',
          to: 'You (accidentally forwarded)',
          subject: 'FW: Re: Security Platform Decision',
          isForwarded: true,
          content: `James — I'm leaning toward Wiz. The Vantage Shield product is technically superior for our use case but I can't justify recommending a 290-person startup to the board for a critical security platform. If they go under or get acquired, we're exposed. Wiz just sent over a reference from Home Depot's CISO and a case study from Nordstrom. We don't have anything comparable in retail. I'd feel different if they had a F500 reference or some kind of risk mitigation on the vendor viability question. Decision is Monday — I'm presenting to the board Tuesday. We're out of time.

— Eric Tanaka, CISO, Colton Brands`,
        },
      ],
      quotes: [
        {
          speaker: 'Additional Context',
          role: 'Colton Deal',
          text: "Sandra's team ran a 2-week POC and strongly prefers Vantage Shield's auto-remediation over Wiz. Wiz is offering a 3-year contract at $190K/year (30% discount). Your standard price for Colton would be $240K/year, and you can discount up to 15% without VP approval. Colton's board recently approved a \"Zero Trust Architecture\" initiative with a 6-month deadline for measurable progress.",
        },
      ],
      slackMessages: [
        {
          sender: 'Hannah Liu',
          role: 'VP of Product',
          timestamp: '#product-launches',
          content: "Team — we're pulling the FedRAMP authorization announcement forward to next Wednesday. We got our authorization letter yesterday (!!!) and the CEO wants to beat Orca to the announcement. I need GTM support ASAP: press release review, sales enablement materials, and an updated competitive battlecard by Tuesday EOD. Who's on point?",
        },
        {
          sender: 'Dana Moretti',
          role: 'VP of Enterprise Sales',
          timestamp: '(direct message)',
          content: "{{PLAYER_NAME}}, you're in charge of both. Triage, prioritize, and execute. Brief me when I land.",
        },
      ],
      next: 's3_response',
    },

    s3_response: {
      id: 's3_response',
      type: 'crisis_response',
      scenario: 3,
      title: 'Your Crisis Response',
      content: 'Write a response covering all four parts below. Dana is on a flight to London and won\'t land for 6 hours. You\'re in charge.',
      next: 's3_dana_brief',
    },

    s3_dana_brief: {
      id: 's3_dana_brief',
      type: 'dana_brief',
      scenario: 3,
      title: 'Brief to Dana',
      content: '',
      next: 'grading',
    },

    // ── Grading & Report ────────────────────────────────────────
    grading: {
      id: 'grading',
      type: 'grading',
      scenario: 3,
      title: 'Evaluating Your Responses',
      content: 'Your responses are being evaluated by our AI assessor...',
      next: 'final_report',
    },

    final_report: {
      id: 'final_report',
      type: 'final_report',
      scenario: 3,
      title: 'Your Assessment Results',
      content: '',
      next: null,
    },
  },
}
