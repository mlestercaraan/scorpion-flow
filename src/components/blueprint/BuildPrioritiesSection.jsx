import React from 'react';
import { SectionHeader } from './ICPSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Layers, Zap, Rocket } from 'lucide-react';

const PHASES = [
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
  return (
    <section id="build-priorities">
      <SectionHeader number="06" title="Build Priorities" />
      <Accordion type="multiple" defaultValue={['phase-1']} className="space-y-3">
        {PHASES.map((phase) => (
          <AccordionItem
            key={phase.id}
            value={phase.id}
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <phase.icon className={`w-5 h-5 ${phase.color}`} />
                <span className="text-sm font-bold text-foreground">{phase.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <ul className="space-y-2 ml-1">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}