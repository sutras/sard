type PlainObject = Record<string, any>

// 判断是否为纯对象
export function isPlainObject(target: unknown): target is PlainObject {
  return Object.prototype.toString.call(target) === '[object Object]'
}

// 判断是否为函数
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(target: unknown): target is (...args: any[]) => any {
  return typeof target === 'function'
}

// 判断是否为字符串
export function isString(target: unknown): target is string {
  return typeof target === 'string'
}

// 判断是否为数值
export function isNumber(target: unknown): target is number {
  return typeof target === 'number'
}

// 判断是否为布尔值
export function isBoolean(target: unknown): target is boolean {
  return typeof target === 'boolean'
}

// 判断是否为undefined
export function isUndefined(target: unknown): target is number {
  return target === undefined
}

// 判断是否为null或者undefined
export function isNullish(target: unknown): target is null | undefined {
  return target === null || target === undefined
}

// 判断一个对象是否为非 ReactNode 类型
export function isNotReactNode(target: unknown) {
  return isPlainObject(target) && !('$$typeof' in (target as object))
}

// 判断一个对象是否为看得到的空
export function isVisibleEmpty(target: unknown) {
  return isNullish(target) || (isString(target) && target.trim() === '')
}

// 判断一个值是否为空
export function isEmptyValue(value: unknown, whitespace = true) {
  return (
    isNullish(value) ||
    value === '' ||
    (isString(value) && !whitespace && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0)
  )
}
