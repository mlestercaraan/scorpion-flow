import React, { useState } from 'react';
import { useAutoSave } from '@/hooks/useAutoSave';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './ICPSection';
import { EditableText } from './EditableText';
import { ChevronRight, ArrowRight, Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const EMPTY_STAGE = {
  name: 'New Stage',
  definition: '',
  entry: '',
  action: '',
  exit: '',
  hubspot: '',
};

const FIELDS = [
  { key: 'definition', label: 'Definition' },
  { key: 'entry', label: 'Entry Criteria' },
  { key: 'action', label: 'Required Action' },
  { key: 'exit', label: 'Exit Criteria' },
];

export default function PipelineSection({ id, number, title, stages: initialStages, description, hubspotUrl }) {
  const [stages, setStages] = useAutoSave(`blueprint_pipeline_${id}`, initialStages);
  const [selected, setSelected] = useState(null);
  const activeStage = stages.find(s => s.name === selected);

  const updateStage = (stageName, field, val) => {
    setStages(stages.map(s => s.name === stageName ? { ...s, [field]: val } : s));
    // keep selected in sync if name changes
    if (field === 'name') setSelected(val);
  };

  const addStage = () => {
    const newStage = { ...EMPTY_STAGE, name: `Stage ${stages.length + 1}` };
    setStages([...stages, newStage]);
    setSelected(newStage.name);
  };

  const deleteStage = (stageName) => {
    setStages(stages.filter(s => s.name !== stageName));
    if (selected === stageName) setSelected(null);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(stages);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setStages(reordered);
  };

  return (
    <section id={id}>
      <div className="flex items-start justify-between gap-4 mb-0">
        <div className="flex-1">
          <SectionHeader number={number} title={title} description={description} />
        </div>
        {hubspotUrl && (
          <a
            href={hubspotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-orange-600 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1.5 rounded-full transition-colors mt-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in HubSpot
          </a>
        )}
      </div>

      {/* Pipeline stages — drag to reorder */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stages" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex items-center gap-0 overflow-x-auto pb-2 mb-6 min-h-[64px]"
            >
              {stages.map((stage, i) => (
                <Draggable key={stage.name} draggableId={stage.name} index={i}>
                  {(drag, snapshot) => (
                    <React.Fragment>
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        className={`relative flex-shrink-0 rounded-xl transition-all text-left group ${
                          snapshot.isDragging ? 'shadow-xl scale-105 z-50' : ''
                        }`}
                      >
                        {/* Drag handle */}
                        <div
                          {...drag.dragHandleProps}
                          className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-40 hover:!opacity-80 cursor-grab active:cursor-grabbing transition-opacity"
                        >
                          <GripVertical className="w-3 h-3 text-current" />
                        </div>
                        {/* Delete button */}
                        {stages.length > 1 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteStage(stage.name); }}
                            className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-40 hover:!opacity-100 text-destructive transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelected(selected === stage.name ? null : stage.name)}
                          className={`rounded-xl px-5 py-3.5 w-full text-left ${
                            selected === stage.name
                              ? 'bg-primary text-primary-foreground shadow-lg'
                              : 'bg-card border border-border text-foreground hover:shadow-md hover:border-secondary/30'
                          }`}
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-widest opacity-60 block mb-0.5">
                            Stage {i + 1}
                          </span>
                          <span className="text-sm font-bold block pr-4">{stage.name}</span>
                        </button>
                      </div>
                      {i < stages.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-border flex-shrink-0 mx-1" />
                      )}
                    </React.Fragment>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {/* Add stage */}
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                {stages.length > 0 && <ArrowRight className="w-5 h-5 text-border" />}
                <button
                  onClick={addStage}
                  className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl border border-dashed border-border text-muted-foreground hover:border-secondary hover:text-secondary transition-colors text-xs font-medium"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Stage
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
                <EditableText
                  value={activeStage.name}
                  onChange={(val) => updateStage(activeStage.name, 'name', val)}
                  className="text-base font-bold text-foreground"
                />
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