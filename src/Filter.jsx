import { useEffect } from 'react'

export default function GrainEffect() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')

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

    setInterval(generateNoise, 200) // Refresh every 50ms for animation
  }, [])

  return null
}
