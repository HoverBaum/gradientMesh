import { useEffect, useState } from 'react'
import { ColorConfigurator, ColorType } from './ColorConfigurator'
import chroma from 'chroma-js'
import { Label } from './components/ui/label'
import { Separator } from './components/ui/separator'
import { MeshDisplay } from './MeshDisplay'
import { ModeToggle } from './components/mode-toggle'
import { Button } from './components/ui/button'

const MAX_COLORS = 3
const GRADIENT_COLORS = 7
const GRADIENT_MODE = 'hsl'

function App() {
  const shuffleColors = (): ColorType[] => [
    {
      value: chroma.random().hex(),
      id: '1',
    },
    {
      value: chroma.random().hex(),
      id: '2',
    },
    {
      value: chroma.random().hex(),
      id: '3',
    },
  ]

  const [colors, setColors] = useState<ColorType[]>(shuffleColors())
  const [gradientColors, setGradientColors] = useState<string[]>([])

  useEffect(() => {
    if (colors.length === 0) return
    if (colors.length === 1) {
      setGradientColors(chroma.scale([colors[0].value]).colors(GRADIENT_COLORS))
    } else if (colors.length === 2) {
      setGradientColors(
        chroma
          .scale([colors[0].value, colors[1].value])
          .mode(GRADIENT_MODE)
          .colors(GRADIENT_COLORS)
      )
    } else {
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
      <div className="flex max-w-prose items-end mx-auto">
        <ColorConfigurator
          colors={colors}
          onColorsChange={setColors}
          maxNumberOfColors={MAX_COLORS}
        />

        <Button
          className="ml-6"
          variant="outline"
          onClick={() => setColors(shuffleColors())}
        >
          Shuffle
        </Button>
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
