// useCanvasZoom.ts
import { useEffect, useRef, useState } from 'react';

export const useCanvasZoom = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  mousePosition: { x: number; y: number }
) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.shiftKey) {
        event.preventDefault();

        const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1; // Zoom out for wheel down, zoom in for wheel up

        // Calculate the new zoom level
        const newZoom = zoomLevel * scaleFactor;

        setZoomLevel((prevZoom) => {
          // Limit zoom levels to the defined minimum and maximum
          const limitedZoom = Math.min(3, Math.max(1, newZoom));

          // Calculate the new transform origin based on the mouse position
          const mouseX = mousePosition.x;
          const mouseY = mousePosition.y;

          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          const originX = (mouseX - canvasWidth / 2) / (canvasWidth / 2);
          const originY = (mouseY - canvasHeight / 2) / (canvasHeight / 2);

          // Update the transform origin using CSS style
          canvas.style.transformOrigin = `${originX * 100}% ${originY * 100}%`;

          // Apply the zoom
          canvas.style.transform = `scale(${limitedZoom})`;

          return limitedZoom;
        });
      }
    };

    // Add event listener for mouse wheel events
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Remove event listener on cleanup
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [canvasRef, zoomLevel, mousePosition]);

  return zoomLevel;
};
