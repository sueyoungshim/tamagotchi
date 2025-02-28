import React, { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Hero( { onStart } )
{
  const audioRef = useRef()
  const headerRef = useRef()

  // useGSAP(() => {
  //   ScrollTrigger.create({
  //     trigger: '.birth',
  //     start: '50% 50%',
  //     scroller: '.content',
  //     markers: true,
  //     onEnter: () => gsap.set('.hero', { opacity: 0 }), // Instantly hide
  //     onLeaveBack: () => gsap.set('.hero', { opacity: 1 }) // Show again when scrolling back up
  //   })
  // }, [])


  return (
    <div className='hero section h-screen'>
      <audio src="animal-crossing.mp3" ref={ audioRef }></audio>

      <h1 className='tamagotchi relative text-center text-7xl font-bold opacity-100' ref={headerRef}>
        tamagotchi
      </h1>
      <button 
        className='outline-dashed rounded-xs p-2 ml-auto mr-auto'
        onClick={() => {
          // TODO: SET BUTTON TO DISAPPEAR
          console.log('button pressed')
          onStart()
        }}
        >start</button>
    </div>
  )
}
