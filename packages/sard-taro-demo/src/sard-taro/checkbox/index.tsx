import { FC } from 'react'
import { CheckboxGroup } from './Group'
import { InternalCheckProps, useInternalSelect } from '../use/useInternalSelect'

export * from './Group'

export type CheckboxProps = InternalCheckProps

export interface CheckboxFC extends FC<CheckboxProps> {
  Group: typeof CheckboxGroup
}

export const Checkbox = ((props) => {
  return useInternalSelect('multiple', 'checkbox', props)
}) as CheckboxFC

Checkbox.Group = CheckboxGroup

export default Checkbox
