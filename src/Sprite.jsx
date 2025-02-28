import React, { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Sprite({ isLoaded })
{
  const birth1Ref = useRef()
  const birth2Ref = useRef()
  const birth3Ref = useRef()

  const loadingRef = useRef()
  const enterMusicRef = useRef()

  let paused = false

  useEffect(() => {
    const fadeInOut = (ref, duration=0.5) => ({
      onStart: () => { ref.current.style.opacity = 1 },
      onComplete: () => { ref.current.style.opacity = 0 },
      duration: duration
    })

    const birthTL = gsap.timeline({ 
      repeat: -1, // repeat indefinitely
      onRepeat: () => {
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
              onStart: () => { 
                birth3Ref.current.style.opacity = 1 

                loadingRef.current.style.opacity = 0
                enterMusicRef.current.style.opacity = 100
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

  const handleClick = () => {
    const audio = new Audio('animal-crossing.mp3')
    audio.play()
    document.getElementsByClassName('spriteLayer')[0].style.display = 'none'
    document.getElementsByClassName('r3fLayer')[0].style.opacity = 100

  }

  useEffect(() => {
    stopAnimation()
  }, [isLoaded])

  return (
    <div className='h-screen flex items-center justify-center relative'>
      <div className='absolute' ref={loadingRef}>
        loading tamagotchi ...
      </div>

      
      <div
        className="absolute opacity-0 top-0 left-0 h-screen w-screen flex items-center justify-center cursor-pointer"
        ref={enterMusicRef}
        onClick={handleClick}
      >
        <div className="text-center">click to enter with music</div>
      </div>

      
      <img
        src='sprite/birth/1.png' 
        className='birth1 birth'
        ref={birth1Ref}
      /> 
      <img 
        src='sprite/birth/2.png' 
        className='birth2 birth'
        ref={birth2Ref}
      /> 
      <img 
        src='sprite/birth/3.png' 
        className='birth3 birth opacity-0'
        ref={birth3Ref}
      /> 
    </div>
  )
}
