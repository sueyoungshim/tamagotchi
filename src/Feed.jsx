import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Typewriter from './Typewriter.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Feed() {
  const containerRef = useRef(null)

  const handleClick = (e) => {
    if (!containerRef.current) return

    const cake = document.createElement('img')
    cake.src = '/sprite/cake.gif'
    cake.className = 'sprite absolute pointer-events-none'
    cake.style.position = 'absolute'
    cake.style.top = `${e.clientY}px`
    cake.style.left = `${e.clientX}px`

    containerRef.current.appendChild(cake)

    // Remove cake after animation
    setTimeout(() => {
      cake.remove()
    }, 2000)
  }

  return (
    <div ref={containerRef} className='feed section h-screen cursor-pointer relative' onClick={handleClick}>
      <Typewriter text='feed' />
    </div>
  )
}
