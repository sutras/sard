import { createContext } from 'react'
import { FormInstance } from './FormStore'

export interface FormContextValue {
  formInstance?: FormInstance
  layout?: 'horizontal' | 'vertical'
  labelWidth?: number | string
  labelAlign?: 'left' | 'right'
  disabled?: boolean
  readOnly?: boolean
}

const FormContext = createContext<FormContextValue>({})

export default FormContext
