import { arrayEqual, getObjectValueInDepth, toArray } from '../utils'
import { NamePath } from './type'
import { useContext, useEffect } from 'react'
import StoreContext from './store/Context'
import { useForceRender } from '../use'

export function useInternalWatch(name?: NamePath[]) {
  const { subscribe } = useContext(StoreContext)

  const forceRender = useForceRender()

  useEffect(() => {
    let oldValues: any[] = []

    if (!name) {
      return
    }

    return subscribe((state) => {
      // 监听所有
      if (name.length === 0) {
        forceRender()
        return
      }

      const newValues = name.map((n) =>
        getObjectValueInDepth(state, toArray(n)),
      )
      if (!arrayEqual(oldValues, newValues)) {
        oldValues = newValues
        forceRender()
      }
    })
  }, [name])
}

export default useInternalWatch
