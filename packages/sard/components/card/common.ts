import { type DefaultProps } from '../config'

export interface CardProps {
  title?: string
  extra?: string
  footer?: string
  hover?: boolean
  hideHeaderBorder?: boolean
  hideFooterBorder?: boolean
  collapsible?: boolean
  collapsed?: boolean
}

export const defaultCardProps: DefaultProps<CardProps> = {}

export interface CardSlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  extra?(props: Record<string, never>): any
  arrow?(props: { collapsed: boolean }): any
  footer?(props: Record<string, never>): any
}

export interface CardEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:collapsed', collapsed: boolean): void
}
