import { createContext } from 'react'

interface OrderContextValue {
  index: number
  count: number
}

export const OrderContext = createContext<OrderContextValue>(null)
