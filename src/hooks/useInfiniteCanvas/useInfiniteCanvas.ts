import { useEffect, useRef, useState } from 'react';

export const useInfiniteCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  initialPosition: { x: number; y: number }
) => {
  const [position, setPosition] = useState(initialPosition);
  const isDraggingRef = useRef(false);
  const lastMousePositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0 && event.shiftKey) {
        // Left click + Shift key to initiate dragging
        isDraggingRef.current = true;
        lastMousePositionRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - lastMousePositionRef.current!.x;
      const deltaY = event.clientY - lastMousePositionRef.current!.y;

      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));

      lastMousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      lastMousePositionRef.current = null;
    };

    // Add event listeners for mouse interactions
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Remove event listeners on cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [canvasRef]);

  useEffect(() => {
    // Apply the panning transformation to the canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transform = `translate(${position.x}px, ${position.y}px)`;
  }, [position, canvasRef]);

  return position;
};
