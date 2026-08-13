import { isNumber, isObject, isPlainObject } from './is'

/**
 * @description: 判断一个对象是否为看得到的空
 * @param {any} target
 * @return {boolean}
 */
export function isVisibleEmpty(target: any): boolean {
  return (
    target === null || target === undefined || (typeof target === 'string' && target.trim() === '')
  )
}

/**
 * @description: 判断一个值是否为空
 * @param {any} value
 * @return {boolean}
 */
export function isEmptyValue(value: any, whitespace = true) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (typeof value === 'string' && !whitespace && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0)
  )
}
/**
 * @description: 判断一个值渲染到DOM中时是否可见
 * @param {any} value
 * @return {boolean}
 */
export function isRenderVisible(value: any) {
  return value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '')
}

/**
 * @description: 判断是否绑定为空值
 * @param {any} target
 * @return {boolean}
 */
export function isEmptyBinding(target: any): target is '' | null | undefined {
  return target === null || target === undefined || target === ''
}

export interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  options: DebounceOptions = {},
) {
  let lastArgs: any[] | undefined
  let maxWait = 0
  let result: ReturnType<T>
  let timerId: ReturnType<typeof setTimeout> | undefined
  let lastCallTime: number | undefined
  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time: number) {
    const args = lastArgs || []

    lastInvokeTime = time
    result = func(...args)
    return result
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime!
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  function shouldInvoke(time: number) {
    if (lastCallTime === undefined) return true

    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time: number) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function debounced(...args: any[]) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId)
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  options: DebounceOptions = {},
) {
  let leading = true
  let trailing = true

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
export function getPageRange(current: number, pageCount: number, pageItemCount: number): number[] {
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

/**
 * @description: 将一个可选单位的字符串或数值拆分为数值和单位组成的数组
 * @param {number | string} target
 * @return {[number, string]}
 */
export function splitUnit(target: number | string) {
  const result = /([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z]+|%|)$/i.exec(String(target)) || [
    0,
    '',
  ]

  return [+result[1], result[2]] as [number, string]
}

export function addUnit(value: number | string) {
  return value && (isNumber(value) || /\d$/.test(value)) ? value + 'px' : value
}

export const noop = () => {}

export async function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, time)
  })
}
