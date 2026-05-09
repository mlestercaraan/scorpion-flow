import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import {
  Globe, Linkedin, Search, FileSpreadsheet, Mail, Rocket,
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
  const sources = INITIAL_SOURCES;


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
            className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-5 flex items-center gap-3">
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${source.color}`}>
                {React.createElement(SOURCE_ICONS[i] || Globe, { className: 'w-4 h-4' })}
              </span>
              <span className="text-sm font-semibold text-foreground">{source.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}