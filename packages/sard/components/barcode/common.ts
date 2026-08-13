import {
  type CanvasTextAlign,
  type BarcodeFormat,
  type BarcodeTextPosition,
  type CanvasFontStyle,
  type CanvasFontWeight,
} from '../../utils'
import { type DefaultProps } from '../config'

export interface BarcodeProps {
  value?: string
  format?: BarcodeFormat
  width?: number
  height?: number
  color?: string
  background?: string
  displayValue?: boolean
  textPosition?: BarcodeTextPosition
  textAlign?: CanvasTextAlign
  textMargin?: number
  fontStyle?: CanvasFontStyle
  fontWeight?: CanvasFontWeight
  fontSize?: number
  fontFamily?: string
  margin?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

export const defaultBarcodeProps: DefaultProps<BarcodeProps> = {
  value: '',
  format: 'CODE128',
  width: 2,
  height: 100,
  color: '#000',
  background: '#fff',
  displayValue: true,
  textPosition: 'bottom',
  textAlign: 'center',
  textMargin: 5,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 14,
  fontFamily: 'monospace',
  margin: 10,
}

export interface BarcodeEmits {}
