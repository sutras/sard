import { type DefaultProps } from '../config'

export interface ResultProps {
  status?: 'success' | 'info' | 'warning' | 'error' | 'question'
  title?: string
  description?: string
}

export const defaultResultProps: DefaultProps<ResultProps> = {
  status: 'info',
}

export interface ResultSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
}
