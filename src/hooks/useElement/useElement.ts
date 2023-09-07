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
  const spaceYBetweenElements = 35


  const fontName = 'serif';
  const widthRectangleElements = 200;
  const heightRectangleElements = 300;
  const heightRectangleTitleElements = 50;

  const drawElement = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const middleXCanvas = (canvas.width / 2) - (widthRectangleElements / 2);
    const middleYCanvas = (canvas.height / 2) - (heightRectangleElements / 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2

    console.log(drawnElements)
    for(let elementIndex = 0; elementIndex < drawnElements?.length; elementIndex++) {

      // Positions
      const posX = drawnElements[elementIndex].posX != 0 ? drawnElements[elementIndex].posX : middleXCanvas
      const posY = drawnElements[elementIndex].posY != 0 ? drawnElements[elementIndex].posY : middleYCanvas
      
      // Manage adptative height
      let heightRectangleElement = heightRectangleElements;
      if((drawnElements[elementIndex].fields).length > 7) {
        heightRectangleElement += (((drawnElements[elementIndex].fields).length) - 7) * 35;
      }
      
      if (drawnElements[elementIndex].type === 'blank') {
        ctx.beginPath();
        
        ///// Drawing of the table /////
        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(posX, posY, widthRectangleElements, heightRectangleElement);

        // Title rectangle
        ctx.strokeRect(posX, posY, widthRectangleElements, heightRectangleTitleElements);

        // Body
        ctx.strokeRect(posX, posY, widthRectangleElements, heightRectangleElement);
        ctx.closePath();

      //   ///// TEXT /////
      //   // Title text
      //   ctx.font = `${fontSizeTitlePx} ${fontName}`;
      //   ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      //   ctx.textAlign = 'center'
      //   ctx.fillText("My title", 
      //     (posX + (widthRectangleElements / 2)), 
      //     posY + (fontSizeTitle * 1.25))


      //   // Body table text (normally will be in a loop)
      //   ctx.font = `${fontSizePx} ${fontName}`;
      //   ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      //   ctx.textAlign = 'left'
      //   ctx.fillText("id", 
      //     (posX + marginXBorder), 
      //     posY + heightRectangleTitleElements * 1.5)
      //   ctx.textAlign = 'right'
      //   ctx.fillText("int", 
      //     (posX + widthRectangleElements - marginXBorder), 
      //     posY + heightRectangleTitleElements * 1.5)
      }
      else if (drawnElements[elementIndex].type === 'custom') {
        const currentElement = drawnElements[elementIndex];

        ///// Drawing of the table /////
        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(posX, posY, widthRectangleElements, heightRectangleElement);

        // Title rectangle
        ctx.strokeRect(posX, posY, widthRectangleElements, heightRectangleTitleElements);

        // Body
        ctx.strokeRect(posX, posY, widthRectangleElements, heightRectangleElement);
        ctx.closePath();

        ///// TEXT /////
        // Title text
        ctx.font = `${fontSizeTitlePx} ${fontName}`;
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.textAlign = 'center';
        ctx.fillText(`${currentElement.name}`, 
          (posX + (widthRectangleElements / 2)), 
          posY + (fontSizeTitle * 1.25))


        // Body table text (normally will be in a loop)
        ctx.font = `${fontSizePx} ${fontName}`;
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        for (let field_index = 0; field_index < (currentElement.fields).length; field_index++) {
          
          ctx.textAlign = 'left';
          ctx.fillText(`${currentElement.fields[field_index].name}`, 
            (posX + marginXBorder), 
            posY + (heightRectangleTitleElements * 1.5) + (spaceYBetweenElements * field_index))

          ctx.textAlign = 'right';
          ctx.fillText(`${currentElement.fields[field_index].type}`, 
            (posX + widthRectangleElements - marginXBorder), 
            (posY + (heightRectangleTitleElements * 1.5) + (spaceYBetweenElements * field_index)))
        }
      }
    }
  }, [drawnElements, canvasRef, fontSizeTitlePx, fontSizePx]);

  useEffect(() => {
    drawElement();
  }, [drawElement]);

  return { drawElement };
};
