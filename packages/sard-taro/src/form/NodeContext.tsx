import { ReactNode, createContext } from 'react'
import { FormNode } from './useNode'

export const NodeContext = createContext<FormNode>(null)

export interface NodeProviderProps {
  children?: ReactNode
  node: FormNode
}

export const NodeProvider = (props: NodeProviderProps) => {
  const { children, node } = props

  return <NodeContext.Provider value={node}>{children}</NodeContext.Provider>
}
