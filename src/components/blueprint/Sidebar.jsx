import React from 'react';
import { Target, Zap, HelpCircle, AlertTriangle, ListChecks } from 'lucide-react';

const LEGEND = [
  { icon: Zap, label: 'Quick Win', color: 'text-secondary bg-secondary/10' },
  { icon: Target, label: 'Priority', color: 'text-accent bg-accent/10' },
  { icon: HelpCircle, label: 'Decision Needed', color: 'text-chart-4 bg-purple-50' },
  { icon: AlertTriangle, label: 'Risk / Caution', color: 'text-destructive bg-destructive/10' },
];

const AGENDA = [
  'Review ICP & personas',
  'Map lead sources → pipeline',
  'Define lead & deal stages',
  'Prioritize automations',
  'Assign build phases',
  'Capture decisions & next steps',
];

export default function Sidebar() {
  return (
    <aside id="session-flow" className="space-y-6">
      <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-secondary" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Session Goal</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Walk out with a clear, agreed-upon HubSpot implementation plan — pipeline stages locked, automations prioritized, and build phases defined.
        </p>
      </div>

      <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="w-4 h-4 text-secondary" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Agenda</h3>
        </div>
        <ol className="space-y-2">
          {AGENDA.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">Legend</h3>
        <div className="space-y-2">
          {LEGEND.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}