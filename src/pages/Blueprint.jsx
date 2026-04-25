import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import ICPSection from '@/components/blueprint/ICPSection';
import LeadSourcesSection from '@/components/blueprint/LeadSourcesSection';
import PipelineSection from '@/components/blueprint/PipelineSection';
import AutomationsSection from '@/components/blueprint/AutomationsSection';
import BuildPrioritiesSection from '@/components/blueprint/BuildPrioritiesSection';
import ResourcesSection from '@/components/blueprint/ResourcesSection';
import DecisionsSection from '@/components/blueprint/DecisionsSection';
import { LEAD_STAGES, DEAL_STAGES } from '@/components/blueprint/pipelineData';

const SLIDES = [
  {
    id: 'icp',
    label: 'ICP',
    description: 'Who Royer is targeting — the verticals, company sizes, geographies, and qualification signals that define a great-fit prospect.',
    component: <ICPSection />,
  },
  {
    id: 'lead-sources',
    label: 'Lead Sources',
    description: 'Where leads come from — the channels, tools, and strategies that feed contacts into the pipeline.',
    component: <LeadSourcesSection />,
  },
  {
    id: 'lead-pipeline',
    label: 'Lead Pipeline',
    description: 'The stages a contact moves through from first touch to qualified opportunity. Click a stage to see entry criteria, required actions, and HubSpot implications.',
    component: (
      <PipelineSection
        id="lead-pipeline"
        number="03"
        title="Lead Pipeline"
        stages={LEAD_STAGES}
      />
    ),
  },
  {
    id: 'deal-pipeline',
    label: 'Deal Pipeline',
    description: 'The stages an opportunity moves through from qualified lead to closed won or lost. Click a stage to review the detail.',
    component: (
      <PipelineSection
        id="deal-pipeline"
        number="04"
        title="Deal Pipeline"
        stages={DEAL_STAGES}
      />
    ),
  },
  {
    id: 'automations',
    label: 'Automations',
    description: 'The highest-value automations to build in HubSpot — prioritized by impact and implementation complexity.',
    component: <AutomationsSection />,
  },
  {
    id: 'build-priorities',
    label: 'Build Priorities',
    description: "The phased implementation plan — what gets built first, what comes next, and what's on the horizon.",
    component: <BuildPrioritiesSection />,
  },
  {
    id: 'resources',
    label: 'Resources',
    description: 'Quick links to key tools, documents, and platforms referenced throughout this engagement.',
    component: <ResourcesSection />,
  },
  {
    id: 'decisions',
    label: 'Decisions',
    description: 'Live action items and decisions captured during this session — track owner, priority, due date, and status.',
    component: <DecisionsSection />,
  },
];

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function Blueprint() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = useCallback(() => {
    if (current > 0) go(current - 1);
  }, [current, go]);

  const next = useCallback(() => {
    if (current < SLIDES.length - 1) go(current + 1);
  }, [current, go]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">

      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-border bg-card">
        <div>
          <span className="text-sm font-bold text-foreground">Royer</span>
          <span className="text-sm text-muted-foreground"> × </span>
          <span className="text-sm font-bold text-secondary">Serendipity</span>
          <span className="mx-2 text-border">·</span>
          <span className="text-xs text-muted-foreground">HubSpot Customer Journey Blueprint</span>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      {/* Tab nav */}
      <div className="flex-shrink-0 flex items-center gap-1 px-6 py-2 bg-card border-b border-border overflow-x-auto">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => go(i)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              current === i
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {slide.label}
          </button>
        ))}
      </div>

      {/* Slide description */}
      <div className="flex-shrink-0 px-6 py-2.5 bg-muted/50 border-b border-border">
        <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
          {SLIDES[current].description}
        </p>
      </div>

      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 overflow-y-auto"
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10">
              {SLIDES[current].component}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-t border-border bg-card">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all ${
                i === current
                  ? 'w-5 h-2 bg-primary'
                  : 'w-2 h-2 bg-border hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}