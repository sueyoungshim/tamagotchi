import { useState, useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function DrawableMesh() {
    const [isPointerDown, setIsPointerDown] = useState(false)
    const [texture, setTexture] = useState(null)
    const canvasRef = useRef(null)
    const ctxRef = useRef()

    useEffect(() => {
        // Create and attach canvas to DOM for debugging
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512
        // document.body.appendChild(canvas) // Debugging
        // canvas.style.position = 'absolute'
        // canvas.style.top = '10px'
        // canvas.style.left = '10px'
        // canvas.style.border = '1px solid red'

        canvasRef.current = canvas
        ctxRef.current = canvas.getContext('2d')

        // Fill background
        ctxRef.current.fillStyle = 'white'
        ctxRef.current.fillRect(0, 0, canvas.width, canvas.height)

        // Create and store texture
        const newTexture = new THREE.CanvasTexture(canvas)
        setTexture(newTexture) // ✅ This ensures reactivity
    }, [])

    const handlePointerMove = (e) => {
        if (!isPointerDown || !texture) return
        const uv = e.intersections[0]?.uv
        if (!uv) return

        const { width, height } = canvasRef.current
        const x = uv.x * width
        const y = (1 - uv.y) * height // Flip Y

        // Draw a circle on the canvas
        const ctx = ctxRef.current
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()

        // Update texture
        texture.needsUpdate = true
    }

    return (
        <mesh
            onPointerDown={() => setIsPointerDown(true)}
            onPointerUp={() => setIsPointerDown(false)}
            onPointerMove={handlePointerMove}
        >
            <sphereGeometry />
            {texture && <meshBasicMaterial map={texture} />} 
        </mesh>
    )
}

export default function Experience() {
    return <>
        <OrbitControls />
        <DrawableMesh />
    </>
}
