import { describe, expect, test } from 'vitest'
import { effectScope } from 'vue'

import {
  useLuckyDraw,
  type UseLuckyGridOptions,
  type UseLuckyGridReturn,
  getGridCenterSize,
  getGridIndex,
  getGridPrizeCount,
  useLuckyGrid,
  type UseLuckyWheelOptions,
  type UseLuckyWheelReturn,
  useLuckyWheel,
  type UseSlotMachineOptions,
  type UseSlotMachineReturn,
  useSlotMachine,
} from '../../../use'

// ── helpers ──────────────────────────────────────────────────────────

function testLuckyGrid(index: number, options?: UseLuckyGridOptions) {
  return new Promise<[number, UseLuckyGridReturn]>((resolve) => {
    const scope = effectScope()
    scope.run(() => {
      const ret = useLuckyGrid({
        accelTime: 20,
        decelTime: 20,
        endDelay: 0,
        complete: (index) => {
          resolve([index, ret])
          scope.stop()
        },
        ...options,
      })
      ret.play()
      ret.stop(index)
    })
  })
}

function testLuckyWheel(index: number, options?: UseLuckyWheelOptions) {
  return new Promise<[number, UseLuckyWheelReturn]>((resolve) => {
    const scope = effectScope()
    scope.run(() => {
      const ret = useLuckyWheel({
        accelTime: 20,
        decelTime: 20,
        endDelay: 0,
        complete: (index) => {
          resolve([index, ret])
          scope.stop()
        },
        ...options,
      })
      ret.play()
      ret.stop(index)
    })
  })
}

function testSlotMachine(index: number[], options?: UseSlotMachineOptions) {
  return new Promise<[number[], UseSlotMachineReturn]>((resolve) => {
    const scope = effectScope()
    scope.run(() => {
      const ret = useSlotMachine({
        columns: [8, 8, 8],
        accelTime: 20,
        decelTime: 20,
        staggerDelay: 5,
        endDelay: 0,
        complete: (index) => {
          resolve([index, ret])
          scope.stop()
        },
        ...options,
      })
      ret.play()
      ret.stop(index)
    })
  })
}

// ── utility functions ────────────────────────────────────────────────

describe('getGridPrizeCount', () => {
  test('returns column count when row is 1', () => {
    expect(getGridPrizeCount(1, 3)).toBe(3)
    expect(getGridPrizeCount(1, 5)).toBe(5)
    expect(getGridPrizeCount(1, 8)).toBe(8)
  })

  test('returns row count when column is 1', () => {
    expect(getGridPrizeCount(3, 1)).toBe(3)
    expect(getGridPrizeCount(5, 1)).toBe(5)
    expect(getGridPrizeCount(8, 1)).toBe(8)
  })

  test('returns perimeter count for multi-row multi-column grids', () => {
    expect(getGridPrizeCount(2, 2)).toBe(4) // no center
    expect(getGridPrizeCount(3, 3)).toBe(8) // 2*3 + 2*3 - 4
    expect(getGridPrizeCount(4, 5)).toBe(14) // 2*4 + 2*5 - 4
    expect(getGridPrizeCount(5, 5)).toBe(16) // 2*5 + 2*5 - 4
  })
})

describe('getGridCenterSize', () => {
  test('returns zero center when row or column <= 2', () => {
    expect(getGridCenterSize(1, 3)).toEqual({ row: 0, column: 1 })
    expect(getGridCenterSize(3, 1)).toEqual({ row: 1, column: 0 })
    expect(getGridCenterSize(2, 2)).toEqual({ row: 0, column: 0 })
  })

  test('returns positive center size for larger grids', () => {
    expect(getGridCenterSize(3, 3)).toEqual({ row: 1, column: 1 })
    expect(getGridCenterSize(4, 5)).toEqual({ row: 2, column: 3 })
    expect(getGridCenterSize(6, 6)).toEqual({ row: 4, column: 4 })
  })
})

describe('getGridIndex', () => {
  test('maps all perimeter cells correctly for a 3x3 grid', () => {
    // 3x3 grid has 8 perimeter cells (prizes) and 1 center cell
    // The perimeter indices should be 0..7, each appearing exactly once
    const row = 3,
      column = 3
    const totalCells = row * column
    const prizeCount = getGridPrizeCount(row, column)
    const perimeterIndices: number[] = []

    for (let i = 0; i < totalCells; i++) {
      const idx = getGridIndex(row, column, i)
      if (idx >= 0) {
        perimeterIndices.push(idx)
      }
    }

    expect(perimeterIndices.length).toBe(prizeCount)
    // All perimeter indices 0..prizeCount-1 should appear exactly once
    expect(perimeterIndices.sort((a, b) => a - b)).toEqual(
      Array.from({ length: prizeCount }, (_, i) => i),
    )
    // Center cell (index 4 in the 3x3 grid) should be negative
    expect(getGridIndex(3, 3, 4)).toBeLessThan(0)
  })

  test('maps all perimeter cells correctly for a 4x5 grid', () => {
    const row = 4,
      column = 5
    const totalCells = row * column
    const prizeCount = getGridPrizeCount(row, column)
    const perimeterIndices: number[] = []
    const centerIndices: number[] = []

    for (let i = 0; i < totalCells; i++) {
      const idx = getGridIndex(row, column, i)
      if (idx >= 0) {
        perimeterIndices.push(idx)
      } else {
        centerIndices.push(i)
      }
    }

    expect(perimeterIndices.length).toBe(prizeCount)
    expect(perimeterIndices.sort((a, b) => a - b)).toEqual(
      Array.from({ length: prizeCount }, (_, i) => i),
    )
    // Center size should match
    const centerSize = getGridCenterSize(row, column)
    expect(centerIndices.length).toBe(centerSize.row * centerSize.column)
  })

  test('handles single row grid', () => {
    expect(getGridIndex(1, 3, 0)).toBe(0)
    expect(getGridIndex(1, 3, 1)).toBe(1)
    expect(getGridIndex(1, 3, 2)).toBe(2)
  })

  test('handles single column grid', () => {
    expect(getGridIndex(3, 1, 0)).toBe(0)
    expect(getGridIndex(3, 1, 1)).toBe(1)
    expect(getGridIndex(3, 1, 2)).toBe(2)
  })
})

// ── useLuckyDraw (base composable) ──────────────────────────────────

describe('useLuckyDraw', () => {
  test('returns expected API shape', () => {
    const scope = effectScope()
    const ret = scope.run(() => useLuckyDraw({ count: 8 }))!
    expect(ret).toHaveProperty('play')
    expect(ret).toHaveProperty('stop')
    expect(ret).toHaveProperty('pause')
    expect(ret).toHaveProperty('reset')
    expect(ret).toHaveProperty('playing')
    expect(ret).toHaveProperty('activeIndex')
    expect(typeof ret.play).toBe('function')
    expect(typeof ret.stop).toBe('function')
    expect(typeof ret.pause).toBe('function')
    expect(typeof ret.reset).toBe('function')
    scope.stop()
  })

  test('playing is false initially', () => {
    const scope = effectScope()
    const ret = scope.run(() => useLuckyDraw({ count: 8 }))!
    expect(ret.playing.value).toBe(false)
    scope.stop()
  })

  test('activeIndex is undefined initially', () => {
    const scope = effectScope()
    const ret = scope.run(() => useLuckyDraw({ count: 8 }))!
    expect(ret.activeIndex.value).toBeUndefined()
    scope.stop()
  })

  test('play sets playing to true', async () => {
    const scope = effectScope()
    const ret = scope.run(() =>
      useLuckyDraw({
        count: 8,
        accelTime: 10,
        decelTime: 10,
        endDelay: 0,
      }),
    )!
    ret.play()
    expect(ret.playing.value).toBe(true)
    ret.pause()
    scope.stop()
  })

  test('calling play while playing does nothing (idempotent)', () => {
    const scope = effectScope()
    const ret = scope.run(() =>
      useLuckyDraw({
        count: 8,
        accelTime: 10,
        decelTime: 10,
      }),
    )!
    ret.play()
    // Call play again — should not throw or change state unexpectedly
    expect(() => ret.play()).not.toThrow()
    expect(ret.playing.value).toBe(true)
    ret.pause()
    scope.stop()
  })

  test('pause sets playing to false', () => {
    const scope = effectScope()
    const ret = scope.run(() =>
      useLuckyDraw({
        count: 8,
        accelTime: 10,
        decelTime: 10,
      }),
    )!
    ret.play()
    ret.pause()
    expect(ret.playing.value).toBe(false)
    scope.stop()
  })

  test('reset clears activeIndex and stops playing', () => {
    const scope = effectScope()
    const ret = scope.run(() =>
      useLuckyDraw({
        count: 8,
        accelTime: 10,
        decelTime: 10,
      }),
    )!
    ret.play()
    ret.reset()
    expect(ret.playing.value).toBe(false)
    expect(ret.activeIndex.value).toBeUndefined()
    scope.stop()
  })

  test('stop triggers complete with correct index', async () => {
    const result = await new Promise<number>((resolve) => {
      const scope = effectScope()
      scope.run(() => {
        const ret = useLuckyDraw({
          count: 8,
          accelTime: 10,
          decelTime: 10,
          endDelay: 0,
          complete: (index) => {
            resolve(index)
            scope.stop()
          },
        })
        ret.play()
        ret.stop(5)
      })
    })
    expect(result).toBe(5)
  })

  test('random stop picks a valid index', async () => {
    const result = await new Promise<number>((resolve) => {
      const scope = effectScope()
      scope.run(() => {
        const ret = useLuckyDraw({
          count: 8,
          accelTime: 10,
          decelTime: 10,
          endDelay: 0,
          complete: (index) => {
            resolve(index)
            scope.stop()
          },
        })
        ret.play()
        // stop without index → random
        ret.stop()
      })
    })
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThan(8)
  })

  test('startDelay delays the start of animation', async () => {
    let startTime = 0
    const result = await new Promise<number>((resolve) => {
      const scope = effectScope()
      scope.run(() => {
        const ret = useLuckyDraw({
          count: 8,
          accelTime: 10,
          decelTime: 10,
          startDelay: 10,
          endDelay: 0,
          complete: (index) => {
            resolve(index)
            scope.stop()
          },
        })
        startTime = Date.now()
        ret.play()
        ret.stop(3)
      })
    })
    const elapsed = Date.now() - startTime
    // Should take at least startDelay (10ms)
    expect(elapsed).toBeGreaterThanOrEqual(5)
    expect(result).toBe(3)
  }, 1000)

  test('endDelay delays the complete callback', async () => {
    const startTime = Date.now()
    const result = await new Promise<number>((resolve) => {
      const scope = effectScope()
      scope.run(() => {
        const ret = useLuckyDraw({
          count: 8,
          accelTime: 10,
          decelTime: 10,
          endDelay: 10,
          complete: (index) => {
            resolve(index)
            scope.stop()
          },
        })
        ret.play()
        ret.stop(3)
      })
    })
    const elapsed = Date.now() - startTime
    // Should take at least endDelay (10ms)
    expect(elapsed).toBeGreaterThanOrEqual(5)
    expect(result).toBe(3)
  }, 1000)
})

// ── useLuckyGrid ─────────────────────────────────────────────────────

describe('useLuckyGrid', () => {
  test('stops at correct index', async () => {
    expect((await testLuckyGrid(4))[0]).toBe(4)
    expect((await testLuckyGrid(6))[0]).toBe(6)
    expect((await testLuckyGrid(0))[0]).toBe(0)
  }, 1000)

  test('default grids and centerSize (3 x 3)', async () => {
    const [, ret] = await testLuckyGrid(4)
    expect(ret.grids.value).toEqual([0, 1, 2, 7, -1, 3, 6, 5, 4])
    expect(ret.centerSize.value).toEqual({ row: 1, column: 1 })
  }, 1000)

  test('custom row and column sizes', async () => {
    const [, ret] = await testLuckyGrid(4, {
      row: 4,
      column: 5,
    })
    expect(ret.grids.value).toEqual([
      0, 1, 2, 3, 4, 13, -1, -2, -3, 5, 12, -4, -5, -6, 6, 11, 10, 9, 8, 7,
    ])
    expect(ret.centerSize.value).toEqual({ row: 2, column: 3 })
  }, 1000)

  test('single row grid', async () => {
    const [, ret] = await testLuckyGrid(2, { row: 1, column: 5 })
    expect(ret.grids.value).toEqual([0, 1, 2, 3, 4])
    expect(ret.centerSize.value).toEqual({ row: 0, column: 3 })
  }, 1000)

  test('single column grid', async () => {
    const [, ret] = await testLuckyGrid(1, { row: 5, column: 1 })
    expect(ret.grids.value).toEqual([0, 1, 2, 3, 4])
    expect(ret.centerSize.value).toEqual({ row: 3, column: 0 })
  }, 1000)

  test('2 x 2 grid has no center', async () => {
    const [, ret] = await testLuckyGrid(0, { row: 2, column: 2 })
    expect(ret.grids.value).toEqual([0, 1, 3, 2])
    expect(ret.centerSize.value).toEqual({ row: 0, column: 0 })
  }, 1000)

  test('play / pause / reset lifecycle', async () => {
    const scope = effectScope()
    const ret = scope.run(() =>
      useLuckyGrid({
        row: 3,
        column: 3,
        accelTime: 10,
        decelTime: 10,
      }),
    )!

    expect(ret.playing.value).toBe(false)

    ret.play()
    expect(ret.playing.value).toBe(true)

    ret.pause()
    expect(ret.playing.value).toBe(false)

    ret.reset()
    expect(ret.playing.value).toBe(false)
    expect(ret.activeIndex.value).toBeUndefined()

    scope.stop()
  })
})

// ── useLuckyWheel ────────────────────────────────────────────────────

describe('useLuckyWheel', () => {
  test('stops at correct index', async () => {
    expect((await testLuckyWheel(4))[0]).toBe(4)
    expect((await testLuckyWheel(6))[0]).toBe(6)
    expect((await testLuckyWheel(0))[0]).toBe(0)
  }, 1000)

  test('degrees and sectorDegrees for default 8 sectors', async () => {
    const [, ret] = await testLuckyWheel(4)
    expect(ret.sectorDegrees.value).toEqual(360 / 8)
    expect(ret.degrees.value % 360).toEqual((4 / 8) * 360)
  }, 1000)

  test('custom count changes sectorDegrees', async () => {
    const [, ret] = await testLuckyWheel(2, { count: 6 })
    expect(ret.sectorDegrees.value).toEqual(60)
    expect(ret.degrees.value % 360).toEqual((2 / 6) * 360)
  }, 1000)

  test('custom count of 12', async () => {
    const [, ret] = await testLuckyWheel(7, { count: 12 })
    expect(ret.sectorDegrees.value).toEqual(30)
    expect(ret.degrees.value % 360).toEqual((7 / 12) * 360)
  }, 1000)

  test('count of 0 yields zero degrees', async () => {
    const scope = effectScope()
    const ret = scope.run(() => useLuckyWheel({ count: 0 }))!
    expect(ret.sectorDegrees.value).toBe(0)
    scope.stop()
  })

  test('degrees with index 0 is 0', async () => {
    const [, ret] = await testLuckyWheel(0, { count: 8 })
    expect(ret.degrees.value % 360).toBe(0)
  }, 1000)

  test('play / pause / reset lifecycle', async () => {
    const scope = effectScope()
    const ret = scope.run(() =>
      useLuckyWheel({
        count: 8,
        accelTime: 10,
        decelTime: 10,
      }),
    )!

    expect(ret.playing.value).toBe(false)

    ret.play()
    expect(ret.playing.value).toBe(true)

    ret.pause()
    expect(ret.playing.value).toBe(false)

    ret.reset()
    expect(ret.playing.value).toBe(false)

    scope.stop()
  })
})

// ── useSlotMachine ───────────────────────────────────────────────────

describe('useSlotMachine', () => {
  test('stops at correct indices', async () => {
    expect((await testSlotMachine([1, 3, 7]))[0]).toEqual([1, 3, 7])
    expect((await testSlotMachine([2, 7, 2]))[0]).toEqual([2, 7, 2])
    expect((await testSlotMachine([6, 3, 5]))[0]).toEqual([6, 3, 5])
  }, 1000)

  test('offset calculation', async () => {
    const [, ret] = await testSlotMachine([7, 0, 3])
    expect(ret.offset.value).toEqual([700, 0, 300])
  }, 1000)

  test('different column counts', async () => {
    const result = await new Promise<number[]>((resolve) => {
      const scope = effectScope()
      scope.run(() => {
        const ret = useSlotMachine({
          columns: [4, 6, 10],
          accelTime: 10,
          decelTime: 10,
          staggerDelay: 5,
          endDelay: 0,
          complete: (index) => {
            resolve(index)
            scope.stop()
          },
        })
        ret.play()
        ret.stop([3, 5, 9])
      })
    })
    expect(result).toEqual([3, 5, 9])
  }, 1000)

  test('offset scales with column count', async () => {
    const [, ret] = await testSlotMachine([0, 0, 0], {
      columns: [4, 6, 10],
    })
    // offset = activeIndex % count * 100 → for index 0, offset = 0
    expect(ret.offset.value).toEqual([0, 0, 0])

    const scope = effectScope()
    scope.stop()
  }, 1000)

  test('columns as array of arrays (mixed content)', async () => {
    const columnData = [
      ['a', 'b', 'c', 'd'],
      ['x', 'y', 'z'],
      ['1', '2', '3', '4', '5'],
    ]
    const result = await new Promise<number[]>((resolve) => {
      const scope = effectScope()
      scope.run(() => {
        const ret = useSlotMachine({
          columns: columnData,
          accelTime: 10,
          decelTime: 10,
          staggerDelay: 5,
          endDelay: 0,
          complete: (index) => {
            resolve(index)
            scope.stop()
          },
        })
        ret.play()
        ret.stop([1, 2, 4])
      })
    })
    expect(result).toEqual([1, 2, 4])
  }, 1000)

  test('play / pause / reset lifecycle', async () => {
    const scope = effectScope()
    const ret = scope.run(() =>
      useSlotMachine({
        columns: [8, 8, 8],
        accelTime: 10,
        decelTime: 10,
        staggerDelay: 5,
      }),
    )!

    expect(ret.playing.value).toBe(false)

    ret.play()
    expect(ret.playing.value).toBe(true)

    ret.pause()
    expect(ret.playing.value).toBe(false)

    ret.reset()
    expect(ret.playing.value).toBe(false)

    scope.stop()
  })

  test('staggerDelay offsets column start times', async () => {
    // Verify that staggerDelay is accepted and doesn't break anything
    // With a large staggerDelay, the total time should be longer
    const startTime = Date.now()
    const result = await new Promise<number[]>((resolve) => {
      const scope = effectScope()
      scope.run(() => {
        const ret = useSlotMachine({
          columns: [8, 8, 8],
          accelTime: 10,
          decelTime: 10,
          staggerDelay: 20,
          endDelay: 0,
          complete: (index) => {
            resolve(index)
            scope.stop()
          },
        })
        ret.play()
        ret.stop([1, 3, 7])
      })
    })
    const elapsed = Date.now() - startTime
    // With 3 columns and staggerDelay 20, the third column starts after 40ms
    expect(elapsed).toBeGreaterThanOrEqual(30)
    expect(result).toEqual([1, 3, 7])
  }, 1000)
})
