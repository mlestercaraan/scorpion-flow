import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import {
  Globe, Linkedin, Search, FileSpreadsheet, Mail, Rocket,
  ChevronDown, Settings, HelpCircle
} from 'lucide-react';

const SOURCES = [
  {
    icon: Globe,
    title: 'Website / Landing Pages',
    color: 'bg-blue-500/10 text-blue-600',
    description: 'Royer\'s website and targeted landing pages for MSP services to financial firms.',
    tracking: 'Form submissions, page views, UTM parameters, landing page conversion rates.',
    decision: 'Which landing pages to build first? What forms are needed? What content offers drive conversion?',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    color: 'bg-sky-500/10 text-sky-600',
    description: 'Organic outreach and content marketing via LinkedIn targeting decision-makers.',
    tracking: 'LinkedIn-sourced contacts, connection-to-meeting conversion, content engagement.',
    decision: 'Who owns LinkedIn outreach? Manual vs. automated? Integration with HubSpot sequences?',
  },
  {
    icon: Search,
    title: 'Google Ads',
    color: 'bg-emerald-500/10 text-emerald-600',
    description: 'Paid search targeting MSP/IT-related keywords for financial services firms.',
    tracking: 'Ad spend, cost per lead, keyword performance, landing page attribution.',
    decision: 'Budget allocation? Which keywords to target first? Landing page strategy?',
  },
  {
    icon: FileSpreadsheet,
    title: 'Scraped Prospect Lists',
    color: 'bg-amber-500/10 text-amber-600',
    description: 'Curated lists from directories, associations, and industry databases.',
    tracking: 'List source, import date, initial outreach status, response rates.',
    decision: 'How to segment imported lists? Compliance considerations? Enrichment workflow?',
  },
  {
    icon: Mail,
    title: 'Email Sequences',
    color: 'bg-violet-500/10 text-violet-600',
    description: 'Outbound email sequences for cold and warm prospects.',
    tracking: 'Open rates, reply rates, meeting booked rate, sequence performance.',
    decision: 'How many sequences? What cadence? Sales vs. marketing ownership?',
  },
  {
    icon: Rocket,
    title: 'Future Prospecting Tools',
    color: 'bg-rose-500/10 text-rose-600',
    description: 'Tools like Apollo.io or HubSpot Prospecting Agent for scaled outbound.',
    tracking: 'Tool-sourced contacts, enrichment accuracy, pipeline contribution.',
    decision: 'Apollo vs. HubSpot native tools? Budget? When to introduce?',
  },
];

export default function LeadSourcesSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="lead-sources">
      <SectionHeader number="02" title="Lead Sources" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SOURCES.map((source, i) => (
          <motion.div
            key={source.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`w-full text-left bg-card rounded-xl border transition-all ${
                expanded === i ? 'shadow-lg border-secondary/40' : 'shadow-sm border-border hover:shadow-md'
              }`}
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${source.color}`}>
                      <source.icon className="w-4.5 h-4.5" />
                    </span>
                    <h4 className="text-sm font-semibold text-foreground">{source.title}</h4>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
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
                        <p className="text-sm text-muted-foreground leading-relaxed">{source.description}</p>
                        <div className="flex items-start gap-2">
                          <Settings className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-foreground">Track in HubSpot:</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{source.tracking}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-3.5 h-3.5 text-chart-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-foreground">Session Decision:</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{source.decision}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}