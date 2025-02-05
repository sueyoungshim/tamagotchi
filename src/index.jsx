import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import sketch from './sketch.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './style.css'
import Experience from './Experience.jsx'
import Typewriter from './Typewriter.jsx'
import Hero from './Hero.jsx'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const root = ReactDOM.createRoot(document.querySelector('#root'))

const App = () => {
  useGSAP(() => {
    // GSAP SECTIONS
    // gsap.to('.section', {
    //   scrollTrigger: {
    //     trigger: '.section',
    //     snap: 1 / 4,
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     scroller: '.content',
    //   }
    // })
    const tl = gsap.timeline()
    tl.from('.tamagotchi', { xPercent: -100, duration: 1 })
      .from('.feed', { xPercent: -100, duration: 1 })
      .from('.game', { xPercent: -100, duration: 1 })
      .from('.discipline', { xPercent: -100, duration: 1 })

  }, null)

  const [color, setColor] = useState('#ffffff')
  const [opacity, setOpacity] = useState(0.5)
  const handleColorChange = (e) => {
    setColor(e.target.value)
  }
  const handleOpacityChange = (e) => {
    setOpacity(e.target.value)
  }

  return (
    <>
      <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
      <div className='content'>
        
        <Hero />

        <div className='h-screen'>
          <h4 className='test tamagotchi-equation'>
            <p><span className="japanese">tamago たまご</span> <span className="meaning">egg</span></p>
            <p>+ <span className="japanese">uotchi ウオッチ</span> <span className="meaning">watch</span></p>
            <p>= <span className="added">tamagotchi たまごっち</span> <span className="meaning">digital pet</span></p>
          </h4>
        </div>

        <div className='feed section h-screen bg-blue-100'>
          <Typewriter text='feed' />
        </div>

        <div className='game section h-screen bg-blue-200'>
          <Typewriter text='game' />
        </div>

        <div className='discipline section h-screen bg-blue-300'>
          <Typewriter text='discipline' />
        </div>

        <div className='poop section h-screen bg-blue-400'>
          <Typewriter text='and poop, ... of course' />
        </div>

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
        <div name='adopt' className='h-screen'>
          <button className='outline-dashed rounded-xs p-2'>ADOPT NOW</button>
        </div>
      </div>
    </>
  )
}


root.render(<App />)
