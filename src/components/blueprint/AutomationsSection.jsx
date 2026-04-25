import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { AUTOMATION_WORKFLOWS } from './automationWorkflows';
import {
  Calendar, MailCheck, UserX, UserCheck, BookOpen, AlertTriangle,
  Zap, Clock, GitBranch, CheckCircle2, XCircle, ChevronDown, ChevronUp
} from 'lucide-react';

const ICONS = {
  qbr: Calendar,
  outbound: MailCheck,
  inactive: UserX,
  assignment: UserCheck,
  playbook: BookOpen,
  caution: AlertTriangle,
};

const PRIORITY_STYLES = {
  'quick-win': { badge: 'bg-secondary text-white', dot: 'bg-secondary', label: 'Quick Win' },
  'priority': { badge: 'bg-accent text-white', dot: 'bg-accent', label: 'Priority' },
  'risk': { badge: 'bg-destructive text-white', dot: 'bg-destructive', label: 'Caution' },
};

const STEP_CONFIG = {
  action: { icon: Zap, color: 'bg-primary/10 border-primary/20 text-primary', lineColor: 'bg-primary/20', label: 'Action' },
  delay: { icon: Clock, color: 'bg-amber-500/10 border-amber-400/20 text-amber-600', lineColor: 'bg-amber-400/20', label: 'Delay' },
  condition: { icon: GitBranch, color: 'bg-violet-500/10 border-violet-400/20 text-violet-600', lineColor: 'bg-violet-400/20', label: 'Condition' },
  end: { icon: CheckCircle2, color: 'bg-muted border-border text-muted-foreground', lineColor: 'bg-border', label: 'End' },
};

function WorkflowStep({ step, index, isLast }) {
  const [open, setOpen] = useState(false);
  const cfg = STEP_CONFIG[step.type];
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col items-center">
      {/* Connector line from above */}
      {index > 0 && (
        <div className={`w-0.5 h-6 ${cfg.lineColor}`} />
      )}

      {/* Step card */}
      <div className="w-full max-w-sm">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full text-left rounded-xl border px-4 py-3 shadow-sm hover:shadow-md transition-all ${cfg.color} ${open ? 'shadow-md' : ''}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 flex-shrink-0" />
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-60 block">{cfg.label}</span>
                <span className="text-sm font-semibold">{step.label}</span>
              </div>
            </div>
            {open ? <ChevronUp className="w-3.5 h-3.5 opacity-50 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />}
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pt-2 pb-3 text-xs text-muted-foreground leading-relaxed bg-card rounded-b-xl border border-t-0 border-border">
                {step.detail}
                {step.type === 'condition' && step.yes && (
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-secondary font-medium">
                      <CheckCircle2 className="w-3 h-3" /> Yes → {step.yes}
                    </span>
                    <span className="flex items-center gap-1.5 text-destructive font-medium">
                      <XCircle className="w-3 h-3" /> No → {step.no}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Connector line below (unless last) */}
      {!isLast && (
        <div className={`w-0.5 h-6 ${STEP_CONFIG[step.type].lineColor}`} />
      )}
    </div>
  );
}

function WorkflowDiagram({ workflow }) {
  const [triggerOpen, setTriggerOpen] = useState(false);

  return (
    <div className="flex flex-col items-center py-6 px-4 overflow-y-auto">
      {/* Trigger */}
      <div className="w-full max-w-sm mb-1">
        <button
          onClick={() => setTriggerOpen(!triggerOpen)}
          className="w-full text-left rounded-xl border-2 border-secondary bg-secondary/10 px-4 py-3 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-secondary flex-shrink-0" />
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-secondary block">Trigger</span>
                <span className="text-sm font-semibold text-foreground">{workflow.trigger.label}</span>
              </div>
            </div>
            {triggerOpen ? <ChevronUp className="w-3.5 h-3.5 text-secondary flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-secondary flex-shrink-0" />}
          </div>
        </button>
        <AnimatePresence>
          {triggerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pt-2 pb-3 text-xs text-muted-foreground leading-relaxed bg-card rounded-b-xl border border-t-0 border-secondary/20">
                {workflow.trigger.detail}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Steps */}
      {workflow.steps.map((step, i) => (
        <WorkflowStep key={i} step={step} index={i} isLast={i === workflow.steps.length - 1} />
      ))}
    </div>
  );
}

export default function AutomationsSection() {
  const [selected, setSelected] = useState(AUTOMATION_WORKFLOWS[0].key);
  const activeWorkflow = AUTOMATION_WORKFLOWS.find(w => w.key === selected);

  return (
    <section>
      <SectionHeader
        number="05"
        title="Automation Priorities"
        description="Select an automation to see the HubSpot workflow diagram. Click each step for details."
      />

      <div className="flex gap-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden min-h-[540px]">
        {/* Sidebar — 25% */}
        <div className="w-1/4 border-r border-border flex flex-col">
          <div className="px-3 py-2.5 border-b border-border bg-muted/40">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Workflows</span>
          </div>
          <div className="flex flex-col flex-1">
            {AUTOMATION_WORKFLOWS.map((w) => {
              const Icon = ICONS[w.key];
              const style = PRIORITY_STYLES[w.priority];
              const isActive = selected === w.key;
              return (
                <button
                  key={w.key}
                  onClick={() => setSelected(w.key)}
                  className={`w-full text-left px-3 py-3 flex items-start gap-2.5 border-b border-border transition-all ${
                    isActive ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-muted/50'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isActive ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </span>
                  <div className="min-w-0">
                    <span className={`text-xs font-semibold leading-tight block ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {w.title}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 inline-block px-1.5 py-0.5 rounded-full ${style.badge}`}>
                      {style.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workflow diagram — 75% */}
        <div className="w-3/4 overflow-y-auto bg-muted/20">
          <div className="px-5 py-3 border-b border-border bg-card flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">{activeWorkflow.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{activeWorkflow.description}</p>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex-shrink-0 ${PRIORITY_STYLES[activeWorkflow.priority].badge}`}>
              {PRIORITY_STYLES[activeWorkflow.priority].label}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <WorkflowDiagram workflow={activeWorkflow} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}