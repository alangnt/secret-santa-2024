import { useState, useCallback } from 'react';

interface Size {
  width: number;
  height: number;
}

export function useResize(initialSize: Size, onResizeEnd?: (size: Size) => void) {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState(initialSize);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; size: Size } | null>(null);

  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setIsResizing(true);
    setResizeStart({
      x: startX,
      y: startY,
      size: { ...size },
    });
  }, [size]);

  const handleResizeMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isResizing || !resizeStart) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - resizeStart.x;
    const deltaY = clientY - resizeStart.y;

    setSize({
      width: Math.max(20, resizeStart.size.width + deltaX),
      height: Math.max(20, resizeStart.size.height + deltaY),
    });
  }, [isResizing, resizeStart]);

  const handleResizeEnd = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      onResizeEnd?.(size);
    }
  }, [isResizing, size, onResizeEnd]);

  return {
    size,
    isResizing,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd,
    handleResizeTouchStart: handleResizeStart,
    handleResizeTouchMove: handleResizeMove,
    handleResizeTouchEnd: handleResizeEnd,
  };
}
