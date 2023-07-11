import styles from '../app/page.module.css';
import { usePosition } from '../hooks/usePosition'

export const CanvasElement = () => {
  const { canvasRef } = usePosition()


  return <canvas ref={canvasRef} width={750} height={750} className={styles.canvasStyle} />
}