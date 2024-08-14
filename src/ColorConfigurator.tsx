import React, { useEffect, useState } from 'react'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import chroma from 'chroma-js'
import { Trash2Icon } from 'lucide-react'

type ColorType = {
  value: string
  id: string
}

type ColorConfiguratorProps = {
  onColorsChange?: (colors: ColorType[]) => void
}

export const ColorConfigurator: React.FC<ColorConfiguratorProps> = ({
  onColorsChange,
}) => {
  const [colors, setColors] = useState<ColorType[]>([
    {
      value: chroma.random().hex(),
      id: '1',
    },
  ])

  // Notify parent each time colors change.
  useEffect(() => {
    if (onColorsChange) onColorsChange(colors)
  }, [colors, onColorsChange])

  return (
    <div className="max-w-prose mx-auto">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-4">
        Colors
      </h3>
      <div className="flex gap-4">
        {colors.map((color, index) => (
          <>
            <div className="grid max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Color {index + 1}</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  className="w-24"
                  value={color.value}
                  onChange={(e) =>
                    setColors((colors) =>
                      colors.map((oldColor) =>
                        oldColor.id === color.id
                          ? { ...color, value: e.target.value }
                          : oldColor
                      )
                    )
                  }
                  id="email"
                />
                {colors.length > 1 && (
                  <Button
                    onClick={() =>
                      setColors((colors) =>
                        colors.filter((c) => c.id !== color.id)
                      )
                    }
                    variant="outline"
                    size="icon"
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2Icon />
                  </Button>
                )}
              </div>
            </div>

            {index < 2 && (
              <Separator className="h-auto" orientation="vertical" />
            )}
          </>
        ))}
        {colors.length < 3 && (
          <div className="flex items-end">
            <Button
              onClick={() =>
                setColors((colors) => [
                  ...colors,
                  {
                    value: chroma.random().hex(),
                    id: Math.random().toString(36).substring(7),
                  },
                ])
              }
              variant="outline"
            >
              Add Color
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
