import { createContext } from 'react'
import { Store } from './createStore'

export const Context = createContext<Store>({} as Store)

export default Context
