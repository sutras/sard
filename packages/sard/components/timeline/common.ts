export interface TimelineProps {}

export interface TimelineSlots {
  default?(props: Record<string, never>): any
}

export interface TimelineItemProps {
  title?: string
  time?: string
}

export interface TimelineItemSlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  time?(props: Record<string, never>): any
}
