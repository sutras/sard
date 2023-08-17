import { CSSProperties, ReactNode } from 'react'

export interface BaseProps {
  className?: string
  style?: CSSProperties & {
    [varName: string]: string | number | null | undefined
  }
  children?: ReactNode
  id?: string
}

export type PrimitiveType =
  | number
  | string
  | boolean
  | null
  | undefined
  | symbol
  | bigint

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type any = any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any
