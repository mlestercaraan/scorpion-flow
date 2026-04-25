import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, ShieldCheck, Plus } from 'lucide-react';
import { EditableText, EditableTag } from './EditableText';

const IMAGES = [
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', // financial/accounting
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80', // team/company
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80', // cityscape/geography
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80', // cybersecurity/shield
];

const INITIAL_ICP = [
  {
    icon: Building2,
    title: 'Primary Verticals',
    image: IMAGES[0],
    items: ['Small financial firms', 'Wealth management', 'CPAs', 'Bookkeepers'],
  },
  {
    icon: Users,
    title: 'Company Size',
    image: IMAGES[1],
    items: ['10–50 users'],
  },
  {
    icon: MapPin,
    title: 'Geography',
    image: IMAGES[2],
    items: ['Maryland', 'Southern PA', 'Northern Virginia', 'West Virginia'],
  },
  {
    icon: ShieldCheck,
    title: 'Qualification Signals',
    image: IMAGES[3],
    items: [
      'Compliance sensitivity',
      'IT / cybersecurity need',
      'Owner or leader accessible',
      'Current process is manual',
    ],
  },
];

export default function ICPSection() {
  const [data, setData] = useState(INITIAL_ICP);

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
      <SectionHeader number="01" title="Ideal Customer Profile" description="Who Royer is targeting: the verticals, company sizes, geographies, and qualification signals that define a great-fit prospect." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {data.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Image banner */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <card.icon className="w-3.5 h-3.5 text-white" />
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
        <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full flex-shrink-0">
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