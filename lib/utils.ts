import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const splitHsl = (str: string) => {
  const splited = str.split(' ')
  return {
    h: Number(splited[0]),
    s: parseFloat(splited[1]),
    l: parseFloat(splited[2]),
  }
}

// From https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
export const hslToHex = (h, s, l) => {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
