import React, { useState } from 'react';
import { SectionHeader } from './ICPSection';
import { EditableText } from './EditableText';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { Layers, Zap, Rocket, Plus, Trash2 } from 'lucide-react';

const INITIAL_PHASES = [
  {
    id: 'phase-1',
    icon: Layers,
    title: 'Phase 1: Foundation',
    color: 'text-primary',
    items: [
      'Import and clean contact database',
      'Set up lead pipeline stages in HubSpot',
      'Set up deal pipeline stages',
      'Configure contact properties and custom fields',
      'Set up lead source tracking (UTMs, forms)',
      'Owner assignment rules',
      'Basic list segmentation (ICP vs. non-ICP)',
    ],
  },
  {
    id: 'phase-2',
    icon: Zap,
    title: 'Phase 2: Quick Wins',
    color: 'text-secondary',
    items: [
      'Build QBR scheduling automation',
      'Create first outbound email sequence',
      'Set up meeting booking link with playbook',
      'Basic reporting dashboard (pipeline + activity)',
      'Inactive lead workflow',
      'Task automation for follow-ups',
    ],
  },
  {
    id: 'phase-3',
    icon: Rocket,
    title: 'Phase 3: Expansion',
    color: 'text-accent',
    items: [
      'Landing page buildout',
      'Google Ads integration and attribution',
      'LinkedIn tracking integration',
      'Advanced sequences (multi-channel)',
      'Prospecting tool evaluation (Apollo / HubSpot)',
      'Lead scoring model',
      'Advanced reporting and dashboards',
    ],
  },
];

export default function BuildPrioritiesSection() {
  const [phases, setPhases] = useState(INITIAL_PHASES);

  const updateItem = (phaseIdx, itemIdx, val) => {
    const next = [...phases];
    const items = [...next[phaseIdx].items];
    items[itemIdx] = val;
    next[phaseIdx] = { ...next[phaseIdx], items };
    setPhases(next);
  };

  const deleteItem = (phaseIdx, itemIdx) => {
    const next = [...phases];
    next[phaseIdx] = { ...next[phaseIdx], items: next[phaseIdx].items.filter((_, i) => i !== itemIdx) };
    setPhases(next);
  };

  const addItem = (phaseIdx) => {
    const next = [...phases];
    next[phaseIdx] = { ...next[phaseIdx], items: [...next[phaseIdx].items, 'New item'] };
    setPhases(next);
  };

  const updatePhaseTitle = (phaseIdx, val) => {
    const next = [...phases];
    next[phaseIdx] = { ...next[phaseIdx], title: val };
    setPhases(next);
  };

  return (
    <section>
      <SectionHeader number="06" title="Build Priorities" />
      <Accordion type="multiple" defaultValue={['phase-1']} className="space-y-3">
        {phases.map((phase, phaseIdx) => (
          <AccordionItem
            key={phase.id}
            value={phase.id}
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <phase.icon className={`w-5 h-5 ${phase.color} flex-shrink-0`} />
                <EditableText
                  value={phase.title}
                  onChange={(val) => updatePhaseTitle(phaseIdx, val)}
                  className="text-sm font-bold text-foreground"
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <ul className="space-y-1.5 ml-1">
                {phase.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <EditableText
                      value={item}
                      onChange={(val) => updateItem(phaseIdx, itemIdx, val)}
                      className="text-sm text-muted-foreground flex-1"
                    />
                    <button
                      onClick={() => deleteItem(phaseIdx, itemIdx)}
                      className="opacity-0 group-hover:opacity-60 hover:!opacity-100 text-destructive transition-opacity mt-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => addItem(phaseIdx)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-secondary transition-colors mt-1 ml-4"
                  >
                    <Plus className="w-3 h-3" /> Add item
                  </button>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}