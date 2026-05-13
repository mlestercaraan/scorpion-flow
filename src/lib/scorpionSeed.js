// Scorpion Security demo data — seeded into a fresh visitor's session.
// Keeps the live deployment ready-to-present without requiring the populate helper.

export const SCORPION_CLIENT = {
  name: 'Scorpion Security Products, Inc.',
  industry: 'Retail display security & loss prevention (anti-theft hardware for retail SKUs)',
  hubspotPortalId: '',
  hubspotPlan: 'Professional',
  hubspotHubs: ['Sales', 'Marketing'],
  ownerName: 'Sara Yezzi',
  ownerRole: 'Operations Manager',
  successCriteria:
    "By end of session: (1) Scorpion's sales process and current pipelines mapped on Miro, (2) Sales Hub onboarding action items in Teamwork prioritized by impact, and (3) directional alignment on the NetSuite ↔ HubSpot integration approach.",
  notes:
    'Sales team returning to HubSpot after a pause — operations-led rollout owned by Sara (started Feb 2026). 10-hour Sales Hub onboarding SOW; Lester takes lead while Jacoby is in Europe through end of May. Top priorities: streamline comms off MS Teams + email into HubSpot as single source of truth; NetSuite ERP integration is essential (start with free app, evaluate API later). Sales motion: RFP-heavy for big-box (Burlington, Target, TJX) with 6–12 month cycles; mid-market sample-to-PO. Notable Latin American market (tuna-can security). 30+ patents, in-house innovation team — products customizable. Future scope: customer service hub, possibly Commerce Hub for quoting. Pending: HubSpot account billing fix from old → new portal.',
};

export const SCORPION_SECTIONS = {
  blueprint_icp: [
    { title: 'Primary Verticals', image: '', items: ['Big-Box Retailers (Burlington, Target, TJX)', 'Specialty Retail Chains', 'Grocery & Convenience Stores', 'Wireless Phone Dealers', 'Pharmacies & Drug Stores'] },
    { title: 'Company Size', image: '', items: ['Multi-store chains', '50+ retail locations', 'Dedicated AP/LP function', 'Annual loss-prevention budget'] },
    { title: 'Geography', image: '', items: ['North America (primary market)', 'Latin America (tuna-can security)', '2,280+ retailers globally'] },
    { title: 'Qualification Signals', image: '', items: ['Active Asset Protection / Loss Prevention leader', 'High-shrink categories (electronics, beverages, OTC, formula, liquor)', 'Multi-store retail footprint', 'Open RFP cycle or AP/LP refresh', 'Interest in patented, customizable display security'] },
  ],
  blueprint_lead_sources: [
    { title: 'Website Form Fills', color: 'bg-blue-500/10 text-blue-600', description: 'Organic traffic to scorpionsp.com via product pages, plus sample-request forms.', tracking: 'Form submissions, page views, UTM parameters, sample-request conversion.', decision: 'Which product landing pages to prioritize? What forms drive samples?' },
    { title: 'LinkedIn Outreach', color: 'bg-sky-500/10 text-sky-600', description: "Outreach to AP/LP leaders at multi-store retailers — Sara's prior playbook to formalize.", tracking: 'LinkedIn-sourced contacts, connection-to-meeting rate, content engagement.', decision: 'Who owns LinkedIn outreach? Sequences via HubSpot?' },
    { title: 'Google Ads (PPC)', color: 'bg-emerald-500/10 text-emerald-600', description: 'Local agency ramping; keywords like "asset protection", "retail display security", "alarm tags".', tracking: 'Ad spend, cost per lead, keyword performance, landing page attribution.', decision: 'Initial budget? Top keywords? Which landing page per ad group?' },
    { title: 'Trade Shows', color: 'bg-amber-500/10 text-amber-600', description: 'Booth presence at retail / AP conferences — recent example: trade show contact → RFP invite.', tracking: 'Show attribution, lead source = Trade Show, conversion to sample/RFP.', decision: 'Standard post-show import workflow? Owner for follow-up cadence?' },
    { title: 'Sample Program', color: 'bg-violet-500/10 text-violet-600', description: 'Many prospects evaluate via small-quantity samples (often 30-day in-store trial) before PO.', tracking: 'Sample-request-to-PO conversion, days-to-decision, trial dropout reasons.', decision: 'Custom property "Samples Shipped Date"? 7/14/30-day follow-up cadence?' },
    { title: 'Buyer Intent Tools', color: 'bg-rose-500/10 text-rose-600', description: 'Zoom intent today; HubSpot Buyer Intent tool worth piloting after Sales Hub Pro is live.', tracking: 'Surge accounts, intent topic, website visits matched to target list.', decision: 'Zoom vs. HubSpot native — or both? Who reviews surges weekly?' },
  ],
  'blueprint_pipeline_lead-pipeline': [
    { name: 'Prospect', definition: 'AP/LP leader at a multi-store retailer in a high-shrink category who has not yet been engaged.', entry: 'Imported from trade show list, scraped list, LinkedIn search, or website form. ICP-confirmed.', action: 'Enroll in outbound email sequence or LinkedIn outreach. Research store count + shrink categories.', exit: 'Replies, requests samples, or books a discovery call.', hubspot: 'Lifecycle = Lead. Custom property "Lead Status". Auto-enroll in first-touch sequence tagged by lead source.' },
    { name: 'Engaged', definition: 'Prospect has shown intent — replied to outreach, connected, visited scorpionsp.com, or downloaded a guide.', entry: 'Positive email reply, LinkedIn message, scorpionsp.com visit to a product page, or guide download.', action: 'Personalized follow-up within 24h referencing their store base + shrink category. Offer samples or a 30-min discovery call.', exit: 'Sample requested → Sample / Trial. Discovery call confirms fit → Qualified.', hubspot: 'Update Lead Status to "Engaged". Trigger owner task. Log all touchpoints. Engagement score against sequence.' },
    { name: 'Sample / Trial', definition: 'Samples shipped (often small qty) and/or deployed in 1+ stores for a typical 30-day evaluation.', entry: 'Sample-request form submitted or verbal ask in discovery.', action: 'Ship samples. Schedule 7/14/30-day check-ins. Capture qualitative in-store feedback.', exit: 'Positive trial → Qualified. No traction after 30+ days → Inactive / Closed Lost.', hubspot: 'Custom properties "Samples Shipped Date" + "Trial Start Date". Workflow auto-creates 7/14/30-day follow-up tasks.' },
    { name: 'Qualified', definition: 'Decision-maker engaged, ICP confirmed, budget/timeline in scope. Ready for proposal or RFP submission.', entry: 'Sample success or discovery confirms strong fit. Quantity, customization, and timeline understood.', action: 'Create deal in Deal Pipeline. Prep proposal aligned to retailer quantities, customizations, tariff/freight treatment.', exit: 'Deal created → enters Deal Pipeline at "Qualified Opportunity".', hubspot: 'Lifecycle = SQL. Auto-create deal record. Notify owner. Set initial deal amount estimate.' },
  ],
  'blueprint_pipeline_deal-pipeline': [
    { name: 'Qualified Opportunity', definition: 'A retailer confirmed as a strong Scorpion fit — multi-store, high-shrink category, decision-maker engaged.', entry: 'Lead qualified from Lead Pipeline. Quantity, customization, and timeline directional.', action: 'Assign deal owner. Schedule scoping call. Pull together initial customization + tariff scenarios.', exit: 'Scoping call complete → Discovery. Prospect disengages → Closed Lost.', hubspot: 'Auto-create deal from qualified lead. Amount estimate, expected close date. Associate contact + company.' },
    { name: 'Discovery / Scoping', definition: 'Active scoping conversation to understand quantities, customizations, freight/tariff treatment, and rollout timing.', entry: 'Scoping call scheduled and completed. Prospect sharing volumes, store list, and product spec.', action: 'Align on quantities, customizations, freight (DDP), tariff treatment. Surface any innovation-team customization needs.', exit: 'Prospect requests proposal → Proposal / RFP Submitted. No fit → Closed Lost.', hubspot: 'Log call notes. Update deal properties: store count, customization scope, target ship date, freight terms.' },
    { name: 'Proposal / RFP Submitted', definition: 'Scorpion has delivered a tailored quote — including tariffs, DDP, freight breakdown — and the retailer is reviewing.', entry: 'Proposal or RFP response sent. Prospect reviewing internally.', action: 'Follow up on proposal. Address questions on lead time (China 45d + boat 35d), customizations, or tariff scenarios. Offer reference calls.', exit: 'Verbal yes / PO issued → Closed Won. Declines or goes silent → Closed Lost.', hubspot: 'Attach proposal to deal. Set deal probability. Create follow-up task sequence. Log objections.' },
    { name: 'Closed Won / Lost', definition: 'PO signed (Won) or vendor selected elsewhere / no decision (Lost).', entry: 'PO received and accepted (Won) or formal decline / RFP loss notice (Lost).', action: 'Won: Trigger production handoff to NetSuite (sales order generated), warehouse pick if stock, kickoff with supplier overseas if special order. Lost: Document reason (price, lead time, competitor).', exit: 'Won: Customer lifecycle, post-sale support workflow. Lost: Archive, schedule re-engagement in 6–12 months.', hubspot: 'Won: Lifecycle = Customer, push to NetSuite via integration, notify warehouse / supply chain. Lost: Required closed-lost reason. Nurture list.' },
  ],
  blueprint_build_priorities: [
    { id: 'phase-1', title: 'Phase 1: Foundation', items: ['Import existing customer + prospect database', 'Set up Lead Pipeline stages (Prospect → Engaged → Sample/Trial → Qualified)', 'Set up Deal Pipeline stages (Qualified Opp → Discovery → Proposal → Closed)', 'Configure contact + company properties (store count, shrink categories, AP/LP role, RFP cycle)', 'Sample tracking via custom properties (Samples Shipped Date, Trial Start Date)', 'Owner assignment rules across sales team', 'Migrate sales-related comms off MS Teams into HubSpot'] },
    { id: 'phase-2', title: 'Phase 2: Quick Wins', items: ['Cold outbound email sequence (AP/LP persona)', 'Meeting booking link for sales team', 'Sample-request form on scorpionsp.com → HubSpot', 'Internal alerts on new RFP enrollments', 'Trade-show contact import workflow', 'Dashboard: pipeline, sample-to-PO conversion, sales-cycle length', 'HubSpot Buyer Intent setup (compared to Zoom intent)'] },
    { id: 'phase-3', title: 'Phase 3: Expansion', items: ['NetSuite ↔ HubSpot integration (free app first, evaluate API)', 'Marketing Hub: landing pages for top product lines + SEO content', 'HubSpot Prospecting Agent / Apollo evaluation', 'Lead scoring (store count × shrink intensity × buyer intent)', 'Commerce Hub evaluation for quoting vs current website ordering portal', 'Service Hub evaluation for post-sale support', 'DocuSign integration for sales orders'] },
  ],
  blueprint_resources: [
    { title: 'HubSpot Portal', url: '#', color: 'bg-orange-500/10 text-orange-600' },
    { title: 'Lead Pipeline (HubSpot)', url: '#', color: 'bg-orange-500/10 text-orange-600' },
    { title: 'Deal Pipeline (HubSpot)', url: '#', color: 'bg-emerald-500/10 text-emerald-600' },
    { title: 'Scorpion Website', url: 'https://scorpionsp.com/', color: 'bg-slate-500/10 text-slate-600' },
    { title: 'Scorpion on LinkedIn', url: 'https://www.linkedin.com/company/scorpionsecure', color: 'bg-sky-500/10 text-sky-600' },
    { title: 'Sara on LinkedIn', url: '#', color: 'bg-sky-500/10 text-sky-600' },
    { title: 'Discovery Spreadsheet', url: '#', color: 'bg-blue-500/10 text-blue-600' },
    { title: 'Follow-up Email', url: '#', color: 'bg-violet-500/10 text-violet-600' },
    { title: 'Miro Mapping Board', url: '#', color: 'bg-red-500/10 text-red-600' },
    { title: 'Teamwork Project Plan', url: '#', color: 'bg-amber-500/10 text-amber-600' },
  ],
  blueprint_decisions: [
    { id: 1, decision: "Map Scorpion's sales process + pipelines on Miro", owner: 'Lester + Sara', priority: 'High', due: '2026-05-13', status: 'In Progress' },
    { id: 2, decision: 'Prioritize Sales Hub onboarding items in Teamwork', owner: 'Sara + Lester', priority: 'High', due: '2026-05-13', status: 'Open' },
    { id: 3, decision: 'Resolve HubSpot portal billing fix (old → new account subscriptions)', owner: 'Sara + Kyle@HubSpot', priority: 'High', due: '2026-05-16', status: 'In Progress' },
    { id: 4, decision: 'Decide NetSuite ↔ HubSpot integration approach (free app vs API)', owner: 'Sara + Lester', priority: 'Medium', due: '', status: 'Open' },
    { id: 5, decision: 'Evaluate Commerce Hub for quoting vs current website ordering portal', owner: 'Sara', priority: 'Medium', due: '', status: 'Open' },
    { id: 6, decision: 'Confirm if Customer Service Hub gets added to SOW', owner: 'Sara', priority: 'Medium', due: '', status: 'Open' },
    { id: 7, decision: 'Send Sara follow-up email + Teamwork invite', owner: 'Jacoby', priority: 'High', due: '2026-05-07', status: 'Done' },
  ],
};
