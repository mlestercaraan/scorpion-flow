import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { EditableText } from './EditableText';
import {
  ExternalLink, Layout, FolderKanban, FileText, Mail, Globe, Video, Search, Linkedin, Link
} from 'lucide-react';

const INITIAL_RESOURCES = [
  { icon: Layout, title: 'HubSpot Portal', url: 'https://app-na2.hubspot.com/contacts/245123419/', color: 'bg-orange-500/10 text-orange-600' },
  { icon: FolderKanban, title: 'Lead Pipeline (HubSpot)', url: 'https://app-na2.hubspot.com/contacts/245123419/objects/0-136/views/all/board?noprefetch=', color: 'bg-orange-500/10 text-orange-600' },
  { icon: FolderKanban, title: 'Deal Pipeline (HubSpot)', url: 'https://app-na2.hubspot.com/contacts/245123419/objects/0-3/views/all/board?noprefetch=', color: 'bg-emerald-500/10 text-emerald-600' },
  { icon: Globe, title: 'Royer Website', url: 'https://www.royernetworks.com/', color: 'bg-slate-500/10 text-slate-600' },
  { icon: Globe, title: 'Schedule Assessment', url: 'https://meetings-na2.hubspot.com/st-royer/schedule-free-assessment', color: 'bg-secondary/10 text-secondary' },
  { icon: Linkedin, title: 'LinkedIn (S. Royer)', url: 'https://www.linkedin.com/in/stroyeriv/', color: 'bg-sky-500/10 text-sky-600' },
  { icon: FileText, title: 'ICP Document', url: '#', color: 'bg-blue-500/10 text-blue-600' },
  { icon: Mail, title: 'Current Sequences', url: '#', color: 'bg-violet-500/10 text-violet-600' },
  { icon: Video, title: 'Kickoff Recording', url: '#', color: 'bg-red-500/10 text-red-600' },
  { icon: Search, title: 'Google Ads', url: '#', color: 'bg-amber-500/10 text-amber-600' },
];

export default function ResourcesSection() {
  const [resources, setResources] = useState(INITIAL_RESOURCES);

  const updateResource = (i, field, val) => {
    const next = [...resources];
    next[i] = { ...next[i], [field]: val };
    setResources(next);
  };

  return (
    <section>
      <SectionHeader number="07" title="Resources" description="Quick links to key tools, documents, and platforms referenced throughout this engagement." />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {resources.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="group bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md hover:border-secondary/30 transition-all flex flex-col items-center text-center gap-2"
          >
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${r.color}`}>
              <r.icon className="w-5 h-5" />
            </span>
            <EditableText
              value={r.title}
              onChange={(val) => updateResource(i, 'title', val)}
              className="text-xs font-semibold text-foreground text-center"
            />
            {/* URL edit row */}
            <div className="flex items-center gap-1 w-full">
              <Link className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <input
                value={r.url === '#' ? '' : r.url}
                onChange={(e) => updateResource(i, 'url', e.target.value || '#')}
                placeholder="Paste URL..."
                className="text-[10px] text-muted-foreground bg-transparent outline-none border-b border-transparent focus:border-secondary/40 w-full truncate"
              />
            </div>
            {r.url !== '#' && (
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] text-secondary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" /> Open
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}