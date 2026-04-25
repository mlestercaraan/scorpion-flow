import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { Calendar, MailCheck, UserX, UserCheck, BookOpen, AlertTriangle, Zap } from 'lucide-react';

const AUTOMATIONS = [
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
  return (
    <section>
      <SectionHeader number="05" title="Automation Priorities" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AUTOMATIONS.map((item, i) => {
          const style = PRIORITY_STYLES[item.priority];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow ${style.bg}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="w-9 h-9 rounded-lg bg-card flex items-center justify-center shadow-sm">
                  <item.icon className="w-4.5 h-4.5 text-foreground" />
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}>
                  {style.label}
                </span>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}