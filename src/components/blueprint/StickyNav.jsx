import React, { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { id: 'session-flow', label: 'Session Flow' },
  { id: 'icp', label: 'ICP' },
  { id: 'lead-sources', label: 'Lead Sources' },
  { id: 'lead-pipeline', label: 'Lead Pipeline' },
  { id: 'deal-pipeline', label: 'Deal Pipeline' },
  { id: 'automations', label: 'Automations' },
  { id: 'build-priorities', label: 'Build Priorities' },
  { id: 'resources', label: 'Resources' },
  { id: 'decisions', label: 'Decisions' },
];

export default function StickyNav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border no-print">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                active === id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {label}
            </a>
          ))}
          <div className="ml-auto pl-4">
            <Button
              size="sm"
              variant="outline"
              className="text-xs gap-1.5"
              onClick={() => window.print()}
            >
              <Printer className="w-3.5 h-3.5" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}