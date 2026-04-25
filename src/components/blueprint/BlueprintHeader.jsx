import React from 'react';
import { motion } from 'framer-motion';

export default function BlueprintHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-primary text-primary-foreground py-12 px-6 lg:px-12"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-secondary opacity-90">
            Live Working Session
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
        </div>
        <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-2">
          Royer <span className="text-secondary">×</span> Serendipity
        </h1>
        <h2 className="text-lg lg:text-2xl font-light opacity-90 mb-4">
          HubSpot Customer Journey Blueprint
        </h2>
        <p className="max-w-2xl text-sm lg:text-base opacity-75 leading-relaxed">
          Interactive working session for mapping Royer's lead flow, sales process, automation priorities, and HubSpot implementation plan.
        </p>
      </div>
    </motion.header>
  );
}