import { MutableRefObject, createContext } from 'react'
import { FormStore } from './createFormStore'
import { ScrollIntoViewOptions } from '../utils'

export interface FieldContextValue {
  formStore?: FormStore
  layout?: 'horizontal' | 'vertical'
  labelWidth?: number | string
  labelAlign?: 'start' | 'center' | 'end'
  labelValign?: 'start' | 'center' | 'end'
  starPosition?: 'left' | 'right'
  disabled?: boolean
  readOnly?: boolean
  contextId: string
  pageScrollTop: MutableRefObject<number>
  scrollIntoViewOptions?: ScrollIntoViewOptions
}

const FieldContext = createContext<FieldContextValue>({
  layout: 'horizontal',
  labelAlign: 'start',
  labelValign: 'start',
  starPosition: 'left',
} as FieldContextValue)

export default FieldContext
