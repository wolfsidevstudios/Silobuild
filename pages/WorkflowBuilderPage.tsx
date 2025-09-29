import React from 'react';
import { WorkflowDefinition } from '../types';
import { WorkflowView } from '../components/WorkflowView';
import { WorkflowIcon } from '../components/icons';

interface WorkflowBuilderPageProps {
  workflow: WorkflowDefinition;
}

export const WorkflowBuilderPage: React.FC<WorkflowBuilderPageProps> = ({ workflow }) => {
  return (
    <div className="h-full w-full flex flex-col bg-gray-100">
      <header className="flex-shrink-0 flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
        <WorkflowIcon className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-bold">Workflow Visualizer</h1>
      </header>
      <div className="flex-1 overflow-hidden p-4">
        <WorkflowView definition={workflow} />
      </div>
    </div>
  );
};
