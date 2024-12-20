import React from 'react';
import { CanvasElement as CanvasElementType } from '../types/elements';
import { CanvasElement } from './CanvasElement';

interface CanvasElementsProps {
  elements: CanvasElementType[];
  selectedId: string | null;
  onSelectElement: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<CanvasElementType>) => void;
}

export function CanvasElements({ 
  elements, 
  selectedId, 
  onSelectElement, 
  onUpdateElement 
}: CanvasElementsProps) {
  return (
    <div className="absolute inset-0">
      {elements.map((element) => (
        <CanvasElement
          key={element.id}
          element={element}
          isSelected={element.id === selectedId}
          onUpdate={onUpdateElement}
          onClick={onSelectElement}
        />
      ))}
    </div>
  );
}