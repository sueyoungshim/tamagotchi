let gridSize = 20
let cols, rows
let colors = [] // Array to store the colors of each grid cell

export default function sketch(p5) {
  p5.setup = () => {
    
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    cols = p5.floor(p5.width / gridSize)
    rows = p5.floor(p5.height / gridSize)
    
    for (let i = 0; i < cols; i++) {
      colors[i] = []
      for (let j = 0; j < rows; j++) {
        colors[i][j] = p5.color(255)
      }
    }
  }

  p5.draw = () => {
    if (!p5.focused) return
    // if (p5.mouseX < 0 || p5.mouseX > p5.width || p5.mouseY < 0 || p5.mouseY > p5.height) return

    let maxDist = p5.dist(0, 0, p5.width, p5.height) // Maximum distance on the canvas
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * gridSize
        let y = j * gridSize
  
        // Calculate the distance from the mouse to this grid cell
        let d = p5.dist(p5.mouseX, p5.mouseY, x + gridSize / 2, y + gridSize / 2)
  
        // Calculate the interpolation based on distance
        let lerpFactor = p5.map(d, 0, maxDist, 1, 0) // Closer cells are affected more
  
        // If the mouse is near, change the color to red
        if (d < gridSize * 2) { // A threshold to control how far the ripple extends
          colors[i][j] = p5.lerpColor(colors[i][j], p5.color(255, 200, 200), lerpFactor * 0.1)
        } else {
          // Fade the color back to gray slowly
          colors[i][j] = p5.lerpColor(colors[i][j], p5.color(255), 0.05)
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
        colors[i][j] = p5.color(255)
      }
    }
  
  }
}
