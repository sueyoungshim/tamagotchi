import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import sketch from './sketch.js'

import * as htmlToImage from 'html-to-image';
import * as THREE from 'three'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Typewriter from './Typewriter.jsx'
import Filter from './Filter.jsx'
import Sprite from './Sprite.jsx'

import Hero from './Hero.jsx'
import Intro from './Intro.jsx'
import Feed from './Feed.jsx'
import Tamagotchi from './Tamagotchi.jsx'
import Customize from './Customize.jsx'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const root = ReactDOM.createRoot(document.querySelector('#root'))

const App = () => {
  const [screenTexture, setScreenTexture] = useState(null)
  const [color, setColor] = useState('#85A3FF')
  const [size, setSize] = useState(10)
  const [shape, setShape] = useState('round')
  const [isCustomizeFocused, setIsCustomizeFocused] = useState(false)

  const [outerShellColor, setOuterShellColor] = useState('#75fffd')
  const [innerShellColor, setInnerShellColor] = useState('#ffe957')
  const [buttonColors, setButtonColors] = useState({
    left: '#ffa8a8',
    right: '#aa99ff',
    center: '#52ff94'
  })

  const [isLoaded, setIsLoaded] = useState(false)

  async function renderHeroToCanvas() {
    const heroElement = document.querySelector('.spriteLayer')
    if (!heroElement) return
  
    try {
      const dataUrl = await htmlToImage.toPng(heroElement) 
  
      const img = new Image()
      img.src = dataUrl
      // img.style.position = 'fixed'
      // img.style.bottom = '10px'
      // img.style.right = '10px'
      // img.style.border = '2px solid red'
      // img.style.zIndex = '10000'
      // document.body.appendChild(img)
  
      const loader = new THREE.TextureLoader()
      loader.load(dataUrl, (texture) => {
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set( 4, 4 )

        texture.needsUpdate = true
        setScreenTexture(texture) 
      })
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <>

      <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
      
      {/* Noise Filter (Should be below the Tamagotchi) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Filter />
      </div>

    {/* Tamagotchi 3D Model (Should be above the noise filter) */}
    <div className="absolute inset-0 z-10">
      <Tamagotchi 
        screenTexture={screenTexture}
        color={color} setColor={setColor}
        size={size} setSize={setSize}
        shape={shape} setShape={setShape}
        isCustomizeFocused={isCustomizeFocused}
        outerShellColor={outerShellColor} setOuterShellColor={setOuterShellColor}
        innerShellColor={innerShellColor} setInnerShellColor={setInnerShellColor}
        buttonColors={buttonColors} setButtonColors={setButtonColors}
        isLoaded={isLoaded} setIsLoaded={setIsLoaded}
      />
    </div>

      {/* <div className='spriteLayer z-1'>
        <Sprite />
      </div> */}

      {/* <div className='content z-2'> */}
{/*         
        <Hero onStart={ renderHeroToCanvas }/>
        <Intro />
        <Feed />

        <div className='play section h-screen'>
          <Typewriter text='play' />
        </div>

        <div className='discipline section h-screen'>
          <Typewriter text='train' />
        </div>

        <div className='poop section h-screen'>
          <Typewriter text='and messy business ...' />
        </div> */}

        {/* <Customize 
          setIsCustomizeFocused={setIsCustomizeFocused}
        /> */}

        {/* <div className='adopt section h-screen'>
          <button className='outline-dashed rounded-xs p-2'>ADOPT NOW</button>
        </div>
         */}

      {/* </div> */}
    </>
  )
}

root.render(<App />)
