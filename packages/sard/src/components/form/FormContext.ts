import { createContext } from 'react'
import FormStore from './FormStore'

const Context = createContext<FormStore>(null)

export default Context
