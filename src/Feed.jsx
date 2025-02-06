import React, { useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Typewriter from './Typewriter.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Feed() {
  const [cakes, setCakes] = useState([])

  const handleClick = (e) => {
    const newCake = {
      id: Date.now(), // Unique key
      x: e.clientX,
      y: e.clientY
    }
    setCakes((prevCakes) => [...prevCakes, newCake])

    // remove cake after animation
    setTimeout(() => {
      setCakes((prevCakes) => prevCakes.filter(cake => cake.id !== newCake.id))
    }, 2000)
  }

  return (
    <div className='feed section h-screen bg-blue-100 cursor-pointer relative' onClick={handleClick}>
      <Typewriter text='feed' />
      
      {/* Render all cakes at clicked positions */}
      {cakes.map((cake) => (
        <img
          key={cake.id}
          src='/sprite/cake.gif'
          alt='cake'
          className='sprite w-[64px] h-[64px] absolute pointer-events-none'
          style={{
            top: `${cake.y}px`,
            left: `${cake.x}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  )
}
