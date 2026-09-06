import { type DefaultProps } from '../config'

export type FlexGap = 'small' | 'medium' | 'large'
export type FlexAlign = 'start' | 'end' | 'center' | 'baseline'
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
export type FlexDirection = 'column' | 'row' | 'column-reverse' | 'row-reverse'

export interface FlexProps {
  direction?: FlexDirection
  vertical?: boolean
  gap?: FlexGap | (string & {})
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: boolean
  flex?: string
}

export const flexGap = ['small', 'medium', 'large']

export const defaultFlexProps: DefaultProps<FlexProps> = {}

export interface FlexSlots {
  default?(props: Record<string, never>): any
}
