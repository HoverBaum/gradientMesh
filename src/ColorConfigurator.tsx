import React from 'react'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import chroma from 'chroma-js'
import { Trash2Icon } from 'lucide-react'
import { randomColors } from './randomColors'

export type ColorType = {
  value: string
  id: string
}

type ColorConfiguratorProps = {
  colors: ColorType[]
  onColorsChange: (colors: ColorType[]) => void
  maxNumberOfColors: number
}

export const ColorConfigurator: React.FC<ColorConfiguratorProps> = ({
  colors,
  onColorsChange,
  maxNumberOfColors,
}) => {
  return (
    <div className="w-full sm:w-[65ch] mx-auto p-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-4">
        Colors
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <div className="flex mt-2" key={color.id}>
            <div className="grid max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Color {index + 1}</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  className="w-24"
                  value={color.value}
                  onChange={(e) =>
                    onColorsChange(
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
                      onColorsChange(colors.filter((c) => c.id !== color.id))
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
            {/* {index < maxNumberOfColors - 1 && (
              <Separator className="h-full mx-4" orientation="vertical" />
            )} */}
          </div>
        ))}
        {colors.length < maxNumberOfColors && (
          <div className="flex items-end">
            <Button
              onClick={() =>
                onColorsChange([
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
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => onColorsChange(randomColors(colors.length))}
          >
            Shuffle
          </Button>
        </div>
      </div>
    </div>
  )
}
