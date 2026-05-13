import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Printer, Loader2, ChevronDown,
  Plus, Trash2, Check,
  Building2, Target, Megaphone, Inbox, Briefcase, Zap, Layers, Library, ClipboardCheck,
} from 'lucide-react';
import ClientDetailsSection from '@/components/blueprint/ClientDetailsSection';
import ICPSection from '@/components/blueprint/ICPSection';
import LeadSourcesSection from '@/components/blueprint/LeadSourcesSection';
import PipelineSection from '@/components/blueprint/PipelineSection';
import AutomationsSection from '@/components/blueprint/AutomationsSection';
import BuildPrioritiesSection from '@/components/blueprint/BuildPrioritiesSection';
import ResourcesSection from '@/components/blueprint/ResourcesSection';
import DecisionsSection from '@/components/blueprint/DecisionsSection';
import { LEAD_STAGES, DEAL_STAGES } from '@/components/blueprint/pipelineData';
import { useSession } from '@/lib/SessionContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const hubspotBoardUrl = (portalId, objectId) =>
  portalId
    ? `https://app-na2.hubspot.com/contacts/${portalId}/objects/${objectId}/views/all/board?noprefetch=`
    : '';

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function Blueprint() {
  const { session, sessions, setActive, create, remove } = useSession();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [exporting, setExporting] = useState(false);
  const contentRef = useRef(null);

  const clientName = session?.client?.name?.trim() || 'New Session';
  const portalId = session?.client?.hubspotPortalId || '';

  const SLIDES = useMemo(() => [
    { id: 'session-details', label: 'Session Details', Icon: Building2, Component: ClientDetailsSection, props: {} },
    { id: 'icp', label: 'ICP', Icon: Target, Component: ICPSection, props: {} },
    { id: 'lead-sources', label: 'Lead Sources', Icon: Megaphone, Component: LeadSourcesSection, props: {} },
    {
      id: 'lead-pipeline',
      label: 'Lead Pipeline',
      Icon: Inbox,
      Component: PipelineSection,
      props: {
        id: 'lead-pipeline',
        number: '04',
        title: 'Lead Pipeline',
        stages: LEAD_STAGES,
        description:
          'The stages a contact moves through from first touch to qualified opportunity. Click a stage to see entry criteria, required actions, and HubSpot implications.',
        hubspotUrl: hubspotBoardUrl(portalId, '0-136'),
      },
    },
    {
      id: 'deal-pipeline',
      label: 'Deal Pipeline',
      Icon: Briefcase,
      Component: PipelineSection,
      props: {
        id: 'deal-pipeline',
        number: '05',
        title: 'Deal Pipeline',
        stages: DEAL_STAGES,
        description:
          'The stages an opportunity moves through from qualified lead to closed won or lost. Click a stage to review the detail.',
        hubspotUrl: hubspotBoardUrl(portalId, '0-3'),
      },
    },
    { id: 'automations', label: 'Automations', Icon: Zap, Component: AutomationsSection, props: {} },
    { id: 'build-priorities', label: 'Build Priorities', Icon: Layers, Component: BuildPrioritiesSection, props: {} },
    { id: 'resources', label: 'Resources', Icon: Library, Component: ResourcesSection, props: {} },
    { id: 'decisions', label: 'Decisions', Icon: ClipboardCheck, Component: DecisionsSection, props: {} },
  ], [portalId]);

  const go = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = useCallback(() => { if (current > 0) go(current - 1); }, [current, go]);
  const next = useCallback(() => { if (current < SLIDES.length - 1) go(current + 1); }, [current, go, SLIDES.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  // Snap to Session Details when active session changes (helps the "new session" flow)
  useEffect(() => {
    if (session && !session.client?.name) setCurrent(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.id]);

  const handleNewSession = () => {
    create({ name: '' });
    setCurrent(0);
  };

  const handleDeleteSession = () => {
    if (!session) return;
    if (!window.confirm(`Delete the session "${clientName}"? This permanently removes all of its slide data.`)) return;
    remove(session.id);
    setCurrent(0);
  };

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

      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(`${clientName} × Serendipity — HubSpot Flow Session — ${SLIDES[current].label}`, pageW / 2, 20, { align: 'center' });

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

      const safeName = (clientName || 'session').replace(/[^a-z0-9-_]+/gi, '-');
      pdf.save(`${safeName}-${SLIDES[current].label.replace(/\s+/g, '-')}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  if (!session) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">Loading session…</div>
      </div>
    );
  }

  const slide = SLIDES[current];

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">

      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3 min-w-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-2.5 py-1 rounded-md hover:bg-muted transition-colors min-w-0">
              <div className="text-left min-w-0">
                <div className="text-sm font-bold text-foreground truncate max-w-[180px] sm:max-w-[260px]">
                  {clientName}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground/80">
                  HubSpot Flow Session
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Sessions ({sessions.length})
              </DropdownMenuLabel>
              {sessions.map((s) => (
                <DropdownMenuItem
                  key={s.id}
                  onClick={() => { setActive(s.id); setCurrent(0); }}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span className="truncate">
                    {s.client?.name?.trim() || <span className="text-muted-foreground italic">Unnamed session</span>}
                  </span>
                  {s.id === session.id && <Check className="w-3.5 h-3.5 text-secondary flex-shrink-0" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleNewSession} className="cursor-pointer">
                <Plus className="w-3.5 h-3.5 mr-2" /> New session
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteSession}
                className="cursor-pointer text-destructive focus:text-destructive"
                disabled={sessions.length <= 1}
              >
                <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete current
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="hidden md:inline text-border">·</span>
          <span className="hidden md:inline text-sm text-muted-foreground">× Serendipity</span>
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
            className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all min-w-[92px] ${
              current === i
                ? 'bg-gradient-to-br from-primary to-primary/85 text-primary-foreground shadow-md ring-1 ring-primary/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/10'
            }`}
          >
            <s.Icon className="w-5 h-5" />
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={`${session.id}-${current}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 overflow-y-auto"
          >
            <div ref={contentRef} className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
              <slide.Component {...slide.props} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-t border-border bg-card">
        <button
          type="button"
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              className={`rounded-full transition-all ${
                i === current ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-border hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-sm hover:bg-primary/90 active:translate-y-px disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
