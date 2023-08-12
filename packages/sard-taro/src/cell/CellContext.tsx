import { CSSProperties, createContext } from 'react'

export interface CellContextValue {
  inset?: boolean
  bodyStyle?: CSSProperties
  bodyClass?: string
  footerStyle?: CSSProperties
  footerClass?: string
}

export const CellContext = createContext<CellContextValue>({})
