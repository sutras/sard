export interface NavbarProps {
  title?: string
  flow?: boolean
  showBack?: boolean
  backText?: string
  fixed?: boolean
  statusBar?: boolean
  showDivider?: boolean
}

export interface NavbarSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  start?(props: Record<string, never>): any
  end?(props: Record<string, never>): any
}

export interface NavbarEmits {
  (e: 'back', event: any): void
}

export interface NavbarItemProps {
  reverse?: boolean
}

export interface NavbarItemSlots {
  default?(): any
  icon?(): any
}

export interface NavbarItemEmits {
  (e: 'click', event: MouseEvent): void
}
