import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import sketch from './sketch.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Typewriter from './Typewriter.jsx'
import Filter from './Filter.jsx'

import Hero from './Hero.jsx'
import Tamagotchi from './Tamagotchi.jsx'
import Feed from './Feed.jsx'
import Customize from './Customize.jsx'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const root = ReactDOM.createRoot(document.querySelector('#root'))

const App = () => {
  return (
    <>
      <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
      <Filter />

      <div className='r3f z-0'>
        <Customize />
      </div>


      <div className='content z-1'>
        
        <Hero className='hero section'/>
        {/* <Tamagotchi className='' /> */}

        <div className='introduction section h-screen'>
          <h4 className='test tamagotchi-equation'>
            <p><span className="japanese">tamago たまご</span> <span className="meaning">egg</span></p>
            <p>+ <span className="japanese">uotchi ウオッチ</span> <span className="meaning">watch</span></p>
            <p>= <span className="added">tamagotchi たまごっち</span> <span className="meaning">digital pet</span></p>
          </h4>
        </div>

        <Feed />

        <div className='game section h-screen bg-blue-200'>
          <Typewriter text='game' />
        </div>

        <div className='discipline section h-screen bg-blue-300'>
          <Typewriter text='discipline' />
        </div>

        <div className='poop section h-screen bg-blue-400'>
          <Typewriter text='and poop, ... of course' />
        </div>

        {/* <Customize /> */}

        <div name='adopt section' className='h-screen'>
          <button className='outline-dashed rounded-xs p-2'>ADOPT NOW</button>
        </div>
      </div>
    </>
  )
}

root.render(<App />)
