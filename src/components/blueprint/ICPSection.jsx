import React from 'react';
import { useAutoSave } from '@/hooks/useAutoSave';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, ShieldCheck, Plus } from 'lucide-react';
import { EditableText, EditableTag } from './EditableText';
import { ICP_VISUALS } from './IcpVisuals';

// Icons are kept separate — they can't be serialized to localStorage
const CARD_ICONS = [Building2, Users, MapPin, ShieldCheck];

const INITIAL_ICP = [
  {
    title: 'Primary Verticals',
    items: ['Financial Advisors & RIAs', 'CPA Firms & Accounting Practices', 'Wealth Managers & Fiduciaries', 'Fiduciary Offices'],
  },
  {
    title: 'Company Size',
    items: ['5–50 employees', 'Small, owner-led firms', 'No dedicated in-house IT'],
  },
  {
    title: 'Geography',
    items: ['Frederick, MD (HQ)', 'DMV Region', 'Maryland', 'Northern Virginia', 'Washington D.C.'],
  },
  {
    title: 'Qualification Signals',
    items: [
      'Under SEC / FINRA oversight',
      'FTC Safeguards Rule / GLBA obligation',
      'IRS data protection requirements',
      'Handles sensitive client financial data',
      'Owner or managing partner accessible',
      'No compliance-driven IT in place',
    ],
  },
];

export default function ICPSection() {
  const [data, setData] = useAutoSave('blueprint_icp', INITIAL_ICP);

  const updateTitle = (i, val) => {
    const next = [...data];
    next[i] = { ...next[i], title: val };
    setData(next);
  };

  const updateTag = (cardIdx, tagIdx, val) => {
    const next = [...data];
    const items = [...next[cardIdx].items];
    items[tagIdx] = val;
    next[cardIdx] = { ...next[cardIdx], items };
    setData(next);
  };

  const deleteTag = (cardIdx, tagIdx) => {
    const next = [...data];
    const items = next[cardIdx].items.filter((_, i) => i !== tagIdx);
    next[cardIdx] = { ...next[cardIdx], items };
    setData(next);
  };

  const addTag = (cardIdx) => {
    const next = [...data];
    next[cardIdx] = { ...next[cardIdx], items: [...next[cardIdx].items, 'New item'] };
    setData(next);
  };

  return (
    <section>
      <SectionHeader number="02" title="Ideal Customer Profile" description="Who this client is targeting: the verticals, company sizes, geographies, and qualification signals that define a great-fit prospect." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {data.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* SVG visual banner */}
            <div className="relative h-32 overflow-hidden">
              {React.createElement(ICP_VISUALS[i % ICP_VISUALS.length])}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {React.createElement(CARD_ICONS[i], { className: 'w-3.5 h-3.5 text-white' })}
                </span>
                <EditableText
                  value={card.title}
                  onChange={(val) => updateTitle(i, val)}
                  className="text-sm font-bold text-white drop-shadow"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="p-4">
              <div className="flex flex-wrap gap-1.5">
                {card.items.map((item, j) => (
                  <EditableTag
                    key={j}
                    value={item}
                    onChange={(val) => updateTag(i, j, val)}
                    onDelete={() => deleteTag(i, j)}
                  />
                ))}
                <button
                  onClick={() => addTag(i)}
                  className="text-xs px-2.5 py-1 rounded-full border border-dashed border-border text-muted-foreground hover:border-secondary hover:text-secondary transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({ number, title, onTitleChange, description }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold text-secondary bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 px-2.5 py-1 rounded-full flex-shrink-0 shadow-sm">
          {number}
        </span>
        {onTitleChange ? (
          <EditableText
            value={title}
            onChange={onTitleChange}
            className="text-xl lg:text-2xl font-bold text-foreground"
          />
        ) : (
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">{title}</h2>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed ml-1">{description}</p>
      )}
    </div>
  );
}