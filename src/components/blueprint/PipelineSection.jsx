import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { EditableText } from './EditableText';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function PipelineSection({ id, number, title, stages: initialStages }) {
  const [stages, setStages] = useState(initialStages);
  const [selected, setSelected] = useState(null);
  const activeStage = stages.find(s => s.name === selected);

  const updateStage = (stageName, field, val) => {
    setStages(stages.map(s => s.name === stageName ? { ...s, [field]: val } : s));
  };

  const FIELDS = [
    { key: 'definition', label: 'Definition' },
    { key: 'entry', label: 'Entry Criteria' },
    { key: 'action', label: 'Required Action' },
    { key: 'exit', label: 'Exit Criteria' },
  ];

  return (
    <section id={id}>
      <SectionHeader number={number} title={title} />

      {/* Pipeline stages */}
      <div className="flex items-center gap-0 overflow-x-auto pb-2 mb-6">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.name}>
            <button
              onClick={() => setSelected(selected === stage.name ? null : stage.name)}
              className={`relative flex-shrink-0 rounded-xl px-5 py-3.5 transition-all text-left ${
                selected === stage.name
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card border border-border text-foreground hover:shadow-md hover:border-secondary/30'
              }`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest opacity-60 block mb-0.5">
                Stage {i + 1}
              </span>
              <span className="text-sm font-bold block">{stage.name}</span>
            </button>
            {i < stages.length - 1 && (
              <ArrowRight className="w-5 h-5 text-border flex-shrink-0 mx-1" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeStage && (
          <motion.div
            key={activeStage.name}
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-card rounded-xl border border-secondary/20 shadow-md p-6">
              <h4 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-secondary" />
                {activeStage.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FIELDS.map(({ key, label }) => (
                  <div key={key} className="bg-muted/50 rounded-lg p-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-1">{label}</span>
                    <EditableText
                      value={activeStage[key]}
                      onChange={(val) => updateStage(activeStage.name, key, val)}
                      className="text-sm text-muted-foreground leading-relaxed w-full"
                      multiline
                    />
                  </div>
                ))}
                <div className="md:col-span-2 bg-primary/5 rounded-lg p-3.5 border border-primary/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">HubSpot Build Implication</span>
                  <EditableText
                    value={activeStage.hubspot}
                    onChange={(val) => updateStage(activeStage.name, 'hubspot', val)}
                    className="text-sm text-muted-foreground leading-relaxed w-full"
                    multiline
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}