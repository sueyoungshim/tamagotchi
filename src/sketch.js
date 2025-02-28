export default function sketch(p5) {
  let gridSize = 20
  let cols, rows
  let colors = [] // Array to store the colors of each grid cell
  let hue = 50
  let color
  let normalizeFactor

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    cols = p5.floor(p5.width / gridSize)
    rows = p5.floor(p5.height / gridSize)

    color = p5.color(`hsl(${hue}, 100%, 75%)`)

    for (let i = 0; i < cols; i++) {
      colors[i] = []
      for (let j = 0; j < rows; j++) {
        colors[i][j] = p5.color('rgb(255, 255, 255)')
      }
    }

    normalizeFactor = 360 / (rows * cols)
  }

  p5.mouseMoved = () => {
    if (!p5.focused) return

    let maxDist = p5.dist(0, 0, p5.width, p5.height) // Maximum distance on the canvas
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * gridSize
        let y = j * gridSize
  
        // Calculate the distance from the mouse to this grid cell
        let d = p5.dist(p5.mouseX, p5.mouseY, x + gridSize / 2, y + gridSize / 2)
  
        // Calculate the interpolation based on distance
        let lerpFactor = p5.map(d, 0, maxDist, 1, 0) // Closer cells are affected more
  
        if (d < gridSize * 2) { // A threshold to control how far the ripple extends
          hue = Math.floor(p5.map(i * rows + j, 0, rows * cols, 0, 360, true))
          color = p5.color(`hsl(${hue}, 100%, 75%)`)
          colors[i][j] = p5.lerpColor(colors[i][j], color, lerpFactor * 0.1)
        } else {
          // Fade the color back to white slowly
          colors[i][j] = p5.lerpColor(colors[i][j], p5.color('rgb(255, 255, 255)'), 0.1)
          let c = colors[i][j]
          if (p5.red(c) > 250 && p5.green(c) > 250 && p5.blue(c) > 250) {
            colors[i][j] = p5.color('rgb(255, 255, 255)') // Force full white to prevent lingering tint
          }
        }
  
        p5.fill(colors[i][j])
        p5.noStroke()
        p5.rect(x, y, gridSize, gridSize)
      }
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)

    cols = p5.floor(p5.width / gridSize)
    rows = p5.floor(p5.height / gridSize)

    colors = []
    for (let i = 0; i < cols; i++) {
      colors[i] = []
      for (let j = 0; j < rows; j++) {
        colors[i][j] = p5.color('rgb(255, 255, 255)')
      }
    }

    normalizeFactor = 360 / (rows * cols)
  }
}
