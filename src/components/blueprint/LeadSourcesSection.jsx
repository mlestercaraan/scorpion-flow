import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { EditableText } from './EditableText';
import { useAutoSave } from '@/hooks/useAutoSave';
import {
  Globe, Linkedin, Search, FileSpreadsheet, Mail, Rocket,
  Plus, Trash2, ChevronDown,
} from 'lucide-react';

// Icons kept separate — cannot be serialized to localStorage
const SOURCE_ICONS = [Globe, Linkedin, Search, FileSpreadsheet, Mail, Rocket];

const COLOR_OPTIONS = [
  'bg-blue-500/10 text-blue-600',
  'bg-sky-500/10 text-sky-600',
  'bg-emerald-500/10 text-emerald-600',
  'bg-amber-500/10 text-amber-600',
  'bg-violet-500/10 text-violet-600',
  'bg-rose-500/10 text-rose-600',
];

const INITIAL_SOURCES = [
  {
    title: 'Website / Landing Pages',
    color: 'bg-blue-500/10 text-blue-600',
    description: "The client's website and targeted landing pages.",
    tracking: 'Form submissions, page views, UTM parameters, landing page conversion rates.',
    decision: 'Which landing pages to build first? What forms are needed? What content offers drive conversion?',
  },
  {
    title: 'LinkedIn',
    color: 'bg-sky-500/10 text-sky-600',
    description: 'Organic outreach and content marketing via LinkedIn targeting decision-makers.',
    tracking: 'LinkedIn-sourced contacts, connection-to-meeting conversion, content engagement.',
    decision: 'Who owns LinkedIn outreach? Manual vs. automated? Integration with HubSpot sequences?',
  },
  {
    title: 'Google Ads',
    color: 'bg-emerald-500/10 text-emerald-600',
    description: 'Paid search targeting relevant keywords.',
    tracking: 'Ad spend, cost per lead, keyword performance, landing page attribution.',
    decision: 'Budget allocation? Which keywords to target first? Landing page strategy?',
  },
  {
    title: 'Prospect Lists',
    color: 'bg-amber-500/10 text-amber-600',
    description: 'Curated lists from directories, associations, and industry databases.',
    tracking: 'List source, import date, initial outreach status, response rates.',
    decision: 'How to segment imported lists? Compliance considerations? Enrichment workflow?',
  },
  {
    title: 'Email Sequences',
    color: 'bg-violet-500/10 text-violet-600',
    description: 'Outbound email sequences for cold and warm prospects.',
    tracking: 'Open rates, reply rates, meeting booked rate, sequence performance.',
    decision: 'How many sequences? What cadence? Sales vs. marketing ownership?',
  },
  {
    title: 'Future Prospecting Tools',
    color: 'bg-rose-500/10 text-rose-600',
    description: 'Tools like Apollo.io or HubSpot Prospecting Agent for scaled outbound.',
    tracking: 'Tool-sourced contacts, enrichment accuracy, pipeline contribution.',
    decision: 'Apollo vs. HubSpot native tools? Budget? When to introduce?',
  },
];

function DetailRow({ label, children }) {
  return (
    <div className="space-y-1.5">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
        {label}
      </div>
      {children}
    </div>
  );
}

export default function LeadSourcesSection() {
  const [sources, setSources] = useAutoSave('blueprint_lead_sources', INITIAL_SOURCES);
  const [expanded, setExpanded] = useState(null);

  const update = (i, field, val) => {
    const next = [...sources];
    next[i] = { ...next[i], [field]: val };
    setSources(next);
  };

  const deleteSource = (i) => {
    if (!window.confirm(`Delete "${sources[i].title}"?`)) return;
    setSources(sources.filter((_, j) => j !== i));
    if (expanded === i) setExpanded(null);
    else if (expanded !== null && expanded > i) setExpanded(expanded - 1);
  };

  const addSource = () => {
    const next = [
      ...sources,
      {
        title: 'New Lead Source',
        color: COLOR_OPTIONS[sources.length % COLOR_OPTIONS.length],
        description: '',
        tracking: '',
        decision: '',
      },
    ];
    setSources(next);
    setExpanded(next.length - 1);
  };

  const toggle = (i) => setExpanded(expanded === i ? null : i);

  return (
    <section>
      <SectionHeader
        number="03"
        title="Lead Sources"
        description="Where leads come from — the channels, tools, and strategies that feed contacts into the pipeline. Click any source to expand details."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source, i) => {
          const Icon = SOURCE_ICONS[i % SOURCE_ICONS.length] || Globe;
          const isOpen = expanded === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`bg-card rounded-xl border overflow-hidden transition-all ${
                isOpen
                  ? 'border-secondary/40 shadow-md md:col-span-2'
                  : 'border-border shadow-sm hover:shadow-md'
              }`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors"
              >
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${source.color || 'bg-muted text-muted-foreground'}`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div onClick={(e) => e.stopPropagation()}>
                    <EditableText
                      value={source.title}
                      onChange={(val) => update(i, 'title', val)}
                      className="text-sm font-semibold text-foreground"
                    />
                  </div>
                  {!isOpen && source.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {source.description}
                    </p>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden border-t border-border bg-muted/20"
                  >
                    <div className="p-5 space-y-4">
                      <DetailRow label="What it is">
                        <EditableText
                          value={source.description}
                          onChange={(val) => update(i, 'description', val)}
                          multiline
                          placeholder="What is this lead source? Where does it come from?"
                          className="text-sm text-foreground/85 leading-relaxed block"
                        />
                      </DetailRow>
                      <DetailRow label="What we track">
                        <EditableText
                          value={source.tracking}
                          onChange={(val) => update(i, 'tracking', val)}
                          multiline
                          placeholder="Metrics, signals, properties we monitor for this source."
                          className="text-sm text-foreground/85 leading-relaxed block"
                        />
                      </DetailRow>
                      <DetailRow label="Open questions">
                        <EditableText
                          value={source.decision}
                          onChange={(val) => update(i, 'decision', val)}
                          multiline
                          placeholder="What still needs to be decided about this source?"
                          className="text-sm text-foreground/85 leading-relaxed block"
                        />
                      </DetailRow>
                      <div className="flex justify-end pt-2 border-t border-border/60 mt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSource(i);
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete this source
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={addSource}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-dashed border-border text-sm font-medium text-muted-foreground hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add lead source
        </button>
      </div>
    </section>
  );
}
