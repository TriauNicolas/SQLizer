'use client'

import styles from './page.module.css'
import { CanvasElement } from '../components/CanvasElement'

export default function Home() {

  return (
    <div className={styles.mainDiv}>
      <h1>Canvas Test</h1>
      <CanvasElement />
    </div>
  )
}
