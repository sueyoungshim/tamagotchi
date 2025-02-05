import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './style.css'
import Experience from './Experience.jsx'
import Typewriter from './Typewriter.jsx'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Customize() {

  const [color, setColor] = useState('#ffffff')
  const [opacity, setOpacity] = useState(0.5)
  const handleColorChange = (e) => {
    setColor(e.target.value)
  }
  const handleOpacityChange = (e) => {
    setOpacity(e.target.value)
  }

  return <>
    <div className='h-screen'>
      <Typewriter text='customize your shell !!' />
      <input type='color' onChange={handleColorChange}/>

      <Canvas
        className='r3f'
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  </>
}


