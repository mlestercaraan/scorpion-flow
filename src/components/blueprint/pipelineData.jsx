export const LEAD_STAGES = [
  {
    name: 'Prospect',
    definition: 'A contact that matches the ICP but has not been engaged yet. They are a known name in the target market.',
    entry: 'Imported from list, scraped source, or manually added. Matches ICP criteria (vertical, geography, size).',
    action: 'Enroll in outbound sequence or LinkedIn outreach cadence. Research company before first touch.',
    exit: 'Responds to outreach (positive or negative), books a meeting, or visits website.',
    hubspot: 'Lifecycle stage = Subscriber or Lead. Create custom lead status property. Auto-enroll in first-touch sequence.',
  },
  {
    name: 'Engaged',
    definition: 'A prospect who has shown intent — replied to email, connected on LinkedIn, visited key pages, or attended an event.',
    entry: 'Positive email reply, form submission, LinkedIn conversation, website visit to pricing/services page.',
    action: 'Personalized follow-up within 24 hours. Attempt to book discovery call. Assign owner if not already assigned.',
    exit: 'Discovery call booked → Qualified. No response after follow-up cadence → Inactive.',
    hubspot: 'Update lead status to "Engaged." Trigger task for owner. Track engagement score. Log all touchpoints.',
  },
  {
    name: 'Inactive',
    definition: 'A previously engaged lead that has gone cold. No response after multiple follow-up attempts.',
    entry: 'No reply after completing follow-up sequence. No website activity in 30+ days.',
    action: 'Move to nurture list. Periodic re-engagement email (quarterly). Monitor for renewed website visits.',
    exit: 'Re-engages → back to Engaged. 6+ months inactive → Archive or remove from active pipeline.',
    hubspot: 'Workflow to auto-move after X days of no activity. Add to long-term nurture list. Exclude from active reports.',
  },
  {
    name: 'Qualified',
    definition: 'Lead confirmed as a fit — budget, need, timing, and decision-maker access verified through conversation.',
    entry: 'Discovery call completed. Confirmed: matches ICP, has budget, active need, decision-maker accessible.',
    action: 'Create deal in Deal Pipeline. Schedule solution/proposal meeting. Begin solution design.',
    exit: 'Deal created → enters Deal Pipeline as "Qualified Opportunity."',
    hubspot: 'Convert to MQL/SQL lifecycle stage. Auto-create deal. Trigger deal pipeline automation. Notify team.',
  },
];

export const DEAL_STAGES = [
  {
    name: 'Qualified Opportunity',
    definition: 'A deal where the prospect has been qualified and confirmed as a real opportunity worth pursuing.',
    entry: 'Lead marked as Qualified. Discovery call completed. Budget, timeline, need, and authority confirmed.',
    action: 'Assign deal owner. Schedule discovery/scoping call. Prepare initial assessment or audit offer.',
    exit: 'First call completed → Discovery. Prospect disengages → Closed Lost.',
    hubspot: 'Deal created with amount estimate. Associate contacts and company. Set close date target. Create deal tasks.',
  },
  {
    name: 'Discovery / First Call',
    definition: 'Active engagement with prospect to understand their specific needs, pain points, and environment.',
    entry: 'First call scheduled and completed. Prospect actively participating in conversation.',
    action: 'Deep dive into current IT environment. Identify pain points and priorities. Present Royer\'s approach.',
    exit: 'Prospect requests proposal → Solution/Proposal. No fit identified → Closed Lost.',
    hubspot: 'Log call notes in deal. Update deal properties (pain points, current provider, timeline). Playbook for call prep.',
  },
  {
    name: 'Solution / Proposal',
    definition: 'Royer has presented a tailored solution or proposal. Prospect is evaluating and making a decision.',
    entry: 'Proposal or SOW sent. Prospect has reviewed or is scheduled to review.',
    action: 'Follow up on proposal. Address objections. Negotiate terms. Get verbal commitment or next steps.',
    exit: 'Verbal yes → Closed Won. Prospect declines → Closed Lost.',
    hubspot: 'Attach proposal document to deal. Set deal stage probability. Create follow-up tasks. Track proposal views if possible.',
  },
  {
    name: 'Closed Won / Lost',
    definition: 'Final outcome — either Royer wins the deal and begins onboarding, or the deal is lost with reasons documented.',
    entry: 'Contract signed (Won) or prospect formally declines (Lost).',
    action: 'Won: Begin onboarding, introduce to service team, celebrate. Lost: Document reason, add to win/loss analysis.',
    exit: 'Won: Transition to customer lifecycle. Lost: Archive deal, optionally add to future re-engagement.',
    hubspot: 'Update deal stage. Won: trigger onboarding workflow, update lifecycle to Customer. Lost: require closed-lost reason property.',
  },
];