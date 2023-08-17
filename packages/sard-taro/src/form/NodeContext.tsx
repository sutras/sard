import { createContext, useContext } from 'react'
import { FormNode } from './useNode'

export const NodeContext = createContext<FormNode>(null)

export interface DescendantContextValue {
  validateTrigger?: string | string[]
  validateFirst?: boolean
}
export const DescendantContext = createContext<DescendantContextValue>(null)

export function useDescendant(options: DescendantContextValue) {
  const { validateFirst, validateTrigger } = options
  const descendantInfo = useContext(DescendantContext)

  const {
    validateTrigger: formValidateTrigger,
    validateFirst: formValidateFirst,
  } = descendantInfo

  const mergedValidateFirst = validateFirst || formValidateFirst
  const mergedValidateTrigger = validateTrigger || formValidateTrigger

  return {
    mergedValidateFirst,
    mergedValidateTrigger,
  }
}
