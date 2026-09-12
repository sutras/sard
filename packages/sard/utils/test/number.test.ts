import { describe, expect, test } from 'vitest'
import {
  compactNumber,
  clamp,
  formatNumber,
  formatThousands,
  getDecimalsLength,
  inRange,
  looseToNumber,
  mround,
  random,
  round,
  truncToFixed,
} from '../number'

describe('clamp', () => {
  test('范围内返回原值', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  test('小于最小值时取最小值', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  test('大于最大值时取最大值', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })
})

describe('round', () => {
  test('默认保留整数', () => {
    expect(round(1.5)).toBe(2)
  })

  test('保留指定位数小数', () => {
    expect(round(1.234, 2)).toBe(1.23)
    expect(round(1.2345, 3)).toBe(1.235)
  })

  test('负数四舍五入', () => {
    expect(round(-1.5)).toBe(-1)
  })
})

describe('getDecimalsLength', () => {
  test('获取小数位数', () => {
    expect(getDecimalsLength(1.23)).toBe(2)
    expect(getDecimalsLength('1.234')).toBe(3)
  })

  test('整数返回 0', () => {
    expect(getDecimalsLength(1)).toBe(0)
    expect(getDecimalsLength('1')).toBe(0)
  })
})

describe('mround', () => {
  test('舍入到指定数的倍数', () => {
    expect(mround(13, 5)).toBe(15)
    expect(mround(12, 5)).toBe(10)
  })

  test('已是倍数时保持不变', () => {
    expect(mround(10, 5)).toBe(10)
  })
})

describe('random', () => {
  test('生成指定范围内的整数', () => {
    for (let i = 0; i < 100; i++) {
      const n = random(0, 10)
      expect(Number.isInteger(n)).toBe(true)
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThanOrEqual(10)
    }
  })

  test('上下限相同时返回该值', () => {
    expect(random(5, 5)).toBe(5)
  })
})

describe('inRange', () => {
  test('范围内返回 true', () => {
    expect(inRange(5, 0, 10)).toBe(true)
  })

  test('边界值返回 false', () => {
    expect(inRange(0, 0, 10)).toBe(false)
    expect(inRange(10, 0, 10)).toBe(false)
  })

  test('范围外返回 false', () => {
    expect(inRange(15, 0, 10)).toBe(false)
  })
})

describe('looseToNumber', () => {
  test('纯数字字符串转为数字', () => {
    expect(looseToNumber('12')).toBe(12)
  })

  test('带单位的字符串取前导数字', () => {
    expect(looseToNumber('12px')).toBe(12)
  })

  test('无法解析时返回原始值', () => {
    expect(looseToNumber('abc')).toBe('abc')
    expect(looseToNumber('')).toBe('')
  })
})

describe('formatNumber', () => {
  test('过滤非法字符', () => {
    expect(formatNumber('12abc')).toBe('12')
  })

  test('保留第一个小数点并去除其余', () => {
    expect(formatNumber('1.2.3')).toBe('1.23')
  })

  test('允许小数和负数', () => {
    expect(formatNumber('-1.2')).toBe('-1.2')
  })

  test('禁止小数时截断', () => {
    expect(formatNumber('1.2', false)).toBe('1')
  })

  test('禁止负数时去除负号', () => {
    expect(formatNumber('-1', true, false)).toBe('1')
  })

  test('仅保留首个负号', () => {
    expect(formatNumber('--1')).toBe('-1')
  })

  test('空字符串返回空', () => {
    expect(formatNumber('')).toBe('')
  })
})

describe('truncToFixed', () => {
  test('默认截断为整数', () => {
    expect(truncToFixed(1.99)).toBe('1')
  })

  test('截断保留指定位数小数', () => {
    expect(truncToFixed(1.99, 1)).toBe('1.9')
    expect(truncToFixed(1.236, 2)).toBe('1.23')
  })

  test('负数截断', () => {
    expect(truncToFixed(-1.99)).toBe('-1')
  })
})

describe('compactNumber', () => {
  test('小于 1000 不缩写', () => {
    expect(compactNumber(999)).toBe('999')
  })

  test('按单位缩写', () => {
    expect(compactNumber(12000)).toBe('12K')
    expect(compactNumber(1e6)).toBe('1M')
    expect(compactNumber(1e9)).toBe('1B')
    expect(compactNumber(1e12)).toBe('1T')
  })

  test('保留指定位数小数', () => {
    expect(compactNumber(1234)).toBe('1.2K')
    expect(compactNumber(1234, 2)).toBe('1.23K')
    expect(compactNumber(1500, 0)).toBe('1K')
  })

  test('keepZero 保留零小数', () => {
    expect(compactNumber(1000, 1, true)).toBe('1.0K')
  })

  test('负数缩写', () => {
    expect(compactNumber(-1200)).toBe('-1.2K')
  })

  test('非有限数返回 0', () => {
    expect(compactNumber(NaN)).toBe('0')
    expect(compactNumber(Infinity)).toBe('0')
  })
})

describe('formatThousands', () => {
  test('0 返回 0', () => {
    expect(formatThousands()).toBe('0')
  })

  test('格式化为千分位', () => {
    expect(formatThousands(1234)).toBe('1,234')
    expect(formatThousands(1234567)).toBe('1,234,567')
  })

  test('负数千分位', () => {
    expect(formatThousands(-1234)).toBe('-1,234')
  })

  test('保留小数部分', () => {
    expect(formatThousands(1234.5)).toBe('1,234.5')
  })

  test('非数字返回 0', () => {
    expect(formatThousands(NaN)).toBe('0')
    expect(formatThousands(Infinity)).toBe('0')
    expect(formatThousands('abc')).toBe('0')
  })
})
