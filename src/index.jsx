import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './style.css'
import Experience from './Experience.jsx'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const root = ReactDOM.createRoot(document.querySelector('#root'))

const App = () => {

  useGSAP(() => {
    gsap.to('.test', { 
      rotation: 180,
      scrollTrigger: {
        trigger: '.test',
        start: 'bottom bottom',
        end: 'top 20%',
        scrub: true,
        markers: true,
        scroller: '.content'
      },
    })

    const tl = gsap.timeline({
      // scrollTrigger: {
      //   trigger: '.sprite',
      //   start: 'bottom bottom',
      //   end: 'top 20%',
      //   scrub: true,
      //   markers: true,
      //   scroller: '.content',
      // },
    })

    // Alternate between sprite images 1.png and 2.png three times
    tl
    .to('.birth1', {
      duration: 0,
      opacity: 1,
      delay: 0,
    })
    .to('.birth2', {
      duration: 0,
      opacity: 1,
      delay: 1,
    })
    .to('.birth3', {
      duration: 0,
      opacity: 1,
      delay: 2
    })
    .to('.tamagotchi', {
      duration: 0,
      opacity: 1, 
    })
  }, null)

  return (
    <>
      <div className='content'>

        <div className='h-screen'>
          <h1 className='tamagotchi relative text-center text-7xl opacity-0'>
            TAMAGOTCHI tamagotchi
          </h1>
          {/* <div className='spriteContainer relative'>
            <img src='sprite/birth/1.png' className='sprite birth1 absolute opacity-0'/>
            <img src='sprite/birth/2.png' className='sprite birth2 absolute opacity-0'/>
            <img src='sprite/birth/3.png' className='sprite birth3 absolute opacity-0'/>
          </div> */}
          <img src='sprite/birth/birth.gif' className='sprite'/>

        </div>

        <div name='digital-pet' className='h-screen bg-blue-50'>
          <h2 className='text-center'>DIGITAL PET digital pet</h2>
          <h4 className='test'>
            Tamagotchi (Japanese: たまごっち, IPA: [tamaɡotꜜtɕi], 'Egg Watch') is a brand of handheld digital pets that was created in Japan by Akihiro Yokoi of WiZ and Aki Maita of Bandai.
            Japanese words tamago (たまご), which means 'egg', and uotchi (ウオッチ) 'watch'.
          </h4>
        </div>

        <div name='feed' className='h-screen bg-blue-100'>
          <h2 className='text-center'>FEED feed</h2>
          <h4>
            
          </h4>
        </div>

        <div name='game' className='h-screen bg-blue-150'>
          <h2 className='text-center'>GAME game</h2>
        </div>

        <div name='discipline' className='h-screen bg-blue-200'>
          <h2 className='text-center'>DISCIPLINE discipline</h2>
        </div>

        <div name='poop' className='h-screen bg-blue-250'>
          <h2 className='text-center'>
            AND POOP, ... OF COURSE and poop, ... of course
          </h2>
        </div>

        <div name='customize' className='h-screen bg-blue-300'>
          <h2 className='text-center'>CUSTOMIZE YOUR SHELL !! customize your shell !!</h2>
        </div>

        <div name='adopt' className='h-screen bg-blue-350'>
          <button className='outline-dashed rounded-xs p-2'>ADOPT NOW</button>
        </div>
      </div>

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
    </>
  )
}


root.render(<App />)
