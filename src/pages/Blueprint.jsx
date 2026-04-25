import React from 'react';
import BlueprintHeader from '@/components/blueprint/BlueprintHeader';
import StickyNav from '@/components/blueprint/StickyNav';
import Sidebar from '@/components/blueprint/Sidebar';
import ICPSection from '@/components/blueprint/ICPSection';
import LeadSourcesSection from '@/components/blueprint/LeadSourcesSection';
import PipelineSection from '@/components/blueprint/PipelineSection';
import AutomationsSection from '@/components/blueprint/AutomationsSection';
import BuildPrioritiesSection from '@/components/blueprint/BuildPrioritiesSection';
import ResourcesSection from '@/components/blueprint/ResourcesSection';
import DecisionsSection from '@/components/blueprint/DecisionsSection';
import { LEAD_STAGES, DEAL_STAGES } from '@/components/blueprint/pipelineData';

export default function Blueprint() {
  return (
    <div className="min-h-screen bg-background">
      <BlueprintHeader />
      <StickyNav />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-16">
              <Sidebar />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-14">
            <ICPSection />
            <LeadSourcesSection />
            <PipelineSection
              id="lead-pipeline"
              number="03"
              title="Lead Pipeline"
              stages={LEAD_STAGES}
            />
            <PipelineSection
              id="deal-pipeline"
              number="04"
              title="Deal Pipeline"
              stages={DEAL_STAGES}
            />
            <AutomationsSection />
            <BuildPrioritiesSection />
            <ResourcesSection />
            <DecisionsSection />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12 no-print">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Royer × Serendipity · HubSpot Customer Journey Blueprint · Confidential
          </p>
        </div>
      </footer>
    </div>
  );
}