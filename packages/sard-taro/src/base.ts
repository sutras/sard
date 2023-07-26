import { CSSProperties, ReactNode } from 'react'

export interface BaseProps {
  className?: string
  style?: CSSProperties & {
    [varName: string]: string | number | null | undefined
  }
  children?: ReactNode
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
export type AnyType = any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any
