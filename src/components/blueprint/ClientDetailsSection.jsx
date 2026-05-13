import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Hash, FileText, ExternalLink, UserCog, Target } from 'lucide-react';
import { SectionHeader } from './ICPSection';
import { useSession } from '@/lib/SessionContext';
import { HUBSPOT_PLANS, HUBSPOT_HUBS } from '@/lib/sessionStore';

const Field = ({ icon: Icon, label, hint, children }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
    </div>
    {children}
    {hint && <p className="text-xs text-muted-foreground/80 leading-relaxed">{hint}</p>}
  </div>
);

const TextInput = (props) => (
  <input
    {...props}
    className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40 transition-all"
  />
);

const TextArea = (props) => (
  <textarea
    {...props}
    rows={4}
    className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40 transition-all resize-y min-h-[90px]"
  />
);

const PillButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
      active
        ? 'bg-secondary/15 border-secondary/40 text-secondary font-semibold'
        : 'bg-muted/40 border-border text-muted-foreground hover:bg-muted'
    }`}
  >
    {children}
  </button>
);

export default function ClientDetailsSection() {
  const { session, update } = useSession();

  if (!session) return null;

  const client = session.client || {};
  const hubs = client.hubspotHubs || [];

  const set = (field, value) => {
    update(session.id, { client: { [field]: value } });
  };

  const toggleHub = (hub) => {
    const next = hubs.includes(hub) ? hubs.filter((h) => h !== hub) : [...hubs, hub];
    set('hubspotHubs', next);
  };

  const setPlan = (plan) => {
    set('hubspotPlan', client.hubspotPlan === plan ? '' : plan);
  };

  const hubspotPreview = client.hubspotPortalId
    ? `https://app-na2.hubspot.com/contacts/${client.hubspotPortalId}`
    : null;

  return (
    <section id="session-details">
      <SectionHeader
        number="01"
        title="Session Details"
        description="A quick grounding for today's working session — your business, your HubSpot setup, who's driving this internally, and what we're hoping to walk away with."
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid lg:grid-cols-2 gap-6 mt-8"
      >
        {/* Your Business */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-3.5 h-3.5 text-primary" />
            </span>
            Your Business
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Business Name" hint="Appears across every slide and on the take-home PDF.">
              <TextInput
                value={client.name || ''}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. your firm's name"
              />
            </Field>
            <Field
              label="Industry"
              hint="Helps us tailor workflow examples and recommendations to your sector."
            >
              <TextInput
                value={client.industry || ''}
                onChange={(e) => set('industry', e.target.value)}
                placeholder="e.g. Financial Services, Healthcare, E-commerce"
              />
            </Field>
          </div>
        </div>

        {/* Your HubSpot Portal — Portal ID + Plan + Hubs */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Hash className="w-3.5 h-3.5 text-orange-600" />
            </span>
            Your HubSpot Portal
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field
              label="Portal ID"
              hint="Your HubSpot account ID. The pipeline slides will link directly into your board so we can review it live."
            >
              <TextInput
                value={client.hubspotPortalId || ''}
                onChange={(e) => set('hubspotPortalId', e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 245123419"
                inputMode="numeric"
              />
              {hubspotPreview && (
                <a
                  href={hubspotPreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-secondary hover:underline mt-2"
                >
                  Open in HubSpot <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </Field>
            <Field label="Plan / Tier" hint="The overall HubSpot tier you're on.">
              <div className="flex flex-wrap gap-1.5">
                {HUBSPOT_PLANS.map((plan) => (
                  <PillButton
                    key={plan}
                    active={client.hubspotPlan === plan}
                    onClick={() => setPlan(plan)}
                  >
                    {plan}
                  </PillButton>
                ))}
              </div>
            </Field>
          </div>
          <Field label="Hubs in Use" hint="Which HubSpot products are active in your account today.">
            <div className="flex flex-wrap gap-1.5">
              {HUBSPOT_HUBS.map((hub) => (
                <PillButton
                  key={hub}
                  active={hubs.includes(hub)}
                  onClick={() => toggleHub(hub)}
                >
                  {hub}
                </PillButton>
              ))}
            </div>
          </Field>
        </div>

        {/* Internal Owner */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
              <UserCog className="w-3.5 h-3.5 text-violet-600" />
            </span>
            Internal Owner
          </h3>
          <Field
            label="Who owns HubSpot here?"
            hint="The primary champion who'll drive HubSpot internally after this session."
          >
            <TextInput
              value={client.ownerName || ''}
              onChange={(e) => set('ownerName', e.target.value)}
              placeholder="e.g. Maria Chen"
            />
          </Field>
          <Field label="Role">
            <TextInput
              value={client.ownerRole || ''}
              onChange={(e) => set('ownerRole', e.target.value)}
              placeholder="e.g. VP of Sales"
            />
          </Field>
        </div>

        {/* Today's Success Criteria */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
            </span>
            Today's Success Criteria
          </h3>
          <Field
            label="What does a great session look like?"
            hint="What you want to walk away with by the end of today. We'll check back against this in the Decisions tab."
          >
            <TextArea
              value={client.successCriteria || ''}
              onChange={(e) => set('successCriteria', e.target.value)}
              placeholder="e.g. Have the lead pipeline stages agreed and the top 3 automations prioritized…"
            />
          </Field>
        </div>

        {/* Goals for This Session */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 text-amber-600" />
            </span>
            Goals for This Session
          </h3>
          <Field
            label="What we're working toward today"
            hint="Goals, decision-makers, constraints, anything that matters for today's session."
          >
            <TextArea
              value={client.notes || ''}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="e.g. Build the lead pipeline before our Q2 launch. The COO is the decision-maker. We need to balance compliance reporting with speed of outreach…"
            />
          </Field>
        </div>

        <div className="lg:col-span-2 flex items-center justify-end text-[11px] text-muted-foreground/70 px-1">
          <span>Last saved {new Date(session.updatedAt).toLocaleString()}</span>
        </div>
      </motion.div>
    </section>
  );
}
