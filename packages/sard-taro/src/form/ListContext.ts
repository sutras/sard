import { createContext } from 'react'
import { FormInstance } from './FormStore'

export interface ListContextValue {
  formInstance?: FormInstance
  layout?: 'horizontal' | 'vertical'
  labelWidth?: number | string
  labelAlign?: 'left' | 'right'
  disabled?: boolean
  readOnly?: boolean
}

export const ListContext = createContext<ListContextValue>({})

export default ListContext
