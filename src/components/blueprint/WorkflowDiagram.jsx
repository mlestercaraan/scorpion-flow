import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, GitBranch, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const STEP_CONFIG = {
  action: { icon: Zap, color: 'bg-primary/10 border-primary/20 text-primary', lineColor: 'bg-primary/20', label: 'Action' },
  delay: { icon: Clock, color: 'bg-amber-500/10 border-amber-400/20 text-amber-600', lineColor: 'bg-amber-400/20', label: 'Delay' },
  condition: { icon: GitBranch, color: 'bg-violet-500/10 border-violet-400/20 text-violet-600', lineColor: 'bg-violet-400/20', label: 'Condition' },
  end: { icon: CheckCircle2, color: 'bg-muted border-border text-muted-foreground', lineColor: 'bg-border', label: 'End' },
};

function WorkflowStep({ step, index }) {
  const [open, setOpen] = useState(false);
  const cfg = STEP_CONFIG[step.type] || STEP_CONFIG.action;
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col items-center">
      <div className={`w-0.5 h-5 ${cfg.lineColor}`} />
      <div className="w-full max-w-md">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full text-left rounded-xl border px-4 py-3 shadow-sm hover:shadow-md transition-all ${cfg.color}`}
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
    </div>
  );
}

export default function WorkflowDiagram({ workflow }) {
  const [triggerOpen, setTriggerOpen] = useState(false);

  if (!workflow) return null;

  return (
    <div className="flex flex-col items-center py-6 px-6">
      {/* Trigger node */}
      <div className="w-full max-w-md">
        <button
          onClick={() => setTriggerOpen(!triggerOpen)}
          className="w-full text-left rounded-xl border-2 border-secondary bg-secondary/10 px-4 py-3 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-secondary flex-shrink-0" />
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-secondary block">Trigger</span>
                <span className="text-sm font-semibold text-foreground">{workflow.trigger?.label}</span>
              </div>
            </div>
            {triggerOpen
              ? <ChevronUp className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
              : <ChevronDown className="w-3.5 h-3.5 text-secondary flex-shrink-0" />}
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
                {workflow.trigger?.detail}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Steps */}
      {(workflow.steps || []).map((step, i) => (
        <WorkflowStep key={i} step={step} index={i} />
      ))}
    </div>
  );
}