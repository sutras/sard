import { describe, expect, test } from 'vitest'
import { interpolate } from '../string'

describe('interpolate', () => {
  test('具名插值 {name}', () => {
    expect(interpolate('你好，{name}！', { name: '小明' })).toBe('你好，小明！')
  })

  test('多个占位符可重复替换', () => {
    expect(interpolate('{a}-{b}-{a}', { a: 1, b: 2 })).toBe('1-2-1')
  })

  test('数组按下标插值 {0}', () => {
    expect(interpolate('{0} / {1}', ['a', 'b'])).toBe('a / b')
  })

  test('数字值转为字符串', () => {
    expect(interpolate('数量：{count}', { count: 3 })).toBe('数量：3')
  })

  test('占位符不存在时保留原样', () => {
    expect(interpolate('{a}', { b: 1 })).toBe('{a}')
    expect(interpolate('{2}', ['x'])).toBe('{2}')
  })

  test('值为 null/undefined 时保留占位符', () => {
    expect(interpolate('{a}', { a: null })).toBe('{a}')
    expect(interpolate('{a}', { a: undefined })).toBe('{a}')
  })

  test('不传 data 时原样返回', () => {
    expect(interpolate('hello {name}')).toBe('hello {name}')
    expect(interpolate('hello {name}', undefined)).toBe('hello {name}')
  })

  test('花括号中带空格不作插值', () => {
    expect(interpolate('a { b } c', { b: 'x' })).toBe('a { b } c')
  })
})
