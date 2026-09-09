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

/**
 * trunc 版本的 toFixed，避免四舍五入
 * @param num
 * @param decimals 小数位数
 */
export function truncToFixed(num: number, decimals = 0) {
  const n = Math.pow(10, decimals)
  return (Math.trunc(num * n) / n).toFixed(decimals)
}

/**
 * 通过添加单位缩写数字
 * @param num
 * @param decimals 小数位数
 * @param keepZero 是否保留为0时的小数部分
 */
export function abbrNumber(num: number, decimals = 1, keepZero = false) {
  // 处理异常情况：非数字、无穷大、NaN
  if (!isFinite(num)) {
    return '0'
  }

  // 定义单位阈值和对应的符号
  const units = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ]

  // 处理负数
  const isNegative = num < 0
  if (isNegative) {
    num = Math.abs(num)
  }

  // 遍历单位数组，找到第一个比当前数字小的单位
  let formattedNum = truncToFixed(num, decimals) // 默认值，用于小于1000的数字
  let selectedSymbol = ''

  for (let i = 0; i < units.length; i++) {
    if (num >= units[i].value) {
      // 进行换算并保留小数
      formattedNum = truncToFixed(num / units[i].value, decimals)
      selectedSymbol = units[i].symbol
      break
    }
  }

  // 处理小数部分为 .00 的情况，可以选择移除
  // 例如：将 '2.00K' 变为 '2K'
  if (!keepZero) {
    formattedNum = formattedNum.replace(/\.0+$/, '') // 移除末尾的.0
  }

  // 拼接负号和单位符号
  return (isNegative ? '-' : '') + formattedNum + selectedSymbol
}

let numberFormat: Intl.NumberFormat

/**
 * 将数字格式化为千分位格式
 * @param  num
 */
export function formatThousands(num: number = 0) {
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat('en-US', {
      style: 'decimal',
    })
  }
  return numberFormat.format(num)
}
