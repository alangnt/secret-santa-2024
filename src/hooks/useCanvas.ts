'use client'

import { useState, useCallback } from 'react';
import { CanvasElement, ElementType } from '@/types/elements';

export function useCanvas() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedTool, setSelectedTool] = useState<ElementType | 'select'>('select');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const addElement = useCallback((type: ElementType, x: number, y: number) => {
    const newElement: CanvasElement = {
      id: crypto.randomUUID(),
      type,
      x,
      y,
      width: 100,
      height: type === 'text' ? 40 : 100,
      content: type === 'text' ? 'Double click to edit' : undefined,
      style: {
        color: '#000000',
        fontSize: 16,
        backgroundColor: type === 'text' ? undefined : '#e5e7eb',
      },
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElementId(newElement.id);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(element => 
      element.id === id ? { ...element, ...updates } : element
    ));
  }, []);

  return {
    elements,
    selectedTool,
    selectedElementId,
    setSelectedTool,
    setSelectedElementId,
    addElement,
    updateElement,
  };
}