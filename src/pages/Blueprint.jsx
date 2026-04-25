import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Printer, Loader2 } from 'lucide-react';
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
    Component: ICPSection,
    props: {},
  },
  {
    id: 'lead-sources',
    label: 'Lead Sources',
    description: 'Where leads come from — the channels, tools, and strategies that feed contacts into the pipeline.',
    Component: LeadSourcesSection,
    props: {},
  },
  {
    id: 'lead-pipeline',
    label: 'Lead Pipeline',
    description: 'The stages a contact moves through from first touch to qualified opportunity. Click a stage to see entry criteria, required actions, and HubSpot implications.',
    Component: PipelineSection,
    props: { id: 'lead-pipeline', number: '03', title: 'Lead Pipeline', stages: LEAD_STAGES, description: 'The stages a contact moves through from first touch to qualified opportunity. Click a stage to see entry criteria, required actions, and HubSpot implications.', hubspotUrl: 'https://app-na2.hubspot.com/contacts/245123419/objects/0-136/views/all/board?noprefetch=' },
  },
  {
    id: 'deal-pipeline',
    label: 'Deal Pipeline',
    description: 'The stages an opportunity moves through from qualified lead to closed won or lost. Click a stage to review the detail.',
    Component: PipelineSection,
    props: { id: 'deal-pipeline', number: '04', title: 'Deal Pipeline', stages: DEAL_STAGES, description: 'The stages an opportunity moves through from qualified lead to closed won or lost. Click a stage to review the detail.', hubspotUrl: 'https://app-na2.hubspot.com/contacts/245123419/objects/0-3/views/all/board?noprefetch=' },
  },
  {
    id: 'automations',
    label: 'Automations',
    description: 'The highest-value automations to build in HubSpot — prioritized by impact and implementation complexity.',
    Component: AutomationsSection,
    props: {},
  },
  {
    id: 'build-priorities',
    label: 'Build Priorities',
    description: "The phased implementation plan — what gets built first, what comes next, and what's on the horizon.",
    Component: BuildPrioritiesSection,
    props: {},
  },
  {
    id: 'resources',
    label: 'Resources',
    description: 'Quick links to key tools, documents, and platforms referenced throughout this engagement.',
    Component: ResourcesSection,
    props: {},
  },
  {
    id: 'decisions',
    label: 'Decisions',
    description: 'Live action items and decisions captured during this session — track owner, priority, due date, and status.',
    Component: DecisionsSection,
    props: {},
  },
];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function Blueprint() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [exporting, setExporting] = useState(false);
  const contentRef = useRef(null);

  const go = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = useCallback(() => { if (current > 0) go(current - 1); }, [current, go]);
  const next = useCallback(() => { if (current < SLIDES.length - 1) go(current + 1); }, [current, go]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);

      const el = contentRef.current;
      if (!el) return;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        scrollY: 0,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
        height: el.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgW = pageW;
      const imgH = pageW / ratio;
      let y = 0;

      // Add header
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(`Royer × Serendipity — HubSpot Customer Journey Blueprint — ${SLIDES[current].label}`, pageW / 2, 20, { align: 'center' });

      // Paginate
      const startY = 30;
      let remainingH = imgH;
      let srcY = 0;
      let page = 0;

      while (remainingH > 0) {
        const sliceH = Math.min(pageH - startY, remainingH);
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = (sliceH / imgH) * canvas.height;
        const ctx = sliceCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, srcY * (canvas.height / imgH), canvas.width, sliceCanvas.height, 0, 0, sliceCanvas.width, sliceCanvas.height);

        if (page > 0) pdf.addPage();
        pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 0, page === 0 ? startY : 0, imgW, sliceH);

        srcY += sliceH;
        remainingH -= sliceH;
        page++;
      }

      pdf.save(`Royer-Blueprint-${SLIDES[current].label.replace(/\s+/g, '-')}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  const slide = SLIDES[current];

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
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Printer className="w-3.5 h-3.5" />}
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>

      {/* Tab nav */}
      <div className="flex-shrink-0 flex items-center gap-1 px-6 py-2 bg-card border-b border-border overflow-x-auto">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              current === i
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {s.label}
          </button>
        ))}
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
            <div ref={contentRef} className="max-w-5xl mx-auto px-6 lg:px-12 py-10">
              <slide.Component {...slide.props} />
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

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all ${
                i === current ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-border hover:bg-muted-foreground'
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