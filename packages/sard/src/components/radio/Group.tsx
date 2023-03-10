import { FC } from 'react'
import {
  InternalCheckGroupProps,
  useInternalCheckGroup,
} from '../../use/useInternalCheck'

export interface RadioGroupProps extends InternalCheckGroupProps<'single'> {}

export const RadioGroup: FC<RadioGroupProps> = (props) => {
  return useInternalCheckGroup('single', 'radio', props)
}

export default RadioGroup
