'use client'

import React, { useCallback } from 'react';
import { CanvasElement } from '@/types/elements';
import { CanvasElements } from './CanvasElements';

type ToolType = 'select' | ElementType;
type ElementType = 'rectangle' | 'circle' | 'text' | 'image';

interface CanvasProps {
  elements: CanvasElement[];
  selectedTool: ToolType;
  selectedElementId: string | null;
  onAddElement: (type: ElementType, x: number, y: number) => void;
  onSelectElement: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
  onToolUse: () => void;
}

export function Canvas({
                         elements,
                         selectedTool,
                         selectedElementId,
                         onAddElement,
                         onSelectElement,
                         onUpdateElement,
                         onToolUse,
                       }: CanvasProps) {
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (selectedTool === 'select') return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      onAddElement(selectedTool as ElementType, x, y);
      onToolUse(); // Reset tool after element creation
    },
    [selectedTool, onAddElement, onToolUse]
  );

  return (
    <div
      className="flex-1 bg-gray-50 relative overflow-hidden"
      onClick={handleCanvasClick}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(20px,1fr))] grid-rows-[repeat(40,minmax(20px,1fr))] opacity-10">
        {Array.from({ length: 1600 }).map((_, i) => (
          <div key={i} className="border border-gray-300" />
        ))}
      </div>
      <CanvasElements
        elements={elements}
        selectedId={selectedElementId}
        onSelectElement={onSelectElement}
        onUpdateElement={onUpdateElement}
      />
      {selectedTool !== 'select' && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
          <p className="text-lg">Click anywhere to add a {selectedTool}</p>
        </div>
      )}
    </div>
  );
}
