import { createContext } from 'react'

interface OrderContextValue {
  index: number
  count: number
  card: boolean
}

export const OrderContext = createContext<OrderContextValue>({
  index: 0,
  count: 0,
  card: false,
})
