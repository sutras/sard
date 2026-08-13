import { type DefaultProps } from '../config'

export type SpaceSize = 'small' | 'medium' | 'large'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'
export type SpaceJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'

export interface SpaceProps {
  direction?: 'vertical' | 'horizontal'
  size?: SpaceSize | (string & {})
  align?: SpaceAlign | (string & {})
  justify?: SpaceJustify | (string & {})
  wrap?: boolean
}

export const spaceSizes = ['small', 'medium', 'large']

export const spaceMapAlign: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
}

export const spaceMapJustify: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

export const defaultSpaceProps: DefaultProps<SpaceProps> = {
  direction: 'horizontal',
  size: 'medium',
}

export interface SpaceSlots {
  default?(props: Record<string, never>): any
}
