import { FC } from 'react'
import {
  InternalCheckGroupProps,
  useInternalCheckGroup,
} from '../use/useInternalSelect'

export type RadioGroupProps = InternalCheckGroupProps<'single'>

export const RadioGroup: FC<RadioGroupProps> = (props) => {
  return useInternalCheckGroup('single', props)
}

export default RadioGroup
