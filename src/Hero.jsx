import React, { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './style.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Hero()
{
  const headerRef = useRef()

  const birth1Ref = useRef()
  const birth2Ref = useRef()
  const birth3Ref = useRef()
  
  let paused = false

  useEffect(() => {
    const fadeInOut = (ref) => ({
      onStart: () => { ref.current.style.opacity = 1 },
      onComplete: () => { ref.current.style.opacity = 0 },
      duration: 0.5
    })

    const birthTL = gsap.timeline({ 
      repeat: -1,
      onRepeat: () => {
        if (paused) {
          birthTL.kill()
          const birth3TL = gsap.timeline({
            onComplete: () => {
              console.log('complete');
              birth3TL.kill()
            }
          })
            .to(birth2Ref.current, fadeInOut(birth2Ref))
            .to(birth3Ref.current, { 
              onStart: () => { 
                birth3Ref.current.style.opacity = 1 
                headerRef.current.style.opacity = 1
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

  return <>
    <div className='h-screen'>
      <h1 className='tamagotchi relative text-center text-7xl font-bold opacity-0' ref={headerRef}>
        tamagotchi
      </h1>
      <div>
        <img 
          src='sprite/birth/1.png' 
          className='sprite birth1 absolute opacity-0 display-block mx-auto pointer-events-none'
          ref={birth1Ref}
        /> 
        <img 
          src='sprite/birth/2.png' 
          className='sprite birth1 absolute opacity-0 display-block mx-auto pointer-events-none'
          ref={birth2Ref}
        /> 
        <img 
          src='sprite/birth/3.png' 
          className='sprite birth3 absolute opacity-0 display-block mx-auto pointer-events-none'
          ref={birth3Ref}
        /> 
      </div>
    </div>
  </>
}
