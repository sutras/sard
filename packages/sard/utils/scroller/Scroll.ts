import { Friction } from './Friction'
import { Spring } from './Spring'

/**
 * 组合的滚动模型，支持惯性衰减和边界弹簧回弹。
 */
export class Scroll {
  /** 滚动最大有效范围，用于越界判断 */
  extent: number

  /** 惯性摩擦模型 */
  friction: Friction

  /** 边界回弹弹簧模型 */
  spring: Spring

  /** 记录滚动开始时间戳 */
  startTime: number

  /** 当前是否正在弹簧回弹 */
  private springing: boolean

  /** 弹簧回弹时的位置偏移量 */
  private springOffset: number

  /** 缓存上次速度计算对应的时间 */
  private lastTime?: number

  /** 缓存上次速度结果 */
  private lastDx?: number

  constructor(extent: number, friction?: Friction, spring?: Spring) {
    this.extent = extent
    this.friction = friction || new Friction(0.01)
    this.spring = spring || new Spring(1, 90, 20)
    this.startTime = 0
    this.springing = false
    this.springOffset = 0
  }

  /**
   * 直接进入 snap 状态，将当前滚动位置使用弹簧动画对齐到目标位置。
   */
  snap(e: number, t: number) {
    this.springOffset = 0
    this.springing = true
    this.spring.snap(e)
    this.spring.setEnd(t)
  }

  /**
   * 设置滚动初始位置和速度，并根据是否越界切换到弹簧回弹模式。
   */
  set(e: number, t: number) {
    this.friction.set(e, t)
    if (e > 0 && t >= 0) {
      this.springOffset = 0
      this.springing = true
      this.spring.snap(e)
      this.spring.setEnd(0)
    } else {
      if (e < -this.extent && t <= 0) {
        this.springOffset = 0
        this.springing = true
        this.spring.snap(e)
        this.spring.setEnd(-this.extent)
      } else {
        this.springing = false
      }
    }
    this.startTime = Date.now()
  }

  /**
   * 计算当前时间点的位置，如果超出边界则切换到弹簧回弹模式。
   */
  position(e: number) {
    if (!this.startTime) {
      return 0
    }
    if (!e) {
      e = (Date.now() - this.startTime) / 1e3
    }
    if (this.springing) {
      return this.spring.position() + this.springOffset
    }
    let t = this.friction.position(e)
    const n = this.velocity(e)
    if ((t > 0 && n >= 0) || (t < -this.extent && n <= 0)) {
      this.springing = true
      this.spring.setEnd(0, n)
      if (t < -this.extent) {
        this.springOffset = -this.extent
      } else {
        this.springOffset = 0
      }
      t = this.spring.position() + this.springOffset
    }
    return t
  }

  /**
   * 计算当前时间点的速度。
   */
  velocity(e: number) {
    let t: number
    if (this.lastTime === e) {
      t = this.lastDx as number
    } else {
      t = this.springing ? this.spring.velocity(e) : this.friction.velocity(e)
    }
    this.lastTime = e
    this.lastDx = t
    return t
  }

  /**
   * 判断滚动是否结束。
   */
  done() {
    return this.springing ? this.spring.done() : this.friction.done()
  }

  /**
   * 将 friction 的初速度按目标终点反推。
   */
  setVelocityByEnd(e: number) {
    this.friction.setVelocityByEnd(e)
  }

  /**
   * 返回 friction 与 spring 的调试配置项。
   */
  configuration() {
    const e: any[] = this.friction.configuration()
    e.push(...this.spring.configuration())
    return e
  }
}
