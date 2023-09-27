import { FC, ReactNode } from 'react'
import { useNode } from './useNode'
import { NamePath, NodeName, ValidateStatus } from './type'
import { Rule } from './Validator'
import { NodeContext, useDescendant } from './NodeContext'
import useInternalWatch from './useInternalWatch'

export interface FormMapProps {
  children?: ReactNode
  name: NodeName
  initialValue?: Record<string, any>

  required?: boolean

  label?: ReactNode
  rules?: Rule[]
  validateFirst?: boolean
  validateTrigger?: string | string[]
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
    validateTrigger,
    validateStatus,
    watch,
  } = props

  const { mergedValidateFirst } = useDescendant({
    validateFirst,
    validateTrigger,
  })

  useInternalWatch(watch)

  const [node] = useNode({
    type: 'map',
    name,
    label,
    initialValue,
    rules,
    validateFirst: mergedValidateFirst,
    validateStatus,
    required,
  })

  return <NodeContext.Provider value={node}>{children}</NodeContext.Provider>
}

export default FormMap
