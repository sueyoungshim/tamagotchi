import React, { useState, useEffect, useRef, useMemo } from 'react'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import html2canvas from 'html2canvas'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './style.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Tamagotchi() {
  const [texture, setTexture] = useState(null)

  async function renderHeroToCanvas(setTexture) {
    const heroElement = document.querySelector('.hero') // Get first matching element
    if (!heroElement) return
  
    // Wait for html2canvas to render
    const canvas = await html2canvas(heroElement, { backgroundColor: null })
    const texture = new THREE.CanvasTexture(canvas)
  
    setTexture(texture)
  
    // Hide the Hero component after rendering
    gsap.to(heroElement, { opacity: 0, duration: 0.5 })
  }
  

  const tamagotchi = useGLTF('tamagotchi.glb')

  tamagotchi.scene.children.forEach(mesh => {
    mesh.material = new THREE.MeshMatcapMaterial()
  })


  return <>
    <div className='h-screen'>
      <Canvas
        className='r3f'
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [0, 0, 4],
        }}
      >
        {/* <OrbitControls 
          minDistance={4}
          maxDistance={10}
        /> */}
        <mesh>
          <planeGeometry />
          <meshBasicMaterial map={texture} />
        </mesh>
        {/* <primitive object={ tamagotchi.scene } /> */}
      </Canvas>
    </div>
  </>
}
