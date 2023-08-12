import { createContext } from 'react'

interface OrderContextValue {
  index: number
  count: number
}

export const OrderContext = createContext<OrderContextValue>({
  index: 0,
  count: 0,
})
