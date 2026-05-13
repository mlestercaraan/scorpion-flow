import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { useAutoSave } from '@/hooks/useAutoSave';
import { AUTOMATION_WORKFLOWS } from './automationWorkflows';
import WorkflowDiagram from './WorkflowDiagram';
import WorkflowWizard from './WorkflowWizard';
import {
  Calendar, MailCheck, UserX, UserCheck, BookOpen, AlertTriangle, Sparkles,
  Plus, Pencil, Trash2, MoreVertical, Copy
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PRIORITY_STYLES = {
  'quick-win': { badge: 'bg-secondary text-white', label: 'Quick Win', ring: 'border-l-secondary' },
  'priority':  { badge: 'bg-accent text-white', label: 'Priority', ring: 'border-l-accent' },
  'risk':      { badge: 'bg-destructive text-white', label: 'Caution', ring: 'border-l-destructive' },
};

const PRESET_ICONS = {
  qbr: Calendar, outbound: MailCheck, inactive: UserX,
  assignment: UserCheck, playbook: BookOpen, caution: AlertTriangle,
};

function getIcon(workflow) {
  return PRESET_ICONS[workflow.key] || Sparkles;
}

// Merge presets + saved custom workflows
function mergeWorkflows(saved) {
  const presets = AUTOMATION_WORKFLOWS.map(w => ({ ...w, isPreset: true }));
  return [...presets, ...(saved || [])];
}

export default function AutomationsSection() {
  const [customWorkflows, setCustomWorkflows] = useAutoSave('blueprint_custom_workflows', []);
  const [selectedKey, setSelectedKey] = useState(AUTOMATION_WORKFLOWS[0].key);
  const [showWizard, setShowWizard] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);

  const allWorkflows = mergeWorkflows(customWorkflows);
  const activeWorkflow = allWorkflows.find(w => w.key === selectedKey) || allWorkflows[0];

  const handleWizardComplete = (newWorkflow) => {
    if (editingWorkflow) {
      // Replace edited workflow
      setCustomWorkflows(customWorkflows.map(w =>
        w.key === editingWorkflow.key ? { ...newWorkflow, key: editingWorkflow.key } : w
      ));
      setSelectedKey(editingWorkflow.key);
    } else {
      setCustomWorkflows([...customWorkflows, newWorkflow]);
      setSelectedKey(newWorkflow.key);
    }
    setShowWizard(false);
    setEditingWorkflow(null);
  };

  const handleDelete = (key) => {
    setCustomWorkflows(customWorkflows.filter(w => w.key !== key));
    if (selectedKey === key) setSelectedKey(AUTOMATION_WORKFLOWS[0].key);
  };

  const handleDuplicate = (workflow) => {
    const copy = {
      ...workflow,
      key: `custom_${Date.now()}`,
      title: `${workflow.title} (Copy)`,
      isCustom: true,
      isPreset: false,
    };
    setCustomWorkflows([...customWorkflows, copy]);
    setSelectedKey(copy.key);
  };

  const handleEdit = (workflow) => {
    setEditingWorkflow(workflow);
    setShowWizard(true);
  };

  const priorityStyle = PRIORITY_STYLES[activeWorkflow?.priority] || PRIORITY_STYLES['priority'];

  return (
    <section>
      <div className="flex items-center justify-between mb-0">
        <SectionHeader
          number="06"
          title="Automation Workflows"
          description="Select a workflow to see its HubSpot diagram. Create custom workflows with the AI builder."
        />
        <button
          onClick={() => { setEditingWorkflow(null); setShowWizard(true); }}
          className="flex-shrink-0 flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm hover:bg-secondary/90 transition-all mb-6"
        >
          <Plus className="w-3.5 h-3.5" />
          New Workflow
        </button>
      </div>

      <div className="flex gap-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden min-h-[560px]">

        {/* Sidebar — 25% */}
        <div className="w-1/4 border-r border-border flex flex-col min-w-0">
          {/* Presets */}
          <div className="px-3 py-2 border-b border-border bg-muted/40 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Preset Templates</span>
          </div>
          {AUTOMATION_WORKFLOWS.map(w => {
            const Icon = getIcon(w);
            const style = PRIORITY_STYLES[w.priority];
            const isActive = selectedKey === w.key;
            return (
              <button
                key={w.key}
                onClick={() => setSelectedKey(w.key)}
                className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 border-b border-border transition-all ${
                  isActive ? 'bg-primary/5 border-l-[3px] border-l-primary' : 'hover:bg-muted/50 border-l-[3px] border-l-transparent'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isActive ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Icon className={`w-3 h-3 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-semibold leading-tight block truncate ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {w.title}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 inline-block px-1.5 py-0.5 rounded-full ${style.badge}`}>
                    {style.label}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Custom workflows */}
          {customWorkflows.length > 0 && (
            <>
              <div className="px-3 py-2 border-b border-t border-border bg-muted/40 mt-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">My Workflows</span>
              </div>
              {customWorkflows.map(w => {
                const Icon = getIcon(w);
                const style = PRIORITY_STYLES[w.priority] || PRIORITY_STYLES['priority'];
                const isActive = selectedKey === w.key;
                return (
                  <div
                    key={w.key}
                    className={`flex items-start gap-2.5 border-b border-border transition-all ${
                      isActive ? 'bg-primary/5 border-l-[3px] border-l-secondary' : 'hover:bg-muted/50 border-l-[3px] border-l-transparent'
                    }`}
                  >
                    <button
                      onClick={() => setSelectedKey(w.key)}
                      className="flex-1 text-left px-3 py-2.5 flex items-start gap-2.5 min-w-0"
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isActive ? 'bg-secondary/10' : 'bg-muted'}`}>
                        <Icon className={`w-3 h-3 ${isActive ? 'text-secondary' : 'text-muted-foreground'}`} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className={`text-xs font-semibold leading-tight block truncate ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {w.title}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 inline-block px-1.5 py-0.5 rounded-full ${style.badge}`}>
                          {style.label}
                        </span>
                      </div>
                    </button>
                    {/* Actions menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 mt-2 mr-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0">
                          <MoreVertical className="w-3 h-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-xs">
                        <DropdownMenuItem onClick={() => handleEdit(w)} className="gap-2">
                          <Pencil className="w-3 h-3" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(w)} className="gap-2">
                          <Copy className="w-3 h-3" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(w.key)} className="gap-2 text-destructive">
                          <Trash2 className="w-3 h-3" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </>
          )}

          {/* Create CTA at bottom */}
          <div className="mt-auto p-3 border-t border-border">
            <button
              onClick={() => { setEditingWorkflow(null); setShowWizard(true); }}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-secondary border border-dashed border-secondary/40 rounded-xl py-2 hover:bg-secondary/5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> New Workflow
            </button>
          </div>
        </div>

        {/* Diagram panel — 75% */}
        <div className="w-3/4 flex flex-col overflow-hidden bg-muted/20">
          {/* Panel header */}
          <div className="px-5 py-3 border-b border-border bg-card flex items-center justify-between flex-shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-foreground truncate">{activeWorkflow?.title}</h3>
                {activeWorkflow?.isCustom && (
                  <span className="text-[9px] font-bold bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full flex-shrink-0">AI-Generated</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{activeWorkflow?.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${priorityStyle.badge}`}>
                {priorityStyle.label}
              </span>
              {activeWorkflow?.isCustom && (
                <button
                  onClick={() => handleEdit(activeWorkflow)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground bg-muted px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Pencil className="w-3 h-3" /> Edit
                </button>
              )}
            </div>
          </div>

          {/* Diagram */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedKey}
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
      </div>

      {/* Wizard modal */}
      <AnimatePresence>
        {showWizard && (
          <WorkflowWizard
            onComplete={handleWizardComplete}
            onClose={() => { setShowWizard(false); setEditingWorkflow(null); }}
            editingWorkflow={editingWorkflow}
          />
        )}
      </AnimatePresence>
    </section>
  );
}