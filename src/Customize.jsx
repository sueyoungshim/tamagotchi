import React, { useEffect, useRef, useState } from 'react'
import Typewriter from './Typewriter.jsx'

export default function Customize({ setIsCustomizeFocused }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsCustomizeFocused(entry.isIntersecting),
      { threshold: 0.5 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className='customize section h-screen' ref={sectionRef}>
      <Typewriter text='customize' />
      
    </div>
  )
}

