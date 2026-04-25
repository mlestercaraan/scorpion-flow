import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, ShieldCheck } from 'lucide-react';

const ICP_DATA = [
  {
    icon: Building2,
    title: 'Primary Verticals',
    items: ['Small financial firms', 'Wealth management', 'CPAs', 'Bookkeepers'],
  },
  {
    icon: Users,
    title: 'Company Size',
    items: ['10–50 users'],
  },
  {
    icon: MapPin,
    title: 'Geography',
    items: ['Maryland', 'Southern PA', 'Northern Virginia', 'West Virginia'],
  },
  {
    icon: ShieldCheck,
    title: 'Qualification Signals',
    items: [
      'Compliance sensitivity',
      'IT / cybersecurity need',
      'Owner or leader accessible',
      'Current process is manual',
    ],
  },
];

export default function ICPSection() {
  return (
    <section id="icp">
      <SectionHeader number="01" title="Ideal Customer Profile" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ICP_DATA.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <card.icon className="w-4 h-4 text-secondary" />
              </span>
              <h4 className="text-sm font-semibold text-foreground">{card.title}</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {card.items.map((item) => (
                <span
                  key={item}
                  className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
        {number}
      </span>
      <h2 className="text-xl lg:text-2xl font-bold text-foreground">{title}</h2>
    </div>
  );
}