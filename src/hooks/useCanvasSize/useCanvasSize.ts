import { useState, useLayoutEffect } from "react"

export const useCanvasSize = () => {
const [size, setSize] = useState({width: 0, height: 0});
    useLayoutEffect(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, [])
    return { size }
}