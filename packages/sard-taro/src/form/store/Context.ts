import { createContext } from 'react'
import { Store } from './createStore'

export const Context = createContext<Store>(null)

export default Context
