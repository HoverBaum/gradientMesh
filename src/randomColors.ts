import chroma from 'chroma-js'
import { ColorType } from './ColorConfigurator'

export const randomColors = (amount = 3): ColorType[] => {
  const colors = [] as ColorType[]
  for (let i = 0; i < amount; i++) {
    colors.push({
      value: chroma.random().hex(),
      id: i.toString(),
    })
  }
  return colors
}
