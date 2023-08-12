import { AnyType } from '../base'

export type NodeName = string | number

export type NamePath = NodeName | NodeName[]

export type ValidateStatus = 'passed' | 'failed' | 'unvalidated'

export interface ValidateOptions {
  triggerName?: string
  validateOnly?: boolean
}

export interface FieldError {
  errors: string[]
  name: NodeName[]
}

export interface ErrorInfo {
  errorFields: FieldError[]
  values: Record<string, AnyType>
}

export interface NodeData {
  errors?: string[]
  name?: NamePath
  value?: AnyType
}
