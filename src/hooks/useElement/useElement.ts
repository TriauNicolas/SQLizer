import { useEffect, RefObject, useCallback } from 'react';
import { DrawnElement } from '@/types/drawnElements';

interface UseElementProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  drawnElements: DrawnElement[]
}

export const useElement = ({ canvasRef, drawnElements }: UseElementProps) => {
  const fontSizeTitle = 24;
  const fontSizeTitlePx = `${fontSizeTitle}px`;
  const fontSize = 18;
  const fontSizePx = `${fontSize}px`;
  const marginXBorder = 10;


  const fontName = 'serif';
  const widthRectangleElements = 200;
  const heightRectangleElements = 300;
  const heightRectangleTitleElements = 50;

  const drawElement = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const middleXCanvas = (canvas.width / 2) - 60;
    const middleYCanvas = (canvas.height / 2) - 50;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2

    console.log(drawnElements)
    for(let elementIndex = 0; elementIndex < drawnElements?.length; elementIndex++) {
      
      if (drawnElements[elementIndex].type === 'blank') {
        ctx.beginPath();
        
        ///// Drawing of the table /////
        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(middleXCanvas, middleYCanvas, widthRectangleElements, heightRectangleElements);

        // Title rectangle
        ctx.strokeRect(middleXCanvas, middleYCanvas, widthRectangleElements, heightRectangleTitleElements);

        // Body
        ctx.strokeRect(middleXCanvas, middleYCanvas, widthRectangleElements, heightRectangleElements);
        ctx.closePath();

        ///// TEXT /////
        // Title text
        ctx.font = `${fontSizeTitlePx} ${fontName}`;
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.textAlign = 'center'
        ctx.fillText("My title", 
          (middleXCanvas + (widthRectangleElements / 2)), 
          middleYCanvas + (fontSizeTitle * 1.25))


        // Body table text (normally will be in a loop)
        ctx.font = `${fontSizePx} ${fontName}`;
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.textAlign = 'left'
        ctx.fillText("id", 
          (middleXCanvas + marginXBorder), 
          middleYCanvas + heightRectangleTitleElements * 1.5)
        ctx.textAlign = 'right'
        ctx.fillText("int", 
          (middleXCanvas + widthRectangleElements - marginXBorder), 
          middleYCanvas + heightRectangleTitleElements * 1.5)
      }
      else if (drawnElements[elementIndex].type === 'custom') {
        console.log("yes");
        
        const currentElement = drawnElements[elementIndex];
        // const posX = drawnElements[elementIndex].posX;
        // const posY = drawnElements[elementIndex].posY;

        ///// Drawing of the table /////
        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(middleXCanvas, middleYCanvas, widthRectangleElements, heightRectangleElements);

        // Title rectangle
        ctx.strokeRect(middleXCanvas, middleYCanvas, widthRectangleElements, heightRectangleTitleElements);

        // Body
        ctx.strokeRect(middleXCanvas, middleYCanvas, widthRectangleElements, heightRectangleElements);
        ctx.closePath();

        ///// TEXT /////
        // Title text
        ctx.font = `${fontSizeTitlePx} ${fontName}`;
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.textAlign = 'center';
        ctx.fillText(`${currentElement.name}`, 
          (middleXCanvas + (widthRectangleElements / 2)), 
          middleYCanvas + (fontSizeTitle * 1.25))


        // Body table text (normally will be in a loop)
        ctx.font = `${fontSizePx} ${fontName}`;
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        for (let field_index = 0; field_index < (currentElement.fields).length; field_index++) {
          
          ctx.textAlign = 'left';
          ctx.fillText(`${currentElement.fields[field_index].name}`, 
            (middleXCanvas + marginXBorder), 
            middleYCanvas + heightRectangleTitleElements * 1.5)

          ctx.textAlign = 'right';
          ctx.fillText(`${currentElement.fields[field_index].type}`, 
            (middleXCanvas + widthRectangleElements - marginXBorder), 
            (middleYCanvas + (heightRectangleTitleElements * 1.5)))
        }
      }
    }
  }, [drawnElements, canvasRef, fontSizeTitlePx, fontSizePx]);

  useEffect(() => {
    drawElement();
  }, [drawElement]);

  return { drawElement };
};
