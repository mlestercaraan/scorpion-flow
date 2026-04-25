export const LEAD_STAGES = [
  {
    name: 'Prospect',
    definition: 'A financial firm contact matching Royer\'s ICP (RIA, CPA, wealth manager, 5–50 employees, DMV region) that has not yet been engaged.',
    entry: 'Imported from scraped list, referral, LinkedIn search, or Google Ads lead. Matches ICP: vertical, geography, firm size, and likely compliance obligation.',
    action: 'Enroll in outbound email sequence or LinkedIn outreach cadence. Research firm\'s regulatory exposure (SEC/FINRA/GLBA) before first touch.',
    exit: 'Responds to outreach, books a Free Assessment call, or submits a website form.',
    hubspot: 'Lifecycle stage = Lead. Create custom "Lead Status" property. Auto-enroll in first-touch sequence tagged to lead source (Google Ads, LinkedIn, list).',
  },
  {
    name: 'Engaged',
    definition: 'A prospect who has shown intent: replied to an email, connected on LinkedIn, visited the Royer website (services/compliance pages), or requested the cybersecurity guide.',
    entry: 'Positive email reply, LinkedIn message response, royernetworks.com visit to financial advisor or CPA page, or guide download.',
    action: 'Personalized follow-up within 24 hours referencing their firm type and compliance context. Attempt to book Free Assessment via HubSpot scheduling link.',
    exit: 'Assessment call booked → Qualified. No response after full sequence → Inactive.',
    hubspot: 'Update Lead Status to "Engaged." Trigger owner task. Log all touchpoints. Track engagement score against sequence.',
  },
  {
    name: 'Inactive',
    definition: 'A previously engaged lead that has gone cold — no response after the full follow-up cadence.',
    entry: 'No reply after completing email sequence. No website activity in 30+ days.',
    action: 'Move to long-term nurture list. Quarterly re-engagement email with relevant content (cybersecurity guide, regulatory update). Monitor for renewed activity.',
    exit: 'Re-engages → back to Engaged. 6+ months inactive → Archive or remove from active pipeline.',
    hubspot: 'Workflow auto-moves after defined inactivity window. Enroll in nurture list. Exclude from active pipeline reports.',
  },
  {
    name: 'Qualified',
    definition: 'Lead confirmed as a Royer fit: financial firm in DMV, 5–50 employees, compliance-driven IT need, decision-maker engaged, and ready to explore a proposal.',
    entry: 'Free Assessment call completed. Confirmed: ICP match, active IT/cybersecurity need, regulatory obligation (SEC/FTC/IRS), and managing partner or owner accessible.',
    action: 'Create deal in Deal Pipeline. Schedule Solution/Proposal meeting. Begin scoping their compliance environment.',
    exit: 'Deal created → enters Deal Pipeline at "Qualified Opportunity."',
    hubspot: 'Update lifecycle to SQL. Auto-create deal record associated to contact and company. Trigger deal pipeline notification to team.',
  },
];

export const DEAL_STAGES = [
  {
    name: 'Qualified Opportunity',
    definition: 'A financial firm confirmed as a strong Royer fit: correct vertical (RIA, CPA, wealth manager), 5–50 employees in the DMV region, active compliance-driven IT need.',
    entry: 'Lead qualified from Lead Pipeline. Free Assessment completed. Budget, timeline, compliance need, and managing partner/owner engaged.',
    action: 'Assign deal owner. Schedule Discovery/Scoping call. Prep by reviewing firm\'s regulatory environment (SEC, FINRA, FTC Safeguards, IRS).',
    exit: 'Discovery call completed → Discovery / First Call. Prospect disengages → Closed Lost.',
    hubspot: 'Auto-create deal from qualified lead. Set amount estimate, expected close date. Associate contact and company records. Create initial deal tasks.',
  },
  {
    name: 'Discovery / First Call',
    definition: 'Active scoping conversation to understand the firm\'s current IT environment, regulatory obligations, pain points, and technology gaps.',
    entry: 'Discovery call scheduled and completed. Prospect actively sharing details about current setup, provider, and compliance posture.',
    action: 'Audit current IT/cybersecurity posture. Identify gaps vs. SEC/FINRA/FTC Safeguards/GLBA/IRS requirements. Present Royer\'s compliance-driven MSP approach and vCIO services.',
    exit: 'Prospect requests proposal or SOW → Solution / Proposal. No fit confirmed → Closed Lost.',
    hubspot: 'Log call notes in deal. Update deal properties: current provider, compliance obligations, pain points, timeline. Use meeting playbook for consistency.',
  },
  {
    name: 'Solution / Proposal',
    definition: 'Royer has delivered a tailored managed IT/cybersecurity proposal aligned to the firm\'s compliance obligations and infrastructure needs.',
    entry: 'Proposal or SOW sent referencing specific regulatory requirements (e.g., SEC cybersecurity rule, FTC Safeguards, GLBA). Prospect reviewing.',
    action: 'Follow up on proposal. Address objections around cost, transition, or regulatory specifics. Offer reference calls with existing financial firm clients. Push for verbal commitment.',
    exit: 'Verbal yes / contract signed → Closed Won. Prospect declines or goes silent → Closed Lost.',
    hubspot: 'Attach proposal to deal record. Set deal probability. Create follow-up task sequence. Log objections as deal notes.',
  },
  {
    name: 'Closed Won / Lost',
    definition: 'Final outcome: Royer wins the engagement and begins onboarding the financial firm, or the deal is lost with documented reason.',
    entry: 'MSA/SOW signed (Won) or prospect formally declines (Lost).',
    action: 'Won: Kickoff onboarding, introduce to Royer service team, begin compliance environment buildout. Lost: Document reason (price, timing, competitor), note regulatory context for future re-engagement.',
    exit: 'Won: Transition to Customer lifecycle. Onboarding workflow triggered. Lost: Archive deal, schedule re-engagement check-in in 6–12 months.',
    hubspot: 'Won: Update lifecycle to Customer, trigger onboarding workflow, notify service team. Lost: Require closed-lost reason property, add to long-term nurture list.',
  },
];