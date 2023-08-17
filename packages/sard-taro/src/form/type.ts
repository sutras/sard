export type NodeName = string | number

export type NamePath = NodeName | NodeName[]

export type ValidateStatus = 'passed' | 'failed' | 'unvalidated'

export interface ValidateOptions {
  triggerName?: string
  validateOnly?: boolean
}

export interface FieldErrors {
  errors: string[]
  name: NodeName[]
}

export interface ErrorInfo {
  errorFields: FieldErrors[]
  values: Record<string, any>
}

export interface NodeData {
  errors?: string[]
  name?: NamePath
  value?: any
}
