import { type DefaultProps } from '../config'

export type QrcodeECL = 'L' | 'M' | 'Q' | 'H'

export interface QrcodeProps {
  text?: string
  ecl?: QrcodeECL
  size?: string
  color?: string
  bgColor?: string
  quietZoneModules?: number
  icon?: string
}

export const defaultQrcodeProps: DefaultProps<QrcodeProps> = {
  ecl: 'M',
  size: '160px',
  text: '',
  color: '#000',
  bgColor: '#fff',
  quietZoneModules: 2,
}

export interface QrcodeSlots {}

export interface QrcodeEmits {}
