import React, { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Hero()
{
  const audioRef = useRef()
  const headerRef = useRef()

  const birth1Ref = useRef()
  const birth2Ref = useRef()
  const birth3Ref = useRef()
  
  let paused = false

  useEffect(() => {
    const fadeInOut = (ref, duration=0.5) => ({
      onStart: () => { ref.current.style.opacity = 1 },
      onComplete: () => { ref.current.style.opacity = 0 },
      duration: duration
    })

    const birthTL = gsap.timeline({ 
      repeat: -1, // repeat indefinitely
      onRepeat: async () => {
        if (paused) { // if user interacts with page, kill animation
          birthTL.kill()
          const birth3TL = gsap.timeline({ // start new animation
            onComplete: () => {
              birth3TL.kill()
            }
          })
            .to(birth1Ref.current, fadeInOut(birth1Ref, 0.5))
            .to(birth2Ref.current, fadeInOut(birth2Ref, 0.15))
            .to(birth1Ref.current, fadeInOut(birth1Ref, 0.15))
            .to(birth2Ref.current, fadeInOut(birth2Ref, 0.5))
            .to(birth3Ref.current, { 
              onStart: async () => { 
                birth3Ref.current.style.opacity = 1 
                headerRef.current.style.opacity = 1
                // audioRef.current.play()

                // capture html2canvas
                // await renderHeroToCanvas(setTexture) // Capture and apply texture

                // Hide <Hero /> component
                gsap.to('.hero', { opacity: 0, duration: 0.5 })

                // hide <HERO /> component
                
              }
            })
        }
      },
    })
    .to(birth1Ref.current, fadeInOut(birth1Ref))
    .to(birth2Ref.current, fadeInOut(birth2Ref))
  }, [])

  const stopAnimation = () => {
    paused = true 
  }

  useEffect(() => {
    window.addEventListener('click', stopAnimation)
    window.addEventListener('wheel', stopAnimation)
    window.addEventListener('keydown', stopAnimation)

    return () => {
      window.removeEventListener('click', stopAnimation)
      window.removeEventListener('wheel', stopAnimation)
      window.removeEventListener('keydown', stopAnimation)
    }
  }, [])

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


  return <>
    <div className='hero h-screen'>
      <audio src="animal-crossing.mp3" ref={ audioRef }></audio>

      <h1 className='tamagotchi relative text-center text-7xl font-bold opacity-0' ref={headerRef}>
        tamagotchi
      </h1>
      <button 
        className='outline-dashed rounded-xs p-2 ml-auto mr-auto'
        onClick={() => {
          // TODO: SET BUTTON TO DISAPPEAR
        }}
        >start</button>
      <div className='absolute w-fit ml-auto mr-auto bottom-0 left-0 right-0'> 
        <img
          src='sprite/birth/1.png' 
          className='birth absolute opacity-0 display-block mx-auto pointer-events-none'
          ref={birth1Ref}
        /> 
        <img 
          src='sprite/birth/2.png' 
          className='birth absolute opacity-0 display-block mx-auto pointer-events-none'
          ref={birth2Ref}
        /> 
        <img 
          src='sprite/birth/3.png' 
          className='birth absolute opacity-0 display-block mx-auto pointer-events-none'
          ref={birth3Ref}
        /> 
        <div className='sprite'></div>
      </div>
    </div>
  </>
}
