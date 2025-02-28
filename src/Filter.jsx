import { useEffect, useRef } from 'react'

export default function GrainEffect() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.className = 'filter'
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    canvasRef.current = canvas

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateNoise()
    }

    function generateNoise() {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const pixels = imageData.data

      for (let i = 0; i < pixels.length; i += 4) {
        const value = Math.random() * 255
        pixels[i] = value
        pixels[i + 1] = value
        pixels[i + 2] = value
        pixels[i + 3] = 20 // Opacity
      }

      ctx.putImageData(imageData, 0, 0)
    }

    resizeCanvas()
    const interval = setInterval(generateNoise, 200) // Refresh noise every 200ms
    window.addEventListener('resize', resizeCanvas)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
      document.body.removeChild(canvas)
    }
  }, [])

  return null
}
