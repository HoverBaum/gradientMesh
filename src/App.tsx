import { useEffect, useState } from 'react'
import { ColorConfigurator, ColorType } from './ColorConfigurator'
import chroma from 'chroma-js'
import { Label } from './components/ui/label'
import { Separator } from './components/ui/separator'
import { MeshDisplay } from './MeshDisplay'
import { ModeToggle } from './components/mode-toggle'
import { randomColors } from './randomColors'

const MAX_COLORS = 3
const GRADIENT_COLORS = 7
const GRADIENT_MODE = 'hsl'

function App() {
  const [colors, setColors] = useState<ColorType[]>(randomColors())
  const [gradientColors, setGradientColors] = useState<string[]>([])

  useEffect(() => {
    if (colors.length === 0) return
    if (colors.length === 1) {
      // For one one color we use complementary color.
      const color = chroma(colors[0].value)
      const complementary = color.set('hsl.h', (color.get('hsl.h') + 180) % 360)
      setGradientColors(
        chroma.scale([color.hex(), complementary.hex()]).colors(GRADIENT_COLORS)
      )
    } else if (colors.length === 2) {
      // For two colors we form a scale between them.
      setGradientColors(
        chroma
          .scale([colors[0].value, colors[1].value])
          .mode(GRADIENT_MODE)
          .colors(GRADIENT_COLORS)
      )
    } else {
      // For three colors we combine scale 1-2 and 2-3.
      // This gives more variance in colors then a single 1-2-3 scale.
      const firstColors = chroma
        .scale([colors[0].value, colors[1].value])
        .mode(GRADIENT_MODE)
        .colors(GRADIENT_COLORS)
      const secondColors = chroma
        .scale([colors[1].value, colors[2].value])
        .mode(GRADIENT_MODE)
        .colors(GRADIENT_COLORS)
      const gradient = firstColors
        .concat(secondColors.slice(1))
        .filter((_, index) => index % 2 === 0)
      setGradientColors(gradient)
    }
  }, [colors])

  return (
    <div className="flex flex-col h-full">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="max-w-prose mx-auto">
        <ColorConfigurator
          colors={colors}
          onColorsChange={setColors}
          maxNumberOfColors={MAX_COLORS}
        />
      </div>
      <div className="max-w-prose mx-auto mt-4 flex">
        <div>
          <Label>Gradient</Label>
          <div className="flex gap-4 mt-1">
            {gradientColors.map((color, index) => (
              <div
                key={color + index}
                className="w-6 h-6 rounded-md"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="flex-grow">
        <MeshDisplay colors={gradientColors} />
      </div>
    </div>
  )
}

export default App
