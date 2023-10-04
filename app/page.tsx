'use client'
import { CanvasElement } from '@/components/Canvas/CanvasElement'
import Layout from './layout'
import { useSession } from 'next-auth/react';

export default function Home() {
  return (
      <Layout>
        <CanvasElement />
      </Layout>
  )
}
