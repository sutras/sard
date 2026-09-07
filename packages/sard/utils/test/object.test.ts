import { describe, expect, test } from 'vitest'
import { assignDeep } from '../object'

describe('assignDeep', () => {
  test('合并不同键', () => {
    expect(assignDeep({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  test('后者覆盖前者的原始值', () => {
    expect(assignDeep({ a: 1, b: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  test('纯对象递归合并', () => {
    const result = assignDeep(
      { app: { title: '我的应用', button: { submit: '提交' } } },
      { app: { button: { cancel: '取消' }, other: 1 } },
    )
    expect(result).toEqual({
      app: {
        title: '我的应用',
        button: { submit: '提交', cancel: '取消' },
        other: 1,
      },
    })
  })

  test('数组整体覆盖而非逐项合并', () => {
    const result = assignDeep(
      { list: [{ id: 1, name: 'old' }, 'x', 'keep'] },
      { list: [{ name: 'new' }] },
    )
    expect(result.list).toEqual([{ name: 'new' }])
    expect(result.list).not.toHaveLength(3)
  })

  test('合并多个源对象', () => {
    expect(assignDeep({}, { a: 1 }, { b: 2 }, { a: 3 })).toEqual({ a: 3, b: 2 })
  })

  test('不修改传入对象', () => {
    const base = { a: 1, nested: { x: 1 }, list: [1] }
    const result = assignDeep(base, { a: 2, nested: { y: 2 }, list: [2] })

    expect(base).toEqual({ a: 1, nested: { x: 1 }, list: [1] })
    expect(result).toEqual({ a: 2, nested: { x: 1, y: 2 }, list: [2] })
  })

  test('跳过 undefined，不覆盖已有值', () => {
    const result = assignDeep({ a: 1, b: 2 }, { b: undefined, c: undefined })
    expect(result).toEqual({ a: 1, b: 2 })
  })

  test('忽略 null 入参', () => {
    expect(assignDeep(null as any, { a: 1 })).toEqual({ a: 1 })
  })
})
