import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { EditableText } from './EditableText';
import { Calendar, MailCheck, UserX, UserCheck, BookOpen, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const INITIAL = [
  {
    icon: Calendar,
    title: 'QBR Scheduling Drip',
    priority: 'quick-win',
    description: 'Automated email sequence to schedule Quarterly Business Reviews with existing clients. Reduces manual follow-up.',
  },
  {
    icon: MailCheck,
    title: 'Outbound Follow-Up Sequence',
    priority: 'priority',
    description: 'Multi-touch email + task sequence after initial outreach. Ensures no prospects fall through the cracks.',
  },
  {
    icon: UserX,
    title: 'Inactive Lead Logic',
    priority: 'priority',
    description: 'Automatically move unresponsive leads to Inactive status after defined period. Trigger re-engagement campaign.',
  },
  {
    icon: UserCheck,
    title: 'Owner / Task Assignment',
    priority: 'quick-win',
    description: 'Auto-assign leads and create tasks based on territory, source, or deal stage. Keeps pipeline organized.',
  },
  {
    icon: BookOpen,
    title: 'Meeting Prep / Playbooks',
    priority: 'priority',
    description: 'Pre-call checklist and playbook delivered automatically before scheduled meetings. Ensures consistency.',
  },
  {
    icon: AlertTriangle,
    title: 'Do Not Over-Automate',
    priority: 'risk',
    description: 'Start simple. Build automations one at a time, test, then expand. Avoid creating complex workflows that are hard to debug.',
  },
];

const PRIORITY_STYLES = {
  'quick-win': { bg: 'bg-secondary/10 border-secondary/20', badge: 'bg-secondary text-white', label: 'Quick Win' },
  'priority': { bg: 'bg-accent/10 border-accent/20', badge: 'bg-accent text-white', label: 'Priority' },
  'risk': { bg: 'bg-destructive/10 border-destructive/20', badge: 'bg-destructive text-white', label: 'Caution' },
};

export default function AutomationsSection() {
  const [items, setItems] = useState(INITIAL);

  const update = (i, field, val) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: val };
    setItems(next);
  };

  return (
    <section>
      <SectionHeader number="05" title="Automation Priorities" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => {
          const style = PRIORITY_STYLES[item.priority];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow ${style.bg}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="w-9 h-9 rounded-lg bg-card flex items-center justify-center shadow-sm flex-shrink-0">
                  <item.icon className="w-4 h-4 text-foreground" />
                </span>
                <Select value={item.priority} onValueChange={(val) => update(i, 'priority', val)}>
                  <SelectTrigger className={`h-6 text-[10px] font-bold uppercase tracking-wider px-2 rounded-full border-0 w-auto ${style.badge}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick-win">Quick Win</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="risk">Caution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-1.5">
                <EditableText
                  value={item.title}
                  onChange={(val) => update(i, 'title', val)}
                  className="text-sm font-bold text-foreground"
                />
              </div>
              <EditableText
                value={item.description}
                onChange={(val) => update(i, 'description', val)}
                className="text-xs text-muted-foreground leading-relaxed w-full block"
                multiline
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}