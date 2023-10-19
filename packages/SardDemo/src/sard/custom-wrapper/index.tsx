import { ReactNode } from 'react'
import { CustomWrapper as TaroCustomWrapper } from '@tarojs/components'
import { isMP } from '../utils'

interface CustomWrapperProps {
  id?: string
  children?: ReactNode
}

const SelfCustomWrapper = (props: CustomWrapperProps) => {
  return <>{props.children}</>
}

export const CustomWrapper = isMP ? TaroCustomWrapper : SelfCustomWrapper
export default CustomWrapper
