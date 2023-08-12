import { useContext } from 'react'
import Context from './Context'
import { Store } from './createStore'

function createDispatchHook() {
  return function useDispatch(externalStore?: Store) {
    const store = useContext(Context)
    const { dispatch } = externalStore || store

    return dispatch
  }
}

export const useDispatch = createDispatchHook()
