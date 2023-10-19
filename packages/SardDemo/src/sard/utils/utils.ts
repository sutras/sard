import classNames from 'classnames'
import { ReactElement } from 'react'
import { isPlainObject, isFunction, isNullish, isRN } from './is'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

/**
 * @description: 确保目标是一个数组
 * @param target 目标对象
 * @return 原数组或新的数组
 */
export function toArray(target: any) {
  return Array.isArray(target) ? target : [target]
}

/**
 * @description: 限定数值范围
 * @param {number} n 被限定的值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number} 限定后的值
 */
export function minmax(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n
}

/**
 * @description: 获取小数位数
 * @param {number | string} n 要操作的数值
 * @return {number}
 */
export function getDecimalsLength(n: number | string) {
  n = n.toString().split('.')[1]
  return n ? n.length : 0
}

/**
 * @description: 把一个数四舍五入到指定位数小数
 * @param {number} n 要操作的数值
 * @param {number} precision 精准度，即小数个数
 * @return {number}
 */
export function round(n: number, precision = 0) {
  return Math.round(+(n + 'e' + precision)) / 10 ** precision
}

/**
 * @description: 把一个数舍入到指定数的倍数
 * @param {number} n 要舍入的数值
 * @param {number} m 结果值的因数
 * @return {number}
 */
export function mround(n: number, m: number) {
  return round(n - (n % m) + Math.round((n % m) / m) * m, getDecimalsLength(m))
}

/**
 * @description: 生成唯一ID，用于设置元素的ID，以便获取
 * @param {string} prefix
 * @return {string}
 */
export function uniqid(prefix = '__sar_') {
  return prefix + (~~(Math.random() * 10e8)).toString(36)
}

/**
 * @description: 回流
 * @param {HTMLElement} el
 * @return {void}
 */
export function reflow(el: HTMLElement) {
  el.offsetHeight
}

/**
 * @description: 获取阻尼值
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {number} damping
 * @return {number}
 */
export function getDampingValue(
  value: number,
  min: number,
  max: number,
  damping: number,
) {
  if (value < min) {
    return min + (value - min) * damping
  }
  if (value > max) {
    return max + (value - max) * damping
  }
  return value
}

/**
 * @description: 获取矩形阻尼值
 * @param {number} offset 当前的偏移量
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @param {number} damping 阻尼系数
 * @return {number}
 */
export function getRectDampingValue(
  offset: number,
  areaSize: number,
  viewSize: number,
  damping: number,
) {
  const diff = areaSize - viewSize
  let min, max
  if (diff < 0) {
    min = diff
    max = 0
  } else {
    min = 0
    max = diff
  }
  return getDampingValue(offset, min, max, damping)
}
/**
 * @description: 获取范围值
 * @param {number} offset 当前的偏移量
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @return {number}
 */
export function getInBoundValue(
  offset: number,
  areaSize: number,
  viewSize: number,
) {
  const diff = areaSize - viewSize
  const [min, max] = [0, diff].sort((a, b) => a - b)
  return minmax(offset, min, max)
}

/**
 * @description: 获取溢出值范围
 * @param {number} overflow 最大溢出值
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @return {*}
 */
export function getOverflowRangeInArea(
  overflow: number,
  areaSize: number,
  viewSize: number,
): [number, number] {
  if (areaSize > viewSize) {
    return [-overflow, areaSize + overflow]
  } else {
    return [areaSize - viewSize - overflow, overflow]
  }
}

/**
 * @description: 扩散性遍历
 * @param array 要遍历的数组
 * @param callback 回调函数，接收当前元素、扩散性下标、迭代下标作为参数，
 *  如果返回true，则中止遍历
 * @param currIndex 遍历开始的下标
 * @param direction 开始遍历的方向
 * @return 扩散性下标、或开始下标
 */
export function spreadEach(
  array: any[],
  callback: (el: any, spreadIndex: number, index: number) => any,
  startIndex = 0,
  direction = -1,
) {
  const len = array.length
  let spreadIndex = startIndex
  let edge = 0
  direction = -direction
  for (let i = 0; i < len; i++) {
    if (edge < 0) {
      spreadIndex = len - 1 - i
    } else if (edge > 0) {
      spreadIndex = i
    } else {
      spreadIndex = spreadIndex + direction * i
      edge = spreadIndex === 0 ? 1 : spreadIndex === len - 1 ? -1 : 0
      direction = -direction
    }

    if (isFunction(callback)) {
      if (callback(array[spreadIndex], spreadIndex, i)) {
        return spreadIndex
      }
    }
  }
  return startIndex
}

/**
 * @description: 克隆对象
 * @param {any} target
 * @return {any}
 */
export function deepClone(target: any): any {
  if (Array.isArray(target)) {
    return target.map((item) => {
      return deepClone(item)
    })
  }
  if (isPlainObject(target)) {
    const obj: Record<string, any> = {}
    Object.keys(target).forEach((k) => {
      obj[k] = deepClone(target[k])
    })
    return obj
  }
  return target
}

/**
 * @description: 深度合并其他对象到第一个对象
 * @param {any[]} args
 * @return {any} 第一个对象
 */
export function deepMerge(...args: any[]) {
  const target = args[0],
    l = args.length

  let i = 1,
    options,
    name,
    src,
    copy,
    copyIsArray,
    clone

  for (; i < l; i++) {
    options = args[i]
    if (!isNullish(options)) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止有环
        if (target === copy) {
          continue
        }

        // 深复制
        if (isPlainObject(copy) || (copyIsArray = Array.isArray(copy))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = Array.isArray(src) ? src : []
          } else {
            clone = isPlainObject(src) ? src : {}
          }

          target[name] = deepMerge(clone, copy)

          // 不添加未定义的值
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

export interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}
export function debounce(
  func: (...args: any[]) => any,
  wait: number,
  options: DebounceOptions = {},
) {
  let lastArgs: any[] | undefined,
    lastThis: any | undefined,
    maxWait: number | undefined,
    result: any,
    timerId: number | undefined,
    lastCallTime: number | undefined

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF = !wait && wait !== 0 && isFunction(requestAnimationFrame)

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isPlainObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing
      ? Math.max(+(options.maxWait as number) || 0, wait)
      : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function startTimer(pendingFunc: FrameRequestCallback, wait: number) {
    if (useRAF) {
      cancelAnimationFrame(timerId as number)
      return requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  function cancelTimer(id: number) {
    if (useRAF) {
      return cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  function leadingEdge(time: number) {
    // Reset unknown `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait as number))
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time: number) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(...args: any[]) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

export function throttle(
  func: (...args: any[]) => any,
  wait: number,
  options: DebounceOptions = {},
) {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (isPlainObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  })
}

/**
 * @description: 获取页面范围
 * @param {number} current 当前页码
 * @param {number} pageCount 总页数
 * @param {number} pageItemCount 要展示的页数
 * @return {[number, number]}
 */
export function getPageRange(
  current: number,
  pageCount: number,
  pageItemCount: number,
) {
  let min = current - Math.ceil((pageItemCount - 1) / 2)
  let max = current + Math.floor((pageItemCount - 1) / 2)
  const minLack = 1 - min
  const maxLack = max - pageCount
  if (maxLack > 0) {
    min -= maxLack
  }
  if (min < 1) {
    min = 1
  }
  if (minLack > 0) {
    max += minLack
  }
  if (max > pageCount) {
    max = pageCount
  }

  return [min, max]
}

export function treeToMap(
  tree: object[],
  keyName: string,
  childrenName: string,
  parentName: string,
) {
  const map: {
    [key: PropertyKey]: object
  } = {}

  function recurse(children: object[], parent: object | null) {
    children.forEach((node) => {
      map[node[keyName]] = node
      node[parentName] = parent
      if (Array.isArray(node[childrenName])) {
        recurse(node[childrenName], node)
      }
    })
  }
  recurse(tree, null)
  return map
}

/**
 * 如果 subProps 指定属性为 null 或 undefined， 则从 parentProps 中提取
 */
export function pickNonNullish<T extends string>(
  parentProps: Record<T, any>,
  subProps: Record<string, any>,
) {
  return Object.keys(parentProps).reduce((result, prop) => {
    result[prop] = subProps[prop] ?? parentProps[prop]
    return result
  }, {} as Record<T, any>)
}

export function pickContextNullish<T extends string>(
  props: Record<T, any>,
  contextProps: Record<string, any>,
) {
  return Object.keys(props).reduce((result, prop) => {
    result[prop] = props[prop] ?? contextProps[prop]
    return result
  }, {} as Record<T, any>)
}

/**
 * @description 打乱数组
 * @param arr 要打乱的数组
 * @param inPlace 是否改变原数组
 */
export function shuffle(arr: any[], inPlace = false) {
  if (!inPlace) {
    arr = arr.slice()
  }
  const len = arr.length
  for (let i = len - 1; i >= 0; i--) {
    const randomIndex = ~~(Math.random() * (i + 1))
    const temp = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = temp
  }
  return arr
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}
/**
 * @description: 根据原始坐标尺寸和缩放后的坐标尺寸算出转换的原点
 * @param {Rect} rect
 * @param {Rect} scaleRect
 * @return {[number, number]}
 */
export function getTransformOrigin(rect: Rect, scaleRect: Rect) {
  const ratio = scaleRect.width / rect.width
  const originX =
    (rect.x + rect.width / 2 - scaleRect.x - scaleRect.width / 2) /
      (ratio - 1) +
    rect.width / 2
  const originY =
    (rect.y + rect.height / 2 - scaleRect.y - scaleRect.height / 2) /
      (ratio - 1) +
    rect.height / 2
  return [originX, originY]
}

/**
 * @description: 将一个可选单位的字符串或数值拆分为数值和单位组成的数组
 * @param {number | string} target
 * @return {[number, string]}
 */
export function splitUnit(target: number | string) {
  const result = /([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z]+|%|)$/i.exec(
    String(target),
  ) || [0, '']

  return [+result[1], result[2]] as [number, string]
}

/**
 * @description: 确保接收 children 为 ReactElement 数组
 * @param {number | string} target
 * @return {[number, string]}
 */
export function toElementArray(children: ReactElement | ReactElement[]) {
  if (Array.isArray(children)) {
    return children
  }
  return [children]
}

/**
 * @description: 自定义 transitionEnd 事件
 * @param {function} callback 结束后的回调
 * @param {number} duration 结束的时间
 * @return {{}}
 */
export function transitionEnd(
  callback: (...args: any[]) => any,
  duration = 300,
) {
  let timer = 0

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
  }

  const start = () => {
    clear()

    timer = window.setTimeout(() => {
      timer = 0
      callback()
    }, duration)
  }

  const finish = () => {
    if (timer) {
      clear()
      callback()
    }
  }

  start()

  return {
    clear,
    finish,
  }
}

/**
 * @description: 合并多个 props，非指定（第一个数组参数）的函数属性会合并调用，
 *  className 和 style 也会合并，其他则直接替换
 * @param {array} args
 * @return {*}
 */
export function mergeProps(...args: any[]) {
  const l = args.length

  let target = args[0],
    i = 1,
    options,
    name: string,
    src,
    copy,
    ignore: string[] | undefined

  if (Array.isArray(target)) {
    target = args[1]
    i = 2
    ignore = target
  }

  for (; i < l; i++) {
    options = args[i]
    if (!isNullish(options)) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止有环
        if (target === copy) {
          continue
        }

        if (ignore && ignore.includes(name)) {
          target[name] = copy
          continue
        }

        if (isFunction(src)) {
          if (isFunction(copy)) {
            const srcRef = src
            const copyRef = copy
            target[name] = (...args) => {
              srcRef(...args)
              copyRef(...args)
            }
          }
        } else if (name === 'className') {
          target[name] = classNames(src, copy)
        } else if (name === 'style') {
          target[name] = Object.assign({}, src, copy)
        } else {
          target[name] = copy
        }
      }
    }
  }

  return target
}

// 链式获取对象值（字符串方式）
export function chainSelect(object, chain?: string) {
  let target = object

  if (chain) {
    for (const link of chain.split('.')) {
      if (target && typeof target === 'object') {
        target = target[link]
      } else {
        return target
      }
    }
  }

  return target
}

// 深度获取对象的值
export function getObjectValueInDepth(object, keys: (string | number)[]) {
  return keys.reduce((object, key) => {
    return object?.[key]
  }, object)
}

// 重新排列数组元素的顺序
export function arrayMove(array: any[], fromIndex: number, toIndex: number) {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    fromIndex >= array.length ||
    toIndex < 0 ||
    toIndex >= array.length
  ) {
    return array
  }

  const element = array.splice(fromIndex, 1)[0]
  array.splice(toIndex, 0, element)
  return array
}

// 删除数组中指定下标的元素，此函数会修改数组使其保存相同的引用
export function arrayRemoveAtIndexes(arr: any[], indexes: number[]) {
  indexes = indexes.sort((a, b) => b - a)
  for (const index of indexes) {
    if (index > -1 && index < arr.length) {
      arr.splice(index, 1)
    }
  }
  return arr
}

// 判断两数组的每个元素是否相等
export function arrayEqual(arr1: any[], arr2: any[]) {
  return arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i])
}

// 将嵌套数据结构转换为多维数组
export function nestedToMulti(
  nested: any[],
  values: (number | string)[],
  fieldKeys: {
    value: string
    children: string
  },
) {
  const columns: any[] = []

  function recurse(list, index = 0) {
    columns.push(list)
    const selectedValue = values[index]
    let selectedOption = list.find(
      (option) => option[fieldKeys.value] === selectedValue,
    )
    if (!selectedOption) {
      selectedOption = list[0]
    }
    if (selectedOption) {
      const nextList = selectedOption[fieldKeys.children]
      if (Array.isArray(nextList)) {
        recurse(nextList, ++index)
      }
    }
  }

  recurse(nested)

  return columns
}

// 过滤对象中值为非空的属性
export function filterNullish(object: Record<PropertyKey, any>) {
  return Object.keys(object).reduce((obj, key) => {
    const value = object[key]
    if (!isNullish(value)) {
      obj[key] = value
    }
    return obj
  }, {})
}

// 在web端（包括小程序）添加px单位
export function addPxInWeb(value?: number) {
  return isNullish(value) || isRN ? value : value + 'px'
}
