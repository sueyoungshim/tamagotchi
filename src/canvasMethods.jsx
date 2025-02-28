export function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3
    let x = cx
    let y = cy
    let step = Math.PI / spikes

    ctx.beginPath()
    ctx.moveTo(cx, cy - outerRadius)

    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius
        y = cy + Math.sin(rot) * outerRadius
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius
        y = cy + Math.sin(rot) * innerRadius
        ctx.lineTo(x, y)
        rot += step
    }

    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath()
    ctx.fill()
}

export function drawHeart(ctx, x, y, size) {
    ctx.beginPath()
    ctx.moveTo(x, y + size / 4)

    ctx.bezierCurveTo(
        x - size / 2, y - size / 2, // Left curve control point
        x - size, y + size / 4,     // Left bottom point
        x, y + size                 // Bottom tip
    )

    ctx.bezierCurveTo(
        x + size, y + size / 4,     // Right bottom point
        x + size / 2, y - size / 2, // Right curve control point
        x, y + size / 4             // Return to top middle
    )

    ctx.closePath()
    ctx.fill()
}
