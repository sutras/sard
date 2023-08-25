import { FC } from 'react'
import { RadioGroup } from './Group'
import { InternalCheckProps, useInternalCheck } from '../use/useInternalCheck'

export * from './Group'

export type RadioProps = InternalCheckProps

export interface RadioFC extends FC<RadioProps> {
  Group: typeof RadioGroup
}

export const Radio = ((props) => {
  return useInternalCheck('single', 'radio', props)
}) as RadioFC

Radio.Group = RadioGroup

export default Radio
