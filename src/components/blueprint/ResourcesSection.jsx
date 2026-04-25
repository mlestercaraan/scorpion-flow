import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import {
  ExternalLink, Layout, FolderKanban, FileText, Mail, Globe, Video, Search, Linkedin
} from 'lucide-react';

const RESOURCES = [
  { icon: Layout, title: 'HubSpot Portal', url: '#', color: 'bg-orange-500/10 text-orange-600' },
  { icon: FolderKanban, title: 'Teamwork Project', url: '#', color: 'bg-purple-500/10 text-purple-600' },
  { icon: FileText, title: 'ICP Document', url: '#', color: 'bg-blue-500/10 text-blue-600' },
  { icon: Mail, title: 'Current Sequences', url: '#', color: 'bg-emerald-500/10 text-emerald-600' },
  { icon: Globe, title: 'Royer Website', url: '#', color: 'bg-slate-500/10 text-slate-600' },
  { icon: Video, title: 'Kickoff Recording', url: '#', color: 'bg-red-500/10 text-red-600' },
  { icon: Search, title: 'Google Ads', url: '#', color: 'bg-amber-500/10 text-amber-600' },
  { icon: Linkedin, title: 'LinkedIn', url: '#', color: 'bg-sky-500/10 text-sky-600' },
];

export default function ResourcesSection() {
  return (
    <section>
      <SectionHeader number="07" title="Resources" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {RESOURCES.map((r, i) => (
          <motion.a
            key={r.title}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="group bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md hover:border-secondary/30 transition-all flex flex-col items-center text-center gap-2.5"
          >
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.color}`}>
              <r.icon className="w-5 h-5" />
            </span>
            <span className="text-xs font-semibold text-foreground">{r.title}</span>
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}