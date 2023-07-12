'use client'

import { useState } from 'react'
import styles from './page.module.css'
import { CanvasElement } from '@/components/CanvasElement'
import { PredefinedTable } from '@/components/PredefinedTable'

export default function Home() {
  const [elementToDraw, setElementToDraw] = useState('')

  const handlerForCallbackSelection = (selectedElement: string) => {
    setElementToDraw(selectedElement)
  }

  return (
    <div className={styles.mainDiv}>
      <h1>Canvas Test</h1>
      <div className={styles.containerCanvas}>
        <PredefinedTable callbackSelection={handlerForCallbackSelection}/>
        <CanvasElement elementToDraw={elementToDraw}/>
      </div>
    </div>
  )
}
