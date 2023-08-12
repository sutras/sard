import { createContext } from 'react'
import { FormStore } from './createFormStore'

export interface FieldContextValue {
  formStore?: FormStore
  layout?: 'horizontal' | 'vertical'
  labelWidth?: number | string
  labelAlign?: 'left' | 'right'
  starPosition?: 'left' | 'right'
  disabled?: boolean
  readOnly?: boolean
}

const FieldContext = createContext<FieldContextValue>({
  layout: 'horizontal',
  labelAlign: 'left',
  starPosition: 'left',
})

export default FieldContext
