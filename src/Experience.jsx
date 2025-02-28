import { useState, useRef, useEffect } from 'react'
import { OrbitControls, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { drawStar, drawHeart } from './canvasMethods.jsx'

function DrawableMesh({ brushColor, brushSize, brushShape, outerShellColor, innerShellColor, buttonColors, setIsLoaded }) {
    const tamagotchi = useGLTF('tamagotchi.glb')
    const { progress } = useProgress()

    useEffect(() => {
        if (progress === 100) {
            setIsLoaded(true)
        }
    }, [progress])

    const meshes = []

    tamagotchi.scene.children.forEach(mesh => {
        meshes[mesh.name] = mesh
    })


    // PAINT SHELL
    const [isPointerDown, setIsPointerDown] = useState(false)
    const [texture, setTexture] = useState(null)
    const canvasRef = useRef(null)
    const ctxRef = useRef()

    useEffect(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 1024
        canvas.height = 1024
       
        canvasRef.current = canvas
        ctxRef.current = canvas.getContext('2d')

        ctxRef.current.fillStyle = outerShellColor
        ctxRef.current.fillRect(0, 0, canvas.width, canvas.height)

        const newTexture = new THREE.CanvasTexture(canvas)
        newTexture.colorSpace = THREE.SRGBColorSpace

        setTexture(newTexture)
    }, [outerShellColor])

    const handleClick = (e) => {
        if (!texture) return
        const uv = e.intersections[0]?.uv
        if (!uv) return

        const { width, height } = canvasRef.current
        const x = uv.x * width
        const y = (1 - uv.y) * height
    
        const ctx = ctxRef.current
        ctx.fillStyle = brushColor
        ctx.beginPath()
    
        if (brushShape === 'round') {
          ctx.arc(x, y, brushSize, 0, Math.PI * 2)
          ctx.fill()
        } 
        if (brushShape === 'square') {
          ctx.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize)
        }
        if (brushShape === 'star') {
            drawStar(ctx, x, y, 5, brushSize, brushSize / 2)
        }
        if (brushShape === 'heart') {
            drawHeart(ctx, x, y, brushSize)
        }
    
        texture.colorSpace = THREE.SRGBColorSpace
        texture.needsUpdate = true
    }

    const handlePointerMove = (e) => {
        if (!isPointerDown || !texture) return
        const uv = e.intersections[0]?.uv
        if (!uv) return
        if (e.buttons !== 1) return
    
        const { width, height } = canvasRef.current
        const x = uv.x * width
        const y = (1 - uv.y) * height
    
        const ctx = ctxRef.current
        ctx.fillStyle = brushColor
        ctx.beginPath()
    
        if (brushShape === 'round') 
        {
          ctx.arc(x, y, brushSize, 0, Math.PI * 2)
          ctx.fill()
        } 
        if (brushShape === 'square')
        {
          ctx.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize)
        }
        if (brushShape === 'star') {
            drawStar(ctx, x, y, 5, brushSize, brushSize / 2)
        }
        if (brushShape === 'heart') {
            drawHeart(ctx, x, y, brushSize)
        }
    
        texture.colorSpace = THREE.SRGBColorSpace
        texture.needsUpdate = true
    }

    return (
        <>
            {/* Outer Shell (Glossy Plastic) */}
            <primitive 
                object={meshes['outershell']}
                onPointerDown={() => setIsPointerDown(true)}
                onPointerUp={() => setIsPointerDown(false)}
                onPointerMove={handlePointerMove}
                onClick={handleClick}
            >
                {texture && (
                    <meshStandardMaterial
                        map={texture}
                        roughness={0.2}
                        metalness={0.5} 
                        clearcoat={0.8}
                        clearcoatRoughness={0.1}
                    />
                )}
            </primitive>

            {/* Inner Shell */}
            <primitive object={meshes['innershell']}>
                <meshStandardMaterial
                    color={innerShellColor}
                    roughness={0.2}
                    metalness={0.5}
                    clearcoat={0.8} 
                    clearcoatRoughness={0.1}
                />
            </primitive>

            {/* Other Parts */}
            <primitive object={meshes['screen']}></primitive>

            <primitive object={meshes['ring']}>
                <meshStandardMaterial
                    color={outerShellColor}
                    roughness={0.2}
                    metalness={0.5}
                />
            </primitive>

            <primitive object={meshes['leftbutton']}>
                <meshStandardMaterial 
                    color={buttonColors.left}
                    roughness={0.2}
                    metalness={0.5}
                />
            </primitive>

            <primitive object={meshes['rightbutton']}>
            <meshStandardMaterial 
                    color={buttonColors.right}
                    roughness={0.2}
                    metalness={0.5}
                />
            </primitive>

            <primitive object={meshes['centerbutton']}>
            <meshStandardMaterial 
                    color={buttonColors.center}
                    roughness={0.2}
                    metalness={0.5}
                />
            </primitive>
        </>
    )
}


export default function Experience({ 
    screenTexture, 
    brushColor, brushSize, brushShape, 
    outerShellColor, innerShellColor, buttonColors ,
    setIsLoaded
  }) {
    const [loading, setLoading] = useState(true)

    // Trigger when the 3D model has finished loading
    useGLTF.preload('tamagotchi.glb')
    useEffect(() => {
        if (!loading) return
        const timeout = setTimeout(() => {
            setLoading(false)  // Model has loaded, stop showing loading screen
        }, 2000) // Optional timeout for loading screen, can be adjusted

        return () => clearTimeout(timeout) // Cleanup timeout
    }, [loading])

      return (
        <>
          <ambientLight intensity={3}/>
          <directionalLight />
          <OrbitControls 
            // enableZoom={false}
            minDistance={0}
            maxDistance={10}
            mouseButtons={{ RIGHT: 0 }}
          />
          <DrawableMesh 
            screenTexture={screenTexture}
            brushColor={brushColor}
            brushSize={brushSize}
            brushShape={brushShape}
            outerShellColor={outerShellColor}
            innerShellColor={innerShellColor}
            buttonColors={buttonColors}
            setIsLoaded={setIsLoaded}
          />
        </>
      )
  }
  