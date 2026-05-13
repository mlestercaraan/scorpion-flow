import React from 'react';
import { useAutoSave } from '@/hooks/useAutoSave';
import { motion } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { EditableText } from './EditableText';
import {
  ExternalLink, Layout, FolderKanban, FileText, Mail, Globe, Video, Search,
  Linkedin, Link as LinkIcon, Plus, Trash2,
} from 'lucide-react';

// Icons kept separate — cannot be serialized to localStorage
const RESOURCE_ICONS = [Layout, FolderKanban, FolderKanban, Globe, Globe, Linkedin, FileText, Mail, Video, Search];

const COLOR_OPTIONS = [
  'bg-orange-500/10 text-orange-600',
  'bg-emerald-500/10 text-emerald-600',
  'bg-slate-500/10 text-slate-600',
  'bg-sky-500/10 text-sky-600',
  'bg-blue-500/10 text-blue-600',
  'bg-violet-500/10 text-violet-600',
  'bg-red-500/10 text-red-600',
  'bg-amber-500/10 text-amber-600',
];

const INITIAL_RESOURCES = [
  { title: 'HubSpot Portal', url: '#', color: 'bg-orange-500/10 text-orange-600' },
  { title: 'Lead Pipeline (HubSpot)', url: '#', color: 'bg-orange-500/10 text-orange-600' },
  { title: 'Deal Pipeline (HubSpot)', url: '#', color: 'bg-emerald-500/10 text-emerald-600' },
  { title: 'Client Website', url: '#', color: 'bg-slate-500/10 text-slate-600' },
  { title: 'Schedule Assessment', url: '#', color: 'bg-secondary/10 text-secondary' },
  { title: 'Champion on LinkedIn', url: '#', color: 'bg-sky-500/10 text-sky-600' },
  { title: 'ICP Document', url: '#', color: 'bg-blue-500/10 text-blue-600' },
  { title: 'Current Sequences', url: '#', color: 'bg-violet-500/10 text-violet-600' },
  { title: 'Kickoff Recording', url: '#', color: 'bg-red-500/10 text-red-600' },
  { title: 'Google Ads', url: '#', color: 'bg-amber-500/10 text-amber-600' },
];

const isLive = (url) => url && url !== '#' && url.trim() !== '';

export default function ResourcesSection() {
  const [resources, setResources] = useAutoSave('blueprint_resources', INITIAL_RESOURCES);

  const update = (i, field, val) => {
    const next = [...resources];
    next[i] = { ...next[i], [field]: val };
    setResources(next);
  };

  const deleteResource = (i) => {
    if (!window.confirm(`Delete "${resources[i].title}"?`)) return;
    setResources(resources.filter((_, j) => j !== i));
  };

  const addResource = () => {
    setResources([
      ...resources,
      {
        title: 'New Resource',
        url: '#',
        color: COLOR_OPTIONS[resources.length % COLOR_OPTIONS.length],
      },
    ]);
  };

  return (
    <section>
      <SectionHeader
        number="08"
        title="Resources"
        description="Quick links to key tools, documents, and platforms referenced throughout this engagement."
      />

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {resources.map((r, i) => {
            const Icon = RESOURCE_ICONS[i % RESOURCE_ICONS.length] || Layout;
            const live = isLive(r.url);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors"
              >
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${r.color || 'bg-muted text-muted-foreground'}`}
                >
                  <Icon className="w-4 h-4" />
                </span>

                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-4 gap-y-1 items-center">
                  <div className="min-w-0">
                    <EditableText
                      value={r.title}
                      onChange={(val) => update(i, 'title', val)}
                      placeholder="Resource name…"
                      className="text-sm font-semibold text-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <LinkIcon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <input
                      value={r.url === '#' ? '' : r.url}
                      onChange={(e) => update(i, 'url', e.target.value || '#')}
                      placeholder="Paste URL…"
                      className="text-xs text-muted-foreground bg-transparent outline-none border-b border-transparent focus:border-secondary/40 w-full truncate hover:border-border transition-colors"
                    />
                  </div>
                </div>

                {live && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1 text-xs text-secondary hover:underline flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" /> Open
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => deleteResource(i)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Delete resource"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="px-4 py-3 border-t border-border">
          <button
            type="button"
            onClick={addResource}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-secondary transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add resource
          </button>
        </div>
      </div>
    </section>
  );
}
