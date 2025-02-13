import { useState, useRef, useEffect } from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function DrawableMesh() {
    const tamagotchi = useGLTF('tamagotchi.glb')
    const meshes = []

    tamagotchi.scene.children.forEach(mesh => {
        meshes[mesh.name] = mesh
    })

    // const meshes = tamagotchi.scene.children
    // const shell = tamagotchi.scene.children.find(mesh => mesh.name === 'shell')

    const [isPointerDown, setIsPointerDown] = useState(false)
    const [texture, setTexture] = useState(null)
    const canvasRef = useRef(null)
    const ctxRef = useRef()

    useEffect(() => {
        // Create and attach canvas to DOM for debugging
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512
       
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
        <>
            <primitive 
                object={meshes['shell']}
                onPointerDown={() => setIsPointerDown(true)}
                onPointerUp={() => setIsPointerDown(false)}
                onPointerMove={handlePointerMove}
            >
                {/* {texture && <meshMatcapMaterial 
                    map={texture} 
                    side={THREE.DoubleSide}
                    transparent 
                    opacity={0.5}/>}  */}
                {/* {texture && <meshBasicMaterial map={texture} transparent opacity={0.5}/>}  */}
                {texture && <meshMatcapMaterial map={texture}/>} 
            </primitive>
            <primitive object={meshes['screen']}>
                <meshMatcapMaterial color='red'/>
            </primitive>
            <primitive object={meshes['ring']}>
                <meshMatcapMaterial color='red'/>
            </primitive>
            <primitive object={meshes['chain']}>
                <meshMatcapMaterial color='red'/>
            </primitive>
            <primitive object={meshes['leftbutton']}>
                <meshMatcapMaterial color='red'/>
            </primitive>
            <primitive object={meshes['rightbutton']}>
                <meshMatcapMaterial color='red'/>
            </primitive>
            <primitive object={meshes['centerbutton']}>
                <meshMatcapMaterial color='red'/>
            </primitive>
        </>
    )
}

export default function Experience() {
    return <>
        <ambientLight />
        <OrbitControls 
            minDistance={4}
            maxDistance={10}
            mouseButtons={{
                RIGHT: 0, // Right-click for rotation
            }}/>
        <DrawableMesh />
    </>
}
