import React, { useMemo, useState } from 'react';
import { components, StudioComponent } from '../data/components';
import { TemplateIcon } from './icons';

interface ComponentItemProps {
  component: StudioComponent;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ component }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', component.code);
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="bg-white/5 border border-white/10 rounded-md p-3 cursor-grab hover:bg-blue-500/10 hover:border-blue-500/50 transition-all duration-200"
    >
      <p className="text-sm font-semibold text-white truncate">{component.title}</p>
    </div>
  );
};

export const ComponentLibrary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredComponents = useMemo(() => {
        if (!searchTerm.trim()) {
            return components;
        }
        return components.filter(c => 
            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const groupedComponents = useMemo(() => {
        return filteredComponents.reduce((acc, component) => {
        (acc[component.category] = acc[component.category] || []).push(component);
        return acc;
        }, {} as Record<string, StudioComponent[]>);
    }, [filteredComponents]);

    const categoryOrder: StudioComponent['category'][] = [
        'Layout',
        'Forms',
        'Elements',
        'Navigation',
        'Data Display',
        'Feedback',
    ];

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <div className="flex-shrink-0 p-3 border-b border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <TemplateIcon className="w-6 h-6 text-blue-400" />
          <h2 className="text-lg font-bold">Component Library</h2>
        </div>
        <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-md p-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {categoryOrder.map(category => 
            groupedComponents[category] && (
                <div key={category}>
                    <h3 className="text-sm font-bold text-gray-400 mb-2 px-1">{category}</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {groupedComponents[category].map(component => (
                            <ComponentItem key={component.title} component={component} />
                        ))}
                    </div>
                </div>
            )
        )}
        {filteredComponents.length === 0 && (
            <div className="text-center py-10">
                <p className="text-gray-500">No components found.</p>
            </div>
        )}
      </div>
    </div>
  );
};