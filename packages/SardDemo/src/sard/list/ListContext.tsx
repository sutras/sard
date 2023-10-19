import { CSSProperties, createContext } from 'react'

export interface ListContextValue {
  inset?: boolean
  bodyStyle?: CSSProperties
  bodyClass?: string
  footerStyle?: CSSProperties
  footerClass?: string
}

export const ListContext = createContext<ListContextValue>({})
