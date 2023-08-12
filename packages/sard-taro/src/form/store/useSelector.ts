import { useContext, useLayoutEffect, useRef } from 'react'
import Context from './Context'
import { useForceRender } from '../../use'
import { AnyType } from '../../base'
import { Store } from './createStore'

interface Selector<S> {
  (state: AnyType): S
}

export function useSelectorWithStoreAndSubscription<S>(
  getState,
  subscribe,
  selector: Selector<S>,
) {
  const latestSelector = useRef<AnyType>()
  const latestStoreState = useRef<S>()

  const forceRender = useForceRender()

  useLayoutEffect(() => {
    latestSelector.current = selector
  })

  if (selector !== latestSelector.current) {
    latestStoreState.current = selector(getState())
  }

  useLayoutEffect(() => {
    return subscribe(() => {
      const storeState = getState()
      const nextSelectedState = latestSelector.current(storeState)

      if (nextSelectedState === latestStoreState.current) {
        return
      }

      latestStoreState.current = nextSelectedState

      forceRender()
    })
  }, [])

  return latestStoreState.current
}

function createSelectorHook() {
  return function useSelector<S>(selector: Selector<S>, externalStore?: Store) {
    const store = useContext(Context)

    const { getState, subscribe } = externalStore || store

    const selectedState = useSelectorWithStoreAndSubscription(
      getState,
      subscribe,
      selector,
    )

    return selectedState
  }
}

export const useSelector = createSelectorHook()
