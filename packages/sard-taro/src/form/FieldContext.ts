import { createContext } from 'react'
import { FormStore } from './createFormStore'

export interface FieldContextValue {
  formStore?: FormStore
  layout?: 'horizontal' | 'vertical'
  labelWidth?: number | string
  labelAlign?: 'start' | 'center' | 'end'
  labelValign?: 'start' | 'center' | 'end'
  starPosition?: 'left' | 'right'
  disabled?: boolean
  readOnly?: boolean
}

const FieldContext = createContext<FieldContextValue>({
  layout: 'horizontal',
  labelAlign: 'start',
  labelValign: 'start',
  starPosition: 'left',
})

export default FieldContext
