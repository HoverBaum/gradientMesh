import React from 'react'

type MeshDisplayProps = {
  colors: string[]
  /**
   * The maximum distance in % that a gradient origin can be from the edge of the container.
   * Defaults to 30.
   */
  maxDistance?: number
}

export const MeshDisplay: React.FC<MeshDisplayProps> = ({
  colors,
  maxDistance = 30,
}) => {
  const generateConstrainedPosition = (): string => {
    const side = Math.floor(Math.random() * 4) // 0 = top, 1 = bottom, 2 = left, 3 = right
    let x, y

    switch (side) {
      case 0: // top
        x = Math.floor(Math.random() * 100)
        y = Math.floor(Math.random() * maxDistance)
        break
      case 1: // bottom
        x = Math.floor(Math.random() * 100)
        y = 100 - Math.floor(Math.random() * maxDistance)
        break
      case 2: // left
        x = Math.floor(Math.random() * maxDistance)
        y = Math.floor(Math.random() * 100)
        break
      case 3: // right
        x = 100 - Math.floor(Math.random() * maxDistance)
        y = Math.floor(Math.random() * 100)
        break
    }

    return `${x}% ${y}%`
  }

  const backgroundImage = colors
    .map(
      (color) =>
        `radial-gradient(circle at ${generateConstrainedPosition()}, ${color}, transparent 66%)`
    )
    .join(', ')

  const style = {
    backgroundImage: backgroundImage,
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <div
        className="blur-md bg-muted bg-blend-color dark:bg-blend-darken w-full h-full "
        style={style}
      ></div>
    </div>
  )
}
