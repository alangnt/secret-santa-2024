import React from 'react';

export function Toolbar() {
  const refreshPage = () => window.location.reload();

  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
      <div className="flex items-center gap-2">
        <span onClick={refreshPage} className="font-bold text-xl text-purple-600 cursor-pointer">NotFigmaCivil</span>
      </div>
    </div>
  );
}