import React from 'react';
import { Mouse, Square, Circle, Type, Image } from 'lucide-react';

type ElementType = "rectangle" | "circle" | "text" | "image" | "select";

const tools = [
  { icon: Mouse, name: 'select', label: 'Select' },
  { icon: Square, name: 'rectangle', label: 'Rectangle' },
  { icon: Circle, name: 'circle', label: 'Circle' },
  { icon: Type, name: 'text', label: 'Text' },
  { icon: Image, name: 'image', label: 'Image' }
] as const;

interface SidebarProps {
  selectedTool: ElementType | "select";
  onSelectTool: (tool: ElementType | "select") => void;
}

export function Sidebar({ selectedTool, onSelectTool }: SidebarProps) {
  return (
    <div className="sm:w-16 bg-white border-r border-gray-200 flex sm:flex-col items-center max-sm:justify-center py-4 gap-4">
      {tools.map((Tool) => (
        <button
          key={Tool.name}
          className={`p-2 rounded-lg transition-colors ${
            selectedTool === Tool.name
              ? 'bg-purple-100 text-purple-600'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          title={Tool.label}
          onClick={() => onSelectTool(Tool.name)}
        >
          <Tool.icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}