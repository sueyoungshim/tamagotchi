import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './style.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Typewriter({ text, speed=0.1 })
{
  const typewriterRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: typewriterRef.current,
        onEnter: () => {
          typewriterRef.current.innerHTML = ''
          tl.restart()
        },
        markers: true,
        scroller: '.content'
      }
    }) 

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span')
      if (text[i] === ' ') {
        span.innerHTML = '&nbsp;'
      } else {
        span.textContent = text[i]
      }

      tl.to(typewriterRef.current, {
        duration: speed,
        onStart: () => {
          typewriterRef.current.appendChild(span)
        }
      })
    }
  }, null)

  return (
    <div className="typewriter-container" ref={typewriterRef}></div>
  )
}
