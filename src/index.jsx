import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import sketch from './sketch.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Typewriter from './Typewriter.jsx'

import Hero from './Hero.jsx'
import Feed from './Feed.jsx'
import Customize from './Customize.jsx'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const root = ReactDOM.createRoot(document.querySelector('#root'))

const App = () => {
  const audioRef = useRef()

  useEffect(() => {
    // audioRef.current.play()
  })

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
      <audio src="animal-crossing.mp3" ref={ audioRef }></audio>

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

        <Customize />

        <div name='adopt' className='h-screen'>
          <button className='outline-dashed rounded-xs p-2'>ADOPT NOW</button>
        </div>
      </div>
    </>
  )
}

root.render(<App />)
