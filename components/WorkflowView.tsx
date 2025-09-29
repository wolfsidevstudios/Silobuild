import React from 'react';
import { WorkflowDefinition, WorkflowNode } from '../types';

const nodeColors: { [key: string]: string } = {
  Webhook: 'bg-green-500',
  SendEmail: 'bg-blue-500',
  Condition: 'bg-yellow-500',
  HTTPRequest: 'bg-purple-500',
  default: 'bg-gray-500',
};

const Node: React.FC<{ node: WorkflowNode }> = ({ node }) => {
  const color = nodeColors[node.type] || nodeColors.default;
  return (
    <div
      className="absolute bg-white border-2 border-gray-300 rounded-lg shadow-md w-48"
      style={{ left: node.position.x, top: node.position.y }}
    >
      <div className={`p-2 rounded-t-md text-white font-bold text-sm ${color}`}>
        {node.type}
      </div>
      <div className="p-3 text-sm text-gray-800">
        {node.data.label}
      </div>
    </div>
  );
};

const getEdgePath = (sourceNode: WorkflowNode, targetNode: WorkflowNode) => {
    const sourceX = sourceNode.position.x + 192; // node width + padding
    const sourceY = sourceNode.position.y + 40; // half of node height
    const targetX = targetNode.position.x;
    const targetY = targetNode.position.y + 40; // half of node height
  
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const curve = Math.abs(dx) * 0.5;
  
    return `M ${sourceX},${sourceY} C ${sourceX + curve},${sourceY} ${targetX - curve},${targetY} ${targetX},${targetY}`;
};

export const WorkflowView: React.FC<{ definition: WorkflowDefinition }> = ({ definition }) => {
  const { nodes, connections } = definition;
  
  // FIX: Explicitly type `nodeMap` to fix a type inference issue where arguments to `getEdgePath` were being inferred as `unknown`.
  const nodeMap: Map<string, WorkflowNode> = new Map(nodes.map(node => [node.id, node]));

  return (
    <div className="w-full h-full bg-gray-200 rounded-lg relative overflow-auto border border-gray-300">
      <svg className="absolute w-full h-full" style={{ minWidth: '1000px', minHeight: '1000px' }}>
        <defs>
          <pattern id="pattern-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#cbd5e1"></circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-grid)"></rect>
        
        {connections.map((conn) => {
          const sourceNode = nodeMap.get(conn.source);
          const targetNode = nodeMap.get(conn.target);
          if (!sourceNode || !targetNode) return null;
          
          const path = getEdgePath(sourceNode, targetNode);

          return (
            <g key={conn.id}>
                <path
                    d={path}
                    stroke="#9ca3af"
                    strokeWidth="2"
                    fill="none"
                />
            </g>
          );
        })}
      </svg>
      <div className="relative w-full h-full" style={{ minWidth: '1000px', minHeight: '1000px' }}>
        {nodes.map((node) => (
          <Node key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};
