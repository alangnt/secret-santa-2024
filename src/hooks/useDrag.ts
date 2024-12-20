import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useDrag(initialPosition: Position, onDragEnd?: (position: Position) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [dragStart, setDragStart] = useState<Position | null>(null);

  // Mouse down / Touch start handler
  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setIsDragging(true);
      setDragStart({
        x: clientX - position.x,
        y: clientY - position.y,
      });
    },
    [position]
  );

  // Mouse move / Touch move handler
  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !dragStart) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const newPosition = {
        x: clientX - dragStart.x,
        y: clientY - dragStart.y,
      };

      setPosition(newPosition);
    },
    [isDragging, dragStart]
  );

  // Mouse up / Touch end handler
  const handleEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.(position);
    }
  }, [isDragging, position, onDragEnd]);

  return {
    position,
    isDragging,
    handleMouseDown: (e: React.MouseEvent) => handleStart(e),
    handleTouchStart: (e: React.TouchEvent) => handleStart(e),
    handleMouseMove: handleMove,
    handleTouchMove: handleMove,
    handleMouseUp: handleEnd,
    handleTouchEnd: handleEnd,
  };
}
