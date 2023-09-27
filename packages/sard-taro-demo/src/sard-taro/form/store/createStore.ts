export type Store<S = Record<string, any>> = ReturnType<typeof createStore<S>>

export default function createStore<S = any>(reducer, preloadedState) {
  let currentState = preloadedState
  const currentReducer = reducer
  const currentListeners: ((state: any) => void)[] = []

  function getState(): S {
    return currentState
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action)

    for (const listener of currentListeners) {
      listener(currentState)
    }
  }

  function subscribe(listener) {
    currentListeners.push(listener)

    return () => {
      const index = currentListeners.indexOf(listener)
      if (index !== -1) {
        currentListeners.splice(index, 1)
      }
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}
