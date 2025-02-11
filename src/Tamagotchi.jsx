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

export default function Customize() {
  const [texture, setTexture] = useState(null)

  async function renderHeroToCanvas(setTexture) {
    const heroElement = document.getElementsByClassName('hero') // Ensure this ID is in your Hero component
    if (!heroElement) return
  
    const canvas = await html2canvas(heroElement, { backgroundColor: null })
    const texture = new THREE.CanvasTexture(canvas)
  
    setTexture(texture)
  }

  const tamagotchi = useGLTF('tamagotchi.glb')
  console.log(tamagotchi);

  tamagotchi.scene.children.forEach(mesh => {
    mesh.material = new THREE.MeshMatcapMaterial()
    console.log(mesh)
  })

  return <>
    <div className='h-screen'>
      <Canvas
        className='r3f'
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
      >
        <OrbitControls 
          minDistance={4}
          maxDistance={10}
        />
        {/* <mesh>
          <planeGeometry />
          <meshBasicMaterial map={texture} />
        </mesh> */}
        <primitive object={ tamagotchi.scene } />
      </Canvas>
    </div>
  </>
}
