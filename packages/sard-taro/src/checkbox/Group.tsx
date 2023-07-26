import { FC } from 'react'
import {
  InternalCheckGroupProps,
  useInternalCheckGroup,
} from '../use/useInternalCheck'

export type CheckboxGroupProps = InternalCheckGroupProps<'multiple'>

export const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  return useInternalCheckGroup('multiple', 'checkbox', props)
}

export default CheckboxGroup
