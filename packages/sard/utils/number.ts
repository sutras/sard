/**
 * 限定数值范围
 */
export function clamp(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n
}

/**
 * 把一个数四舍五入到指定位数小数。
 */
export function round(n: number, precision = 0): number {
  const factor = 10 ** precision
  return Math.round(n * factor) / factor
}

/**
 * 获取小数位数
 */
export function getDecimalsLength(n: number | string): number {
  n = n.toString().split('.')[1]
  return n ? n.length : 0
}

/**
 * 把一个数舍入到指定数的倍数
 */
export function mround(n: number, m: number): number {
  return round(n - (n % m) + Math.round((n % m) / m) * m, getDecimalsLength(m))
}

/**
 * 生成两数间的一个随机整数
 */
export function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * 判断一个数是否在指定范围内。
 */
export function inRange(n: number, min: number, max: number) {
  return n > min && n < max
}

/**
 * 尝试解析为数字，如果该值无法被 parseFloat() 处理，那么将返回原始值
 */
export function looseToNumber(val: any): any {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? val : n
}

/**
 * 将任意字符的字符串格式化为数字字符串，可以指定是否允许小数和负数
 */
export function formatNumber(value: string, allowDot = true, allowMinus = true): string {
  value = value.trim().replace(/[^-0-9.]/g, '')

  if (!value) return ''

  if (allowDot) {
    const index = value.indexOf('.')
    value = index === -1 ? value : value.slice(0, index + 1) + value.slice(index).replace(/\./g, '')
  } else {
    value = value.split('.')[0]
  }

  if (allowMinus) {
    value = value[0] + value.slice(1).replace(/-/g, '')
  } else {
    value = value.replace(/-/g, '')
  }

  return value
}
