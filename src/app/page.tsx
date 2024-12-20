'use client'

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Canvas } from '@/components/Canvas';
import { Toolbar } from '@/components/Toolbar';
import { TipModal } from '@/components/TipModal';
import { useCanvas } from '@/hooks/useCanvas';

function App() {
  const [showTip, setShowTip] = useState(true);
  const {
    elements,
    selectedTool,
    selectedElementId,
    setSelectedTool,
    setSelectedElementId,
    addElement,
    updateElement
  } = useCanvas();

  const handleToolUse = () => {
    setSelectedTool('select');
  };

  return (
    <div className="h-screen flex max-sm:flex-col-reverse bg-gray-50">
      <Sidebar selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      <div className="flex-1 flex flex-col">
        <Toolbar />
        <Canvas
          elements={elements}
          selectedTool={selectedTool}
          selectedElementId={selectedElementId}
          onAddElement={addElement}
          onSelectElement={setSelectedElementId}
          onUpdateElement={updateElement}
          onToolUse={handleToolUse}
        />
      </div>
      <TipModal isOpen={showTip} onClose={() => setShowTip(false)} />
    </div>
  );
}

export default App;