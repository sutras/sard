import { type DefaultProps } from '../config'

export interface WatermarkFont {
  color?: string
  fontSize?: number
  fontWeight?: string | number
  fontFamily?: string
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique' | (string & {})
  textAlign?: 'left' | 'right' | 'center' | (string & {})
}

export interface WatermarkProps {
  width?: number
  height?: number
  rotate?: number
  zIndex?: number
  image?: string
  content?: string | string[]
  font?: WatermarkFont
  gap?: [number, number]
  offset?: [number, number]
}

export const defaultWatermarkProps: DefaultProps<WatermarkProps> = {
  width: 120,
  height: 64,
  rotate: -22,
  zIndex: 9,
  gap: () => [30, 30],
}

export const defaultWatermarkFont: Required<WatermarkFont> = {
  color: 'rgba(0,0,0,.15)',
  fontSize: 14,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  textAlign: 'center',
}

export interface WatermarkSlots {
  default?(props: Record<string, never>): any
}

export interface WatermarkEmits {}

export interface WatermarkExpose {}
