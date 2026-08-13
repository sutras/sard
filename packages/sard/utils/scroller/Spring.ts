function near(e: any, t: number, n: number) {
  return e > t - n && e < t + n
}

function nearZero(e: any, t: number) {
  return near(e, 0, t)
}

interface Solution {
  _t?: number
  _powER1T?: number
  _powER2T?: number
  position: (e: number) => number
  velocity: (e: number) => number
}

/**
 * 弹簧模型，用于产生回弹动画和边界恢复效果。
 */
export class Spring {
  /** 质量，用于计算阻尼系统 */
  private mass: number

  /** 弹簧常数 */
  private stiffness: number

  /** 阻尼系数 */
  private damping: number

  /** 当前解析解对象 */
  private solution: Solution | null

  /** 当前弹簧目标位置 */
  private endPosition: number

  /** 记录弹簧运动开始时间戳 */
  private startTime: number

  constructor(mass: number, stiffness: number, damping: number) {
    this.mass = mass
    this.stiffness = stiffness
    this.damping = damping
    this.solution = null
    this.endPosition = 0
    this.startTime = 0
  }

  /**
   * 求解弹簧位移/速度的解析解。
   */
  solve(displacement: number, velocity: number): Solution {
    const c = this.damping
    const m = this.mass
    const k = this.stiffness
    const discriminant = c * c - 4 * m * k
    if (discriminant === 0) {
      const root = -c / (2 * m)
      const amp1 = displacement
      const amp2 = velocity / (root * displacement)
      return {
        position: function (e: number) {
          return (amp1 + amp2 * e) * Math.pow(Math.E, root * e)
        },
        velocity: function (e: number) {
          const t = Math.pow(Math.E, root * e)
          return root * (amp1 + amp2 * e) * t + amp2 * t
        },
      }
    }
    if (discriminant > 0) {
      const root1 = (-c - Math.sqrt(discriminant)) / (2 * m)
      const root2 = (-c + Math.sqrt(discriminant)) / (2 * m)
      const amp2 = (velocity - root1 * displacement) / (root2 - root1)
      const amp1 = displacement - amp2
      return {
        position: function (e: number): number {
          let t
          let n
          if (e === this._t) {
            t = this._powER1T
            n = this._powER2T
          }
          this._t = e
          if (!t) {
            t = this._powER1T = Math.pow(Math.E, root1 * e)
          }
          if (!n) {
            n = this._powER2T = Math.pow(Math.E, root2 * e)
          }
          return amp1 * t + amp2 * n
        },
        velocity: function (e: number): number {
          let t
          let n
          if (e === this._t) {
            t = this._powER1T
            n = this._powER2T
          }
          this._t = e
          if (!t) {
            t = this._powER1T = Math.pow(Math.E, root1 * e)
          }
          if (!n) {
            n = this._powER2T = Math.pow(Math.E, root2 * e)
          }
          return amp1 * root1 * t + amp2 * root2 * n
        },
      }
    }
    const dampedFreq = Math.sqrt(4 * m * k - c * c) / (2 * m)

    const decayRate = (-c / 2) * m

    const amp1 = displacement

    const amp2 = (velocity - decayRate * displacement) / dampedFreq
    return {
      position: function (e: number): number {
        return (
          Math.pow(Math.E, decayRate * e) *
          (amp1 * Math.cos(dampedFreq * e) + amp2 * Math.sin(dampedFreq * e))
        )
      },
      velocity: function (e: number): number {
        const t = Math.pow(Math.E, decayRate * e)

        const n = Math.cos(dampedFreq * e)

        const i = Math.sin(dampedFreq * e)
        return (
          t * (amp2 * dampedFreq * n - amp1 * dampedFreq * i) +
          decayRate * t * (amp2 * i + amp1 * n)
        )
      },
    }
  }

  /**
   * 返回当前时间点的弹簧位置。
   */
  position(e?: number) {
    if (e === undefined) {
      e = (new Date().getTime() - this.startTime) / 1e3
    }
    return this.solution ? this.endPosition + this.solution.position(e) : 0
  }

  /**
   * 返回当前时间点的弹簧速度。
   */
  velocity(e?: number) {
    if (e === undefined) {
      e = (new Date().getTime() - this.startTime) / 1e3
    }
    return this.solution ? this.solution.velocity(e) : 0
  }

  /**
   * 更新弹簧目标位置和初始状态。
   */
  setEnd(end: number, initVel?: number, time?: number) {
    if (!time) {
      time = new Date().getTime()
    }
    if (end !== this.endPosition || !nearZero(initVel, 0.4)) {
      initVel = initVel || 0
      let curPos = this.endPosition
      if (this.solution) {
        if (nearZero(initVel, 0.4)) {
          initVel = this.solution.velocity((time - this.startTime) / 1e3)
        }
        curPos = this.solution.position((time - this.startTime) / 1e3)
        if (nearZero(initVel, 0.4)) {
          initVel = 0
        }
        if (nearZero(curPos, 0.4)) {
          curPos = 0
        }
        curPos += this.endPosition
      }
      if (!(this.solution && nearZero(curPos - end, 0.4) && nearZero(initVel, 0.4))) {
        this.endPosition = end
        this.solution = this.solve(curPos - this.endPosition, initVel)
        this.startTime = time
      }
    }
  }

  /**
   * 直接跳转到指定终点并停止当前弹簧运动。
   */
  snap(end: number) {
    this.startTime = new Date().getTime()
    this.endPosition = end
    this.solution = {
      position: function () {
        return 0
      },
      velocity: function () {
        return 0
      },
    }
  }

  /**
   * 判断弹簧是否已接近目标位置且速度很小。
   */
  done(e?: number) {
    if (!e) {
      e = new Date().getTime()
    }
    return near(this.position(), this.endPosition, 0.4) && nearZero(this.velocity(), 0.4)
  }

  /**
   * 重新配置弹簧参数，并保持当前运动状态连续。
   */
  reconfigure(mass: number, stiffness: number, damping: number) {
    this.mass = mass
    this.stiffness = stiffness
    this.damping = damping
    if (!this.done()) {
      this.solution = this.solve(this.position() - this.endPosition, this.velocity())
      this.startTime = new Date().getTime()
    }
  }

  getStiffness() {
    return this.stiffness
  }

  getDamping() {
    return this.damping
  }

  /**
   * 返回弹簧参数的调试配置项。
   */
  configuration() {
    function setStiffness(spring: Spring, value: number) {
      spring.reconfigure(1, value, spring.getDamping())
    }

    function setDamping(spring: Spring, value: number) {
      spring.reconfigure(1, spring.getStiffness(), value)
    }
    return [
      {
        label: 'Spring Constant',
        read: this.getStiffness.bind(this),
        write: setStiffness.bind(this, this),
        min: 100,
        max: 1e3,
      },
      {
        label: 'Damping',
        read: this.getDamping.bind(this),
        write: setDamping.bind(this, this),
        min: 1,
        max: 500,
      },
    ]
  }
}
