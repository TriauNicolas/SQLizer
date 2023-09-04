import { useEffect, useState } from 'react';
import { usePosition } from '../../hooks/usePosition/usePosition';
import { useElement } from '../../hooks/useElement/useElement';
import styles from './CanvasElement.module.css';

interface CanvasElementProps {
  elementToDraw: string;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  elementToDraw,
}) => {
  const { canvasRef } = usePosition();
  const { drawElement } = useElement({ canvasRef, elementToDraw });
  const [ windowWidth, setWindowWidth] = useState(0)
  const [ windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    // Set the canvas width and height
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = windowWidth;
      canvas.height = windowHeight;
    }

    drawElement();
  }, [drawElement, canvasRef]);

  return <canvas ref={canvasRef} className={styles.canvasStyle} width={windowWidth} height={windowHeight}/>;
};
