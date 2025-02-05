import React, { useState, useEffect, useRef } from 'react'
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

gsap.registerPlugin(useGSAP, ScrollTrigger)

const root = ReactDOM.createRoot(document.querySelector('#root'))

const App = () => {

  const headerRef = useRef()
  const gifRef = useRef()
  const typewriterRef = useRef()

  const handleGIFLoad = () => {
    console.log('gif loaded');
    setTimeout(() => {
      headerRef.current.style.opacity = 1
    }, 2600);
  }
  
  useEffect(() => {
    const gifElement = gifRef.current
    gifElement.onload = handleGIFLoad
  
    return () => {
      gifElement.onload = null // Clean up the event listener
    }
  }, [])

  useGSAP(() => {
    // GSAP GIF
    gsap.to(gifRef.current, { 
      rotation: 100,
      scrollTrigger: {
        trigger: gifRef.current,
        start: 'top top',
        end: '0% 100%',
        scrub: true,
        scroller: '.content'
      },
    })

    // GSAP TYPEWRITER
    const typewriters = document.querySelectorAll('.typewriter')
    typewriters.forEach(typewriter => {
      gsap.to(typewriter, {
        scrollTrigger: {
          trigger: typewriter,
          scroller: '.content',
          onEnter: () => {
            typewriter.classList.remove('typewriter')
            void typewriter.offsetWidth
            typewriter.classList.add('typewriter')
          },
          onEnterBack: () => {
            typewriter.classList.remove('typewriter')
            void typewriter.offsetWidth
            typewriter.classList.add('typewriter')
          }
        }
      })
    })

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

  return (
    <>
      <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
      <div className='content'>
        <div className='h-screen'>
          <h1 className='tamagotchi relative text-center text-7xl opacity-0' ref={headerRef}>
            TAMAGOTCHI tamagotchi
          </h1>
          <img 
            src='sprite/birth/birth.gif' 
            className='sprite display-block mx-auto pointer-events-none'
            ref={gifRef}
          />
        </div>

        <div name='digital-pet' className='h-screen'>
          <h4 className='test tamagotchi-equation'>
            <p><span className="japanese">tamago たまご</span> <span className="meaning">egg</span></p>
            <p>+ <span className="japanese">uotchi ウオッチ</span> <span className="meaning">watch</span></p>
            <p>= <span className="added">tamagotchi たまごっち</span> <span className="meaning">digital pet</span></p>
          </h4>
        </div>

        <div name='feed' className='feed section h-screen bg-blue-100'>
          <Typewriter text='feed' />
        </div>

        <div name='game' className='game section h-screen bg-blue-200'>
          <Typewriter text='game' />
        </div>

        <div name='discipline' className='discipline section h-screen bg-blue-300'>
          <Typewriter text='discipline' />
        </div>

        <div name='poop' className='poop section h-screen bg-blue-400'>
          <Typewriter text='and poop, ... of course' />
        </div>

        <div name='customize' className='h-screen'>
          <Typewriter text='customize your shell !!' />
        </div>

        <div name='adopt' className='h-screen'>
          <button className='outline-dashed rounded-xs p-2'>ADOPT NOW</button>
        </div>
      </div>

      {/* <Canvas
        className='r3f'
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
      >
        <Experience />
      </Canvas> */}
    </>
  )
}


root.render(<App />)
