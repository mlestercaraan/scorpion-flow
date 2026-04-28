import React from 'react';
import { useAutoSave } from '@/hooks/useAutoSave';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { EditableText } from './EditableText';
import {
  Globe, Linkedin, Search, FileSpreadsheet, Mail, Rocket,
  ChevronDown, Settings, HelpCircle
} from 'lucide-react';

// Icons kept separate — cannot be serialized to localStorage
const SOURCE_ICONS = [Globe, Linkedin, Search, FileSpreadsheet, Mail, Rocket];

const INITIAL_SOURCES = [
  {
    title: 'Website / Landing Pages',
    color: 'bg-blue-500/10 text-blue-600',
    description: 'Royer\'s website and targeted landing pages for MSP services to financial firms.',
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
    description: 'Paid search targeting MSP/IT-related keywords for financial services firms.',
    tracking: 'Ad spend, cost per lead, keyword performance, landing page attribution.',
    decision: 'Budget allocation? Which keywords to target first? Landing page strategy?',
  },
  {
    title: 'Scraped Prospect Lists',
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

export default function LeadSourcesSection() {
  const [sources, setSources] = useAutoSave('blueprint_lead_sources', INITIAL_SOURCES);
  const [expanded, setExpanded] = React.useState(null);

  const update = (i, field, val) => {
    const next = [...sources];
    next[i] = { ...next[i], [field]: val };
    setSources(next);
  };

  return (
    <section>
      <SectionHeader number="02" title="Lead Sources" description="Where leads come from: the channels, tools, and strategies that feed contacts into the pipeline." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-card rounded-xl border transition-all ${
              expanded === i ? 'shadow-lg border-secondary/40' : 'shadow-sm border-border hover:shadow-md'
            }`}
          >
            <div className="p-5">
              {/* Header row */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${source.color}`}>
                    {React.createElement(SOURCE_ICONS[i] || Globe, { className: 'w-4 h-4' })}
                  </span>
                  <EditableText
                    value={source.title}
                    onChange={(val) => update(i, 'title', val)}
                    className="text-sm font-semibold text-foreground"
                  />
                </div>
                <button onClick={() => setExpanded(expanded === i ? null : i)} className="ml-2 flex-shrink-0">
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-3">
                      <EditableText
                        value={source.description}
                        onChange={(val) => update(i, 'description', val)}
                        className="text-sm text-muted-foreground leading-relaxed w-full block"
                        multiline
                      />
                      <div className="flex items-start gap-2">
                        <Settings className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold text-foreground">Track in HubSpot:</span>
                          <div className="mt-0.5">
                            <EditableText
                              value={source.tracking}
                              onChange={(val) => update(i, 'tracking', val)}
                              className="text-xs text-muted-foreground w-full block"
                              multiline
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-chart-4 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold text-foreground">Session Decision:</span>
                          <div className="mt-0.5">
                            <EditableText
                              value={source.decision}
                              onChange={(val) => update(i, 'decision', val)}
                              className="text-xs text-muted-foreground w-full block"
                              multiline
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}