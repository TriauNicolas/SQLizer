'use client'
import { CanvasElement } from '@/components/CanvasComponents/Canvas/CanvasElement'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import { doFetchRequest } from "@/api/fetch"
import { useEffect, useState } from 'react';

const Canvas = () => {
    const { data: session, status } = useSession();
    const [ token, setToken ] = useState("");
    const [ canUserUpdateDb, setCanUserUpdateDb ] = useState(false);
    const router = useRouter()
    const { canvasId } = useParams()

    useEffect(() => {
        if (status === 'authenticated') {

            // @ts-ignore
            setToken(session?.user?.token);
            const getUserRight = async() => {
              // @ts-ignore
              return await doFetchRequest({method:"GET", token: session?.user?.token, url:`/auth/canUserAccessDatabase/${canvasId}`})
            }

            getUserRight().then((response) => {
              setCanUserUpdateDb(response);
              if (!response) router.back()
            })
            .catch((error) => {
              console.log(error)
              router.back()
            });
        }
    }, [canvasId, router, session, status]);

    return token && canUserUpdateDb && (
        <CanvasElement
            token = {token}
            databaseId = {canvasId}
        />
    )
}


export default Canvas
