import { useContext, useMemo } from 'react'
import FieldContext from './FieldContext'
import { FormStore, HOOK_KEY } from './createFormStore'
import { NamePath } from './type'
import { getObjectValueInDepth, toArray } from '../utils'
import { useSelectorWithStoreAndSubscription } from './store/useSelector'

export function useWatch(name: NamePath | [], form?: FormStore) {
  const { formStore: contextFormStore } = useContext(FieldContext)
  const formStore = form || contextFormStore

  if (!formStore) {
    return
  }

  const {
    store: { getState, subscribe },
  } = formStore.getInternalHooks(HOOK_KEY)

  const selector = useMemo(() => {
    return (state) => {
      name = toArray(name)
      if (name.length === 0) {
        return state
      }
      return getObjectValueInDepth(state, name)
    }
  }, [name])

  return useSelectorWithStoreAndSubscription(getState, subscribe, selector)
}

export default useWatch
