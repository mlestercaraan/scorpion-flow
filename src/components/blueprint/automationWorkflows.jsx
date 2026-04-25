// Each automation has a trigger and a list of steps.
// Steps can be: action, condition, delay, end

export const AUTOMATION_WORKFLOWS = [
  {
    key: 'qbr',
    title: 'QBR Scheduling Drip',
    priority: 'quick-win',
    description: 'Automated email sequence to schedule Quarterly Business Reviews with existing clients.',
    trigger: {
      label: 'Enrollment Trigger',
      detail: 'Contact property "Last QBR Date" is more than 90 days ago — OR — manually enrolled by owner.',
    },
    steps: [
      { type: 'action', label: 'Send Email #1', detail: 'Subject: "Let\'s schedule your Q2 business review." Personalized with firm name and owner name.' },
      { type: 'delay', label: 'Wait 3 Days', detail: 'If no reply or meeting booked within 3 days, proceed to next step.' },
      { type: 'condition', label: 'Meeting Booked?', detail: 'Check if contact has a meeting scheduled via HubSpot booking link.', yes: 'End — meeting confirmed', no: 'Continue sequence' },
      { type: 'action', label: 'Send Email #2', detail: 'Subject: "Quick follow-up on your QBR." Include direct booking link.' },
      { type: 'delay', label: 'Wait 5 Days', detail: 'Final hold before last-touch attempt.' },
      { type: 'action', label: 'Create Owner Task', detail: 'Task: "Call [Contact Name] to schedule QBR." Due in 2 days.' },
      { type: 'end', label: 'Unenroll', detail: 'Contact exits workflow. Re-check in 90 days.' },
    ],
  },
  {
    key: 'outbound',
    title: 'Outbound Follow-Up Sequence',
    priority: 'priority',
    description: 'Multi-touch email + task sequence after initial outreach. Ensures no prospects fall through the cracks.',
    trigger: {
      label: 'Enrollment Trigger',
      detail: 'Contact Lead Status set to "New" — OR — contact imported from prospect list and assigned to owner.',
    },
    steps: [
      { type: 'action', label: 'Send Email #1 — Introduction', detail: 'Personalized cold outreach referencing their firm type (RIA, CPA) and compliance context (SEC/FINRA).' },
      { type: 'delay', label: 'Wait 2 Days', detail: 'Allow time for the prospect to read and respond.' },
      { type: 'condition', label: 'Replied?', detail: 'Check if contact replied or booked a meeting.', yes: 'Move to Engaged — exit workflow', no: 'Continue' },
      { type: 'action', label: 'Send Email #2 — Value Add', detail: 'Share cybersecurity guide or compliance checklist relevant to their vertical.' },
      { type: 'delay', label: 'Wait 3 Days', detail: 'Mid-sequence pause.' },
      { type: 'action', label: 'Send Email #3 — Social Proof', detail: 'Reference a similar financial firm Royer serves. Include a direct booking link.' },
      { type: 'delay', label: 'Wait 4 Days', detail: 'Final pause before breakup.' },
      { type: 'action', label: 'Send Breakup Email', detail: '"I don\'t want to keep reaching out if the timing isn\'t right — happy to reconnect when it is."' },
      { type: 'action', label: 'Update Lead Status → Inactive', detail: 'Move contact to Inactive. Enroll in long-term nurture list.' },
      { type: 'end', label: 'Unenroll', detail: 'Sequence complete. Contact sits in Inactive until re-engagement trigger fires.' },
    ],
  },
  {
    key: 'inactive',
    title: 'Inactive Lead Logic',
    priority: 'priority',
    description: 'Automatically move unresponsive leads to Inactive status and trigger re-engagement.',
    trigger: {
      label: 'Enrollment Trigger',
      detail: 'Contact Lead Status = "Engaged" AND last activity date is more than 30 days ago.',
    },
    steps: [
      { type: 'action', label: 'Update Lead Status → Inactive', detail: 'Automatically change Lead Status property to "Inactive" in HubSpot.' },
      { type: 'action', label: 'Remove from Active Pipeline Views', detail: 'Contacts tagged Inactive are filtered out of the active board view via saved filters.' },
      { type: 'action', label: 'Enroll in Nurture List', detail: 'Add contact to "Long-Term Nurture" static list for quarterly re-engagement sends.' },
      { type: 'delay', label: 'Wait 90 Days', detail: 'Quarterly re-engagement check.' },
      { type: 'action', label: 'Send Re-Engagement Email', detail: 'Share a timely regulatory update or cybersecurity stat relevant to financial firms.' },
      { type: 'condition', label: 'Re-Engaged?', detail: 'Did the contact open, click, or reply?', yes: 'Update status → Engaged, notify owner', no: 'Return to Inactive — repeat cycle' },
      { type: 'end', label: 'Repeat or Archive', detail: 'After 6+ months with no engagement, flag for manual review or archive.' },
    ],
  },
  {
    key: 'assignment',
    title: 'Owner / Task Assignment',
    priority: 'quick-win',
    description: 'Auto-assign leads and create tasks based on territory, source, or deal stage.',
    trigger: {
      label: 'Enrollment Trigger',
      detail: 'New contact created via form submission, import, or HubSpot lead capture. No owner assigned.',
    },
    steps: [
      { type: 'condition', label: 'Check Lead Source', detail: 'What is the original lead source? (Google Ads, LinkedIn, Referral, List Import)', yes: 'Route by source', no: 'Default assignment' },
      { type: 'action', label: 'Assign Contact Owner', detail: 'Set Contact Owner based on territory or lead source routing rules defined in HubSpot.' },
      { type: 'action', label: 'Create Follow-Up Task', detail: 'Task: "Review new lead — [Contact Name] — [Company]." Due in 1 business day. Assigned to owner.' },
      { type: 'action', label: 'Send Internal Notification', detail: 'Email or Slack notification to assigned owner: "You have a new lead to review."' },
      { type: 'end', label: 'Unenroll', detail: 'Contact owner is set. Owner picks up from task queue.' },
    ],
  },
  {
    key: 'playbook',
    title: 'Meeting Prep / Playbooks',
    priority: 'priority',
    description: 'Pre-call checklist and playbook delivered automatically before scheduled meetings.',
    trigger: {
      label: 'Enrollment Trigger',
      detail: 'Meeting is scheduled via HubSpot booking link. Meeting type = "Free Assessment" or "Discovery Call."',
    },
    steps: [
      { type: 'action', label: 'Send Confirmation Email to Prospect', detail: 'Confirmation with meeting details, what to expect, and a brief Royer intro.' },
      { type: 'action', label: 'Send Prep Checklist to Owner', detail: 'Internal email with pre-call checklist: firm type, compliance obligations, known pain points, LinkedIn profile.' },
      { type: 'delay', label: 'Wait Until 1 Day Before', detail: 'Automated reminder timed to 24 hours before meeting.' },
      { type: 'action', label: 'Send Reminder to Prospect', detail: '"Looking forward to tomorrow\'s call — here\'s the agenda and meeting link."' },
      { type: 'action', label: 'Attach HubSpot Playbook to Deal', detail: 'Auto-attach the "Financial MSP Discovery" playbook to the associated deal record.' },
      { type: 'end', label: 'Unenroll After Meeting Date', detail: 'Workflow ends. Owner logs outcome and moves deal stage manually.' },
    ],
  },
  {
    key: 'caution',
    title: 'Do Not Over-Automate',
    priority: 'risk',
    description: 'A reminder to keep automations simple, tested, and maintainable.',
    trigger: {
      label: 'Guiding Principle',
      detail: 'This is not a live workflow — it\'s a strategic caution to review before building each automation.',
    },
    steps: [
      { type: 'condition', label: 'Is this automation clearly needed?', detail: 'Define the exact problem it solves before building. Avoid automating for automation\'s sake.', yes: 'Proceed', no: 'Do not build yet' },
      { type: 'action', label: 'Build One Step at a Time', detail: 'Start with a single trigger + one action. Test it live before adding branches or delays.' },
      { type: 'action', label: 'Test in a Sandbox Contact', detail: 'Enroll a test contact before activating for all leads. Verify every email, task, and property update.' },
      { type: 'condition', label: 'Is it working as expected?', detail: 'Review enrollment history, email sends, and task creation in HubSpot workflow analytics.', yes: 'Expand to full list', no: 'Fix and re-test' },
      { type: 'action', label: 'Document the Workflow', detail: 'Add a plain-language description in the HubSpot workflow description field. Note who owns it and when it was last reviewed.' },
      { type: 'end', label: 'Schedule Quarterly Review', detail: 'Set a calendar reminder every 90 days to audit all active workflows for relevance and performance.' },
    ],
  },
];