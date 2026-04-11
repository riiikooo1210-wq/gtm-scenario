import type { AccountEntry, RootCauseEntry } from '../types/game'

export const sampleAnswers = {
  playerName: 'Test User',

  // ── Scenario 1: Target Account List ──────────────────────────
  prioritizationCriteria: `I prioritized accounts based on four criteria:
1. Active cloud migration or multi-cloud expansion (creates urgency for security posture management)
2. Industry fit — financial services, healthcare, or SaaS/tech where we have reference customers
3. Company size in the 3,000–15,000 employee range where we've proven success (similar to MedVault and FinLedger)
4. Absence of FedRAMP requirement (since we're not yet authorized) and likelihood of SOC 2 / ISO 27001 being sufficient
5. Identifiable entry point — a CISO or VP of Security we can reach through warm channels or timely triggers`,

  accounts: [
    {
      name: 'Meridian Health Systems',
      rationale: 'Meridian (6,200 employees, healthcare) announced a $400M cloud-first digital transformation initiative last quarter. They are migrating from on-prem data centers to AWS and Azure, which creates an immediate need for cloud security posture management. As a healthcare org, they face HIPAA compliance pressure. Our MedVault reference (same vertical, similar size) gives us instant credibility. They are not a federal entity, so FedRAMP is not required.',
      contact: 'Rachel Torres, VP of Information Security — she spoke at HIMSS last month about cloud migration security challenges, making her the ideal first contact who understands the problem we solve.',
    },
    {
      name: 'NovaPay Financial',
      rationale: 'NovaPay (4,500 employees, fintech/payments) is expanding from single-cloud (AWS) to multi-cloud with GCP for their new real-time payments platform. Multi-cloud expansion is our sweet spot. They need SOC 2 and PCI-DSS compliance across both environments. Our FinLedger reference is a direct peer — similar size fintech that went through the same transition. Their CISO recently posted on LinkedIn about "visibility gaps in multi-cloud security."',
      contact: 'David Kim, CISO — active on LinkedIn discussing multi-cloud security challenges. We could get a warm intro through our FinLedger champion.',
    },
    {
      name: 'Cascade Software Group',
      rationale: 'Cascade (3,800 employees, enterprise SaaS) just acquired two smaller SaaS companies and is consolidating infrastructure across AWS and Azure. Post-M&A cloud consolidation creates urgent security posture challenges — they need to assess and unify security across three previously separate environments. They are SOC 2 Type II certified themselves, so they understand and value our certifications.',
      contact: 'Maria Chen, Head of Cloud Security — newly created role post-acquisition, tasked with unifying security across the merged environments. A new leader in a new role is highly receptive to vendor conversations.',
    },
    {
      name: 'TrueNorth Insurance',
      rationale: 'TrueNorth (9,100 employees, financial services/insurance) is in the middle of a 3-year cloud migration from legacy mainframe to Azure. Insurance companies face strict regulatory requirements (state DOI regulations, NYDFS cybersecurity requirements) that map well to our compliance reporting capabilities. They are large enough to be a meaningful logo but not so large that the sales cycle becomes 12+ months.',
      contact: 'James Wright, Director of Cloud Infrastructure Security — he is leading the migration security workstream and would be the technical evaluator. His team is the one feeling the pain of the migration.',
    },
    {
      name: 'Helix Therapeutics',
      rationale: 'Helix (3,400 employees, biotech/healthcare) is scaling rapidly after FDA approval of their lead drug and expanding cloud infrastructure to support commercial operations. They need to go from startup-grade security to enterprise-grade quickly. Similar size and trajectory to MedVault, and our healthcare reference will resonate. HIPAA compliance for their clinical data in the cloud is a key driver.',
      contact: 'Priya Sharma, VP of IT & Security — she was recently hired from a larger pharma company specifically to "mature the security function," which means she has budget and mandate to buy tools like ours.',
    },
  ] as AccountEntry[],

  // ── Scenario 2: Diagnostic Memo ──────────────────────────────
  rootCauses: [
    {
      title: 'Wrong persona targeting — outreach is hitting IT Directors, not security leaders',
      explanation: 'The SDR team is using contact lists pulled from our mid-market playbook, which targeted IT generalists. Enterprise security buying decisions are made by CISOs, VPs of Security, and Security Architects — not IT Directors. Jordan confirmed the team is reaching the wrong personas, which explains the 4.2% response rate (vs. 12% target). Security leaders ignore emails that aren\'t relevant to their function.',
      actions: 'Action 1: Rebuild contact lists for all 47 accounts within 3 days using LinkedIn Sales Navigator filtered to security titles (CISO, VP Security, Director of Cloud Security, Security Architect). Action 2: Assign 2 SDRs to research and map the security org chart for our top 10 priority accounts by end of week 1.',
    },
    {
      title: 'Messaging is mid-market — not enterprise-grade, and triggering spam filters',
      explanation: 'The outreach templates were carried over from mid-market without adaptation. Enterprise email systems (Proofpoint, Mimecast) flag templated mass outreach. Additionally, mid-market messaging assumes the prospect already knows what CSPM is, but enterprise buyers often don\'t — Jordan noted AEs spend 45 minutes explaining the category. The messaging needs to lead with business outcomes and compliance, not product features.',
      actions: 'Action 1: Rewrite all outbound sequences within 5 days with compliance-led messaging (lead with SOC 2, ISO 27001, regulatory risk) instead of product-feature messaging. Action 2: Reduce sending volume per domain to avoid spam triggers — max 3 emails per company per week, and use personalized subject lines referencing the prospect\'s specific cloud initiative or regulatory environment.',
    },
    {
      title: 'No enterprise-specific sales enablement — AEs lack category education materials',
      explanation: 'AEs are spending 45 minutes per discovery call explaining what cloud security posture management is. This means we have no pre-call content or category education material to send prospects before the meeting. In enterprise sales, you educate before the call so the call focuses on business impact and fit, not "what is this?" This is extending Stage 1 from 14 days to 31 days.',
      actions: 'Action 1: Create a 1-page "Cloud Security Posture Management 101" brief that AEs can send before discovery calls — due in 5 business days. Action 2: Build a 2-minute explainer video or infographic that positions CSPM in the context of cloud migration risk — AEs send this in meeting confirmation emails. Action 3: Create a discovery call framework that starts with the prospect\'s cloud environment and compliance requirements, not our product.',
    },
    {
      title: 'Colton Brands deal stuck due to stale SOC 2 report — no compliance bridge process',
      explanation: 'The Colton Brands deal ($145K pipeline) has been in legal review for 3 weeks because our SOC 2 Type II report is 8 months old and their procurement team wants a bridge letter. We apparently have no standard process for handling this common enterprise procurement requirement, which will become a recurring blocker as we sell to more enterprises.',
      actions: 'Action 1: Work with our compliance team to produce a SOC 2 bridge letter within 48 hours — this is a standard document that attests to continued controls effectiveness between audit periods. Action 2: Create a "Compliance Ready Kit" with pre-built bridge letter templates and current certification docs that sales can send proactively to enterprise procurement teams during legal review.',
    },
  ] as RootCauseEntry[],

  // ── Scenario 3: Crisis Response ──────────────────────────────
  triagePrioritization: `Priority 1: Colton Brands rescue (URGENT — decision is Monday, board presentation Tuesday)
Priority 2: FedRAMP launch GTM support (HIGH — announcement Wednesday, materials due Tuesday EOD)

Rationale: Colton is a live deal worth ~$204K/year that we will lose by Monday if we don't act today. It's a closing deal with a hard deadline — the CISO is presenting to the board Tuesday. The FedRAMP launch is important but we have until Tuesday EOD for materials, giving us more runway.

My plan for the next 6 hours (before Dana lands):
- Hours 1-2: Execute Colton rescue actions (calls, proposal draft)
- Hours 2-4: Draft FedRAMP enablement materials and coordinate with Product
- Hours 4-6: Finalize both, prepare Dana brief

I am NOT doing these sequentially — I'll kick off async tasks (like requesting the MedVault reference call and getting Legal on the bridge letter) in parallel while working on FedRAMP materials.`,

  coltonRescuePlan: `The forwarded email reveals Eric Tanaka's (CISO) two objections: (1) vendor viability risk of a 290-person startup, and (2) no F500 retail reference comparable to Wiz's Home Depot/Nordstrom references.

Immediate actions (next 2 hours):

1. VENDOR VIABILITY — Counter the "startup risk" objection:
   - Draft a Vendor Risk Mitigation proposal that includes: source code escrow agreement (if we go under, they get the code), contractual SLA guarantees with financial penalties, and a 90-day termination clause in year 1 that lets them exit if we fail to meet uptime/support SLAs. This costs us nothing but gives Eric a concrete risk mitigation story for the board.
   - Include our funding and growth metrics (ARR growth, customer count, retention rate) in a 1-page "Company Viability Brief."

2. REFERENCE GAP — We don't have a F500 retail reference, so don't pretend we do:
   - Reach out to MedVault's CISO today and ask if they'd do a 15-minute reference call with Colton's team. While not retail, MedVault is a regulated enterprise that chose us over larger vendors — the buying logic is analogous.
   - Position Sandra Mullins' own POC results as the strongest reference — her team already prefers our auto-remediation over Wiz. Frame this: "Your own engineers are the best reference."

3. PRICING — Make the commercial terms a no-brainer:
   - Offer a 1-year pilot at $204K (15% discount from $240K) with expansion pricing locked for years 2-3. This undercuts Wiz's $190K/year 3-year commitment on a per-year basis while giving Colton flexibility. A 1-year pilot also directly addresses vendor viability concern — they're not locked in for 3 years.
   - Include the Zero Trust Architecture alignment: position our platform as accelerating their board-mandated Zero Trust initiative with measurable 90-day milestones.

4. DELIVERY — Get this to Sandra (the internal champion) by end of today:
   - Sandra received the forwarded email, which means she's our ally. Send her a package she can forward to Eric: the Vendor Risk Mitigation proposal, the pilot terms, and the MedVault reference offer. Make it easy for her to advocate for us internally.`,

  fedRampHandling: `FedRAMP authorization is a massive competitive differentiator — this changes our enterprise positioning overnight. Here's my execution plan:

TUESDAY EOD DELIVERABLES:

1. COMPETITIVE BATTLECARD UPDATE (I'll own this, draft by Monday EOD):
   - Add FedRAMP Authorized status to our compliance section
   - Update competitive comparison: we now have FedRAMP + SOC 2 Type II + ISO 27001. Check which competitors (Wiz, Orca, Lacework) have FedRAMP — if Orca doesn't have it yet and we're beating them to the announcement, that's a key differentiator
   - Add talk track for federal/public sector opportunities that were previously off-limits
   - Add objection handling: "What about FedRAMP?" is now answered

2. SALES ENABLEMENT MATERIALS (coordinate with Product by Monday):
   - Request from Hannah's team: the authorization letter details, scope of authorization, and any technical specifics
   - Create a 1-page "What FedRAMP Means for Your Deal" internal brief for AEs — when to bring it up, which prospects care, how to position it
   - Update the Compliance Ready Kit with FedRAMP certification details

3. PRESS RELEASE REVIEW (Monday):
   - Review Hannah's draft press release for GTM accuracy — ensure customer-facing claims are supportable
   - Suggest adding a quote from Dana or the CRO about enterprise traction
   - Flag if any competitive claims need legal review

4. IMMEDIATE PIPELINE IMPACT:
   - Flag this for the Colton deal — FedRAMP authorization (even though they don't require it) signals organizational maturity and reduces the "startup risk" objection. Add it to the Vendor Viability Brief.
   - Identify any stalled deals in pipeline where FedRAMP was a blocker — those can be reactivated immediately
   - Brief the SDR team on updated messaging that includes FedRAMP as a credibility signal in outbound`,

  danaBrief: `Dana — here's your landing brief. Two things hit this morning, both handled.

COLTON BRANDS (URGENT — decision Monday):
Got an accidentally forwarded email from Eric Tanaka (CISO). He's leaning Wiz over us due to two concerns: vendor viability risk (we're a 290-person startup) and no F500 retail reference. His team actually prefers our product technically.

What I've done:
• Drafting a Vendor Risk Mitigation package: code escrow, SLA guarantees, 90-day exit clause in Y1
• Reaching out to MedVault's CISO for a reference call — best analog we have
• Proposing a 1-year pilot at $204K (our max 15% discount) vs Wiz's $190K/yr 3-year lock-in
• Packaging everything for Sandra Mullins (our internal champion) to hand to Eric today

Need from you: Approve the 15% discount and 1-year pilot structure. Any relationship leverage with MedVault's CISO to expedite the reference call.

FEDRAMP LAUNCH (announcement Wednesday):
Hannah is pulling the FedRAMP announcement forward — authorization letter received. She needs battlecard, enablement materials, and press release review by Tuesday EOD.

What I've done:
• Drafting updated competitive battlecard with FedRAMP positioning (Monday EOD)
• Coordinating with Product on technical details for sales enablement
• Will review press release Monday
• Already flagging FedRAMP for the Colton deal as an additional vendor maturity signal

Need from you: A quote for the press release if Hannah wants one from Sales leadership. Any stalled deals you know of where FedRAMP was the blocker — I'll reactivate outreach.

Net: Colton is saveable if we move today. FedRAMP materials are on track for Tuesday. I'll have both wrapped before you land. Call me if you need anything adjusted.`,
}
