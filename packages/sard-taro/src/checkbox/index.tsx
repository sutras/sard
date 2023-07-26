import { FC } from 'react'
import { CheckboxGroup } from './Group'
import { InternalCheckProps, useInternalCheck } from '../use/useInternalCheck'

export * from './Group'

export type CheckboxProps = InternalCheckProps

export interface CheckboxFC extends FC<CheckboxProps> {
  Group: typeof CheckboxGroup
}

export const Checkbox: CheckboxFC = (props) => {
  return useInternalCheck('multiple', 'checkbox', props)
}

Checkbox.Group = CheckboxGroup

export default Checkbox
