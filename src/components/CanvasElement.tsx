'use client';

import React, { useEffect, useState } from 'react';
import { CanvasElement as CanvasElementType } from '../types/elements';
import { useDrag } from '@/hooks/useDrag';
import { useResize } from '@/hooks/useResize';

interface CanvasElementProps {
  element: CanvasElementType;
  isSelected: boolean;
  onUpdate: (id: string, updates: Partial<CanvasElementType>) => void;
  onClick: (id: string) => void;
}

export function CanvasElement({
                                element,
                                isSelected,
                                onUpdate,
                                onClick,
                              }: CanvasElementProps) {
  const {
    position,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useDrag(
    { x: element.x, y: element.y },
    (newPosition) => onUpdate(element.id, { x: newPosition.x, y: newPosition.y })
  );

  const {
    size,
    isResizing,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd,
    handleResizeTouchStart,
    handleResizeTouchMove,
    handleResizeTouchEnd,
  } = useResize(
    { width: element.width, height: element.height },
    (newSize) => onUpdate(element.id, { width: newSize.width, height: newSize.height })
  );

  const sources = [
    '/civil1.jpg',
    '/civil2.webp',
    '/civil3.jpeg',
    '/civil4.jpg',
    '/civil5.jpg',
    '/civil6.webp',
    '/civil7.jpg',
    '/civil8.webp',
    '/civil9.jpg',
    '/civil10.jpeg',
    '/civil11.jpg',
    '/civil12.webp',
  ];

  const [randomSource] = useState(() =>
    sources[Math.floor(Math.random() * sources.length)]
  );

  // State for managing text editing
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(element.content || '');

  useEffect(() => {
    if (isDragging || isResizing) {
      const moveHandler = isDragging ? handleMouseMove : handleResizeMove;
      const endHandler = isDragging ? handleMouseUp : handleResizeEnd;
      const touchMoveHandler = isDragging ? handleTouchMove : handleResizeTouchMove;
      const touchEndHandler = isDragging ? handleTouchEnd : handleResizeTouchEnd;

      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', endHandler);
      window.addEventListener('touchmove', touchMoveHandler, { passive: false });
      window.addEventListener('touchend', touchEndHandler);

      return () => {
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', endHandler);
        window.removeEventListener('touchmove', touchMoveHandler);
        window.removeEventListener('touchend', touchEndHandler);
      };
    }
  }, [
    isDragging,
    isResizing,
    handleMouseMove,
    handleMouseUp,
    handleResizeMove,
    handleResizeEnd,
    handleTouchMove,
    handleTouchEnd,
    handleResizeTouchMove,
    handleResizeTouchEnd,
  ]);

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  // Save the text after editing
  const handleTextBlur = () => {
    onUpdate(element.id, { content: newText });
    setIsEditing(false);
  };

  return (
    <div
      className={`absolute ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={(e) => {
        handleMouseDown(e);
        onClick(element.id);
      }}
      onTouchStart={(e) => {
        handleTouchStart(e);
        onClick(element.id);
      }}
    >
      {element.type === 'text' ? (
        isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            autoFocus
            className="w-full h-full p-1 text-center border-none outline-none"
          />
        ) : (
          <div onClick={() => setIsEditing(true)}>{element.content}</div>
        )
      ) : element.type === 'image' ? (
        <img
          src={randomSource}
          alt="Canvas element"
          className="w-full h-full object-cover"
        />
      ) : element.type === 'rectangle' ? (
        <div
          className="w-full h-full"
          style={{ backgroundColor: element.style?.backgroundColor }}
        />
      ) : element.type === 'circle' ? (
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: element.style?.backgroundColor }}
        />
      ) : null}

      {isSelected && (
        <div
          className="absolute bottom-right w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-se-resize -right-2 -bottom-2"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeTouchStart}
        />
      )}
    </div>
  );
}
