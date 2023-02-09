import { useRef, useCallback } from 'react'

export function useMapSet<K, V>(initData: [K, V][]) {
  const data = useRef(initData)

  const getData = useCallback(() => {
    return data.current
  }, [])

  const get = useCallback((key: K) => {
    return data.current.find((item) => item[0] === key)?.[1]
  }, [])

  const getIndexByName = useCallback((name: K) => {
    return data.current.findIndex((item) => item[0] === name)
  }, [])

  const getIndexByValue = useCallback((value: V) => {
    return data.current.findIndex((item) => item[1] === value)
  }, [])

  const getKeyByIndex = useCallback((index) => {
    return data.current[index]?.[0]
  }, [])

  const getValueByIndex = useCallback((index) => {
    return data.current[index]?.[1]
  }, [])

  const set = useCallback((key: K, value: V) => {
    const item = data.current.find((item) => item[0] === key)
    if (!item) {
      data.current.push([key, value])
    } else {
      item[1] = value
    }
  }, [])

  const remove = useCallback((key: K) => {
    const index = data.current.findIndex((item) => item[0] === key)
    if (index !== -1) {
      data.current.splice(index, 1)
    }
  }, [])

  const clear = useCallback(() => {
    data.current.length = 0
  }, [])

  const ref = useRef({
    getData,
    get,
    set,
    remove,
    clear,
    getIndexByName,
    getIndexByValue,
    getKeyByIndex,
    getValueByIndex,
  })

  return ref.current
}

export default useMapSet
