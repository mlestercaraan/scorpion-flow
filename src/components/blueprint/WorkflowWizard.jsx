import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { LEAD_STAGES, DEAL_STAGES } from './pipelineData';

const STEPS = [
  {
    id: 'name',
    title: 'Name your workflow',
    subtitle: 'Give it a clear, descriptive name.',
    field: 'name',
    type: 'text',
    placeholder: 'e.g., New Lead Outreach Sequence',
  },
  {
    id: 'goal',
    title: 'What is the goal of this workflow?',
    subtitle: 'Choose the primary outcome you want to achieve.',
    field: 'goal',
    type: 'select',
    options: [
      { value: 'nurture_leads', label: 'Nurture new leads into meetings' },
      { value: 'qualify_leads', label: 'Qualify and move leads through the pipeline' },
      { value: 'reengage_inactive', label: 'Re-engage inactive contacts' },
      { value: 'close_deals', label: 'Accelerate deal closing' },
      { value: 'onboard_clients', label: 'Onboard new clients' },
      { value: 'assign_tasks', label: 'Assign owners and create tasks automatically' },
      { value: 'meeting_prep', label: 'Prepare team before meetings' },
      { value: 'custom', label: 'Something else (describe below)' },
    ],
  },
  {
    id: 'trigger',
    title: 'What triggers this workflow?',
    subtitle: 'When should HubSpot automatically start this workflow?',
    field: 'trigger',
    type: 'select',
    options: [
      { value: 'contact_created', label: 'New contact is created' },
      { value: 'form_submitted', label: 'Contact submits a form' },
      { value: 'lead_status_change', label: 'Lead status changes' },
      { value: 'deal_stage_change', label: 'Deal stage changes' },
      { value: 'meeting_booked', label: 'Meeting is booked' },
      { value: 'no_activity', label: 'No activity for X days' },
      { value: 'property_value', label: 'Contact property meets a condition' },
      { value: 'manual', label: 'Manually enrolled by owner' },
    ],
  },
  {
    id: 'pipeline_stage',
    title: 'Which pipeline stage is this for?',
    subtitle: 'Select the stage this workflow operates around.',
    field: 'pipeline_stage',
    type: 'select',
    options: [
      ...LEAD_STAGES.map(s => ({ value: `lead_${s.name}`, label: `Lead Pipeline → ${s.name}` })),
      ...DEAL_STAGES.map(s => ({ value: `deal_${s.name}`, label: `Deal Pipeline → ${s.name}` })),
      { value: 'all', label: 'Applies across all stages' },
    ],
  },
  {
    id: 'actions',
    title: 'What actions should happen?',
    subtitle: 'Select all that apply.',
    field: 'actions',
    type: 'multi',
    options: [
      { value: 'send_email', label: '📧 Send automated emails' },
      { value: 'create_task', label: '✅ Create a follow-up task' },
      { value: 'notify_owner', label: '🔔 Notify the contact owner' },
      { value: 'update_property', label: '📝 Update a contact/deal property' },
      { value: 'enroll_sequence', label: '🔄 Enroll in a sequence' },
      { value: 'create_deal', label: '💼 Create a deal record' },
      { value: 'set_lifecycle', label: '📊 Update lifecycle stage' },
      { value: 'add_to_list', label: '📋 Add to a static list' },
    ],
  },
  {
    id: 'delays',
    title: 'Does this workflow have wait/delay steps?',
    subtitle: 'Time delays between actions give contacts breathing room.',
    field: 'delays',
    type: 'select',
    options: [
      { value: 'yes_short', label: 'Yes — short delays (1–3 days between steps)' },
      { value: 'yes_long', label: 'Yes — longer delays (1–2 weeks between steps)' },
      { value: 'timed', label: 'Yes — timed to a specific date/event' },
      { value: 'no', label: 'No — all steps fire immediately' },
    ],
  },
  {
    id: 'conditions',
    title: 'Should any steps be conditional?',
    subtitle: 'Branching logic based on contact behavior.',
    field: 'conditions',
    type: 'multi',
    options: [
      { value: 'replied', label: 'Did the contact reply to an email?' },
      { value: 'meeting_booked', label: 'Did they book a meeting?' },
      { value: 'opened_email', label: 'Did they open an email?' },
      { value: 'stage_change', label: 'Did their stage change?' },
      { value: 'property_match', label: 'Does a property match a value?' },
      { value: 'none', label: 'No conditions — linear workflow' },
    ],
  },
  {
    id: 'priority',
    title: 'What priority is this workflow?',
    subtitle: 'This helps with planning and implementation order.',
    field: 'priority',
    type: 'select',
    options: [
      { value: 'quick-win', label: '⚡ Quick Win — simple, high impact, build first' },
      { value: 'priority', label: '🎯 Priority — important but more complex' },
      { value: 'risk', label: '⚠️ Caution — requires careful planning' },
    ],
  },
  {
    id: 'notes',
    title: 'Any additional context?',
    subtitle: 'Anything else the HubSpot builder should know?',
    field: 'notes',
    type: 'textarea',
    placeholder: 'e.g., This should only apply to RIA firms in Maryland. Owner is Steve Royer...',
  },
];

export default function WorkflowWizard({ onComplete, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generating, setGenerating] = useState(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step) / STEPS.length) * 100;

  const getValue = () => answers[current.field] ?? (current.type === 'multi' ? [] : '');

  const setValue = (val) => setAnswers({ ...answers, [current.field]: val });

  const toggleMulti = (val) => {
    const curr = answers[current.field] || [];
    if (curr.includes(val)) setValue(curr.filter(v => v !== val));
    else setValue([...curr, val]);
  };

  const canAdvance = () => {
    const v = getValue();
    if (current.type === 'multi') return v.length > 0;
    if (current.type === 'textarea') return true; // optional
    return !!v;
  };

  const generate = async () => {
    setGenerating(true);
    try {
      const pipelineContext = `
Lead Pipeline Stages: ${LEAD_STAGES.map(s => `${s.name} (${s.definition})`).join('; ')}
Deal Pipeline Stages: ${DEAL_STAGES.map(s => `${s.name} (${s.definition})`).join('; ')}
ICP: Financial advisors, RIAs, CPA firms, wealth managers, 5-50 employees, DMV region, compliance obligations (SEC/FINRA/GLBA/IRS).
      `.trim();

      const prompt = `
You are a HubSpot workflow expert building a workflow for Royer Networks, an MSP serving financial firms.

Context about this business:
${pipelineContext}

User's workflow requirements:
- Name: ${answers.name || 'Unnamed Workflow'}
- Goal: ${answers.goal}
- Trigger: ${answers.trigger}
- Pipeline stage context: ${answers.pipeline_stage}
- Actions desired: ${(answers.actions || []).join(', ')}
- Delay preference: ${answers.delays}
- Conditions needed: ${(answers.conditions || []).join(', ')}
- Priority: ${answers.priority}
- Additional notes: ${answers.notes || 'None'}

Generate a detailed HubSpot workflow as a JSON object with this exact shape:
{
  "title": "string",
  "description": "string (1-2 sentences describing what this workflow does)",
  "priority": "quick-win" | "priority" | "risk",
  "trigger": {
    "label": "string (short trigger name)",
    "detail": "string (full description of the trigger condition in HubSpot)"
  },
  "steps": [
    {
      "type": "action" | "delay" | "condition" | "end",
      "label": "string (short step name)",
      "detail": "string (full HubSpot-specific instructions for this step)",
      "yes": "string (only for condition type — what happens if YES)",
      "no": "string (only for condition type — what happens if NO)"
    }
  ]
}

Rules:
- Include 5-10 steps that are realistic for HubSpot
- Use specific HubSpot property names, enrollment criteria, and action types
- Reference Royer Networks, financial firms, compliance requirements (SEC/FINRA/GLBA) where relevant
- Make the detail fields actionable — a HubSpot admin should be able to build this exactly
- Use delay steps where the user asked for them
- Use condition steps where the user asked for branching
- Always end with an "end" type step
- Return only the JSON object, no markdown, no explanation
      `.trim();

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            priority: { type: 'string' },
            trigger: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                detail: { type: 'string' },
              },
            },
            steps: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  label: { type: 'string' },
                  detail: { type: 'string' },
                  yes: { type: 'string' },
                  no: { type: 'string' },
                },
              },
            },
          },
        },
      });

      const workflow = {
        key: `custom_${Date.now()}`,
        isCustom: true,
        ...result,
        priority: answers.priority || result.priority || 'priority',
        title: answers.name || result.title,
      };

      onComplete(workflow);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleNext = async () => {
    if (isLast) {
      await generate();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">Workflow Builder</span>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-muted-foreground">Step {step + 1} of {STEPS.length}</span>
            <span className="text-[10px] text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-base font-bold text-foreground mb-1">{current.title}</h2>
              <p className="text-xs text-muted-foreground mb-4">{current.subtitle}</p>

              {current.type === 'text' && (
                <input
                  autoFocus
                  value={getValue()}
                  onChange={e => setValue(e.target.value)}
                  placeholder={current.placeholder}
                  className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40"
                />
              )}

              {current.type === 'textarea' && (
                <textarea
                  value={getValue()}
                  onChange={e => setValue(e.target.value)}
                  placeholder={current.placeholder}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40 resize-none"
                />
              )}

              {current.type === 'select' && (
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {current.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setValue(opt.value)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${
                        getValue() === opt.value
                          ? 'border-secondary bg-secondary/10 text-foreground font-semibold'
                          : 'border-border hover:border-secondary/40 hover:bg-muted/40 text-muted-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {current.type === 'multi' && (
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {current.options.map(opt => {
                    const selected = (getValue()).includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleMulti(opt.value)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all flex items-center gap-3 ${
                          selected
                            ? 'border-secondary bg-secondary/10 text-foreground font-semibold'
                            : 'border-border hover:border-secondary/40 hover:bg-muted/40 text-muted-foreground'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected ? 'bg-secondary border-secondary' : 'border-border'}`}>
                          {selected && <span className="text-white text-[8px] font-bold">✓</span>}
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canAdvance() || generating}
            className="flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-secondary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : isLast ? (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Workflow
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}