import { useEffect, useRef } from 'react'

export default function GrainEffect() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

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
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
