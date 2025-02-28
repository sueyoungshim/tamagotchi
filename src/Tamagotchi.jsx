import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'

import './style.css'
import Experience from './Experience.jsx'
import Typewriter from './Typewriter.jsx'
import Sprite from './Sprite.jsx'

export default function Tamagotchi({ 
  screenTexture, 
  color, setColor, 
  size, setSize, 
  shape, setShape, 
  outerShellColor, setOuterShellColor,
  innerShellColor, setInnerShellColor,
  buttonColors, setButtonColors,
  isLoaded, setIsLoaded,
  isCustomizeFocused 
}) {
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
    <div className='h-screen flex justify-center items-center relative'>
      <div className='spriteLayer absolute z-10 bg-white'>
        <Sprite className='absolute z-10' isLoaded={isLoaded} />
      </div>

      <div className='absolute top-1'>
        <Typewriter text='Customize your Tamagotchi' />
      </div>

      <div className='absolute bottom-5 right-5 bg-transparent p-4 rounded-2xl shadow-lg space-y-3 z-5'>
        <div>
          <label className='block font-semibold'>Brush Color</label>
          <div className='flex items-center space-x-2'>
            <input type='color' className='w-8 h-9' value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
        </div>

        <div>
          <label className='block font-semibold'>Brush Size</label>
          <input 
            type='range' 
            min='1' 
            max='50' 
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value))} 
            className='w-full appearance-none h-3 rounded-lg' 
            style={{ background: color, '--brush-color': color, '--brush-radius': `${size}px`}}
          />
        </div>

        <div>
          <label className='block font-semibold mb-2'>Brush Shape</label>
          <div className='flex space-x-2'>
            {[
              { value: 'round', label: '●' }, 
              { value: 'square', label: '■' },
              { value: 'star', label: '★' },
              { value: 'heart', label: '♥' }
            ].map(({ value, label }) => (
              <button 
                key={value}
                onClick={() => setShape(value)}
                className={`shapeButton w-10 h-10 flex items-center justify-center rounded-lg border transition-all 
                text-[color:var(--brush-color)]
                ${shape === value ? 'bg-gray-300 scale-110' : 'bg-white hover:bg-gray-200'}`}
              >
                <span className='text-lg'>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className='space-y-2'>
          {[
            { label: 'Outer Shell', value: outerShellColor, setter: setOuterShellColor },
            { label: 'Inner Shell', value: innerShellColor, setter: setInnerShellColor },
            { label: 'Left Button', value: buttonColors.left, setter: (val) => setButtonColors({ ...buttonColors, left: val }) },
            { label: 'Center Button', value: buttonColors.center, setter: (val) => setButtonColors({ ...buttonColors, center: val }) },
            { label: 'Right Button', value: buttonColors.right, setter: (val) => setButtonColors({ ...buttonColors, right: val }) }
          ].map(({ label, value, setter }, index) => (
            <div key={index} className='flex items-center justify-between'>
              <label className='font-semibold'>{label}</label>
              <div className='flex items-center space-x-2'>
                <input type='color' className='w-8 h-9' value={value} onChange={(e) => setter(e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Canvas
        className='r3f absolute z-0'
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 8],
        }}
        gl={{ preserveDrawingBuffer: true }}
        
      >
        <Experience 
          screenTexture={screenTexture} 
          brushColor={color} 
          brushSize={size} 
          brushShape={shape}
          outerShellColor={outerShellColor}
          innerShellColor={innerShellColor}
          buttonColors={buttonColors}
          // isLoaded={isLoaded}
          setIsLoaded={setIsLoaded}
        />
      </Canvas>

      <div className='info absolute bottom-10'>
        right-click to rotate
      </div>
    </div>
  )
}
