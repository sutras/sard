/**
 * 实现了 Map 的部分接口，另外，还增加了与下标相关的一些方法。
 */

import { useMemo } from 'react'

export class IndexableMap<K, V> {
  data: [K, V][]

  constructor(initialData: [K, V][] = []) {
    this.data = initialData
  }

  get size() {
    return this.data.length
  }

  get(key: K) {
    return this.data.find((item) => item[0] === key)?.[1]
  }

  set(key: K, value: V) {
    const item = this.data.find((item) => item[0] === key)
    if (!item) {
      this.data.push([key, value])
    } else {
      item[1] = value
    }
  }

  delete(key: K) {
    const index = this.data.findIndex((item) => item[0] === key)
    if (index !== -1) {
      this.data.splice(index, 1)
    }
  }

  clear() {
    this.data.length = 0
  }

  keys() {
    return this.data.map((item) => item[0])
  }

  values() {
    return this.data.map((item) => item[1])
  }

  forEach(callback: (value: V, key: K, self: IndexableMap<K, V>) => void) {
    this.data.forEach((item) => {
      callback(item[1], item[0], this)
    })
  }

  entries() {
    return this.data
  }

  getIndexByKey(key: K) {
    return this.data.findIndex((item) => item[0] === key)
  }

  getIndexByValue(value: V) {
    return this.data.findIndex((item) => item[1] === value)
  }

  getKeyByIndex(index) {
    return this.data[index]?.[0]
  }

  getValueByIndex(index) {
    return this.data[index]?.[1]
  }
}

export function useIndexableMap<K, V>(initData: [K, V][]) {
  return useMemo(() => {
    return new IndexableMap(initData)
  }, [])
}

export default useIndexableMap
