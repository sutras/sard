import { FC, ReactNode } from 'react'
import { AnyType } from '../base'
import { useNode } from './useNode'
import { NamePath, NodeName, ValidateStatus } from './type'
import { Rule } from './Validator'
import { NodeContext } from './NodeContext'
import useInternalWatch from './useInternalWatch'

export interface FormMapProps {
  children?: ReactNode
  name: NodeName
  initialValue?: Record<string, AnyType>

  required?: boolean

  label?: ReactNode
  rules?: Rule[]
  validateFirst?: boolean
  validateStatus?: ValidateStatus

  watch?: NamePath[]
}

export const FormMap: FC<FormMapProps> = (props) => {
  const {
    children,
    required,
    name,
    label,
    initialValue,
    rules,
    validateFirst,
    validateStatus,
    watch,
  } = props

  useInternalWatch(watch)

  const [node] = useNode({
    type: 'map',
    name,
    label,
    initialValue,
    rules,
    validateFirst,
    validateStatus,
    required,
  })

  return <NodeContext.Provider value={node}>{children}</NodeContext.Provider>
}

export default FormMap
