/**
 * 惯性衰减模拟器。用于计算带有指数衰减阻尼的滚动位置和速度。
 *
 * 该模型假定速度随时间按 `damping^t` 衰减，位置则是该速度衰减曲线的积分。
 *
 * 所有 API 单位：位置 px，速度 px/s，时间 s。
 */
export class Friction {
  /** 阻尼因子，通常小于 1。越接近 1，衰减越慢。 */
  private damping: number

  /** 运动起始位置（px）。 */
  private x: number

  /** 运动起始速度（px/s）。 */
  private v: number

  /** 记录 `set()` 调用时的时间戳（毫秒）。 */
  private startTime: number

  /**
   * @param damping 阻尼因子，用于控制速度指数衰减的底数。
   */
  constructor(damping: number) {
    this.damping = damping
    this.x = 0
    this.v = 0
    this.startTime = 0
  }

  /**
   * 初始化当前位置和速度，并重置时间基准。
   *
   * @param x 初始位置（px）
   * @param v 初始速度（px/s）
   */
  set(x: number, v: number) {
    this.x = x
    this.v = v
    this.startTime = Date.now()
  }

  /**
   * 在知道目标终点位置时，反向计算需要的初速度。
   * 该方法使用固定时间窗（100 秒）进行估算。
   *
   * @param endX 目标终点位置（px）
   */
  setVelocityByEnd(endX: number) {
    this.v = ((endX - this.x) * Math.log(this.damping)) / (Math.pow(this.damping, 100) - 1)
  }

  /**
   * 计算 `time` 秒后的位置（px）。
   *
   * 如果未传入 `time`，则根据当前时间和 `startTime` 计算经过时间。
   *
   * @param time 经过时间（s）
   * @returns 位置值（px）
   */
  position(time?: number) {
    const decay = this.resolveDecay(time)
    const logD = Math.log(this.damping)
    return this.x + (this.v * decay) / logD - this.v / logD
  }

  /**
   * 计算 `time` 秒后的速度（px/s）。
   *
   * 如果未传入 `time`，则使用当前时间与 `startTime` 的差值。
   *
   * @param time 经过时间（s）
   * @returns 速度值（px/s）
   */
  velocity(time?: number) {
    return this.v * this.resolveDecay(time)
  }

  /**
   * 解析时间并计算衰减因子 `damping^time`。
   */
  private resolveDecay(time?: number) {
    if (time === undefined) {
      time = (Date.now() - this.startTime) / 1000
    }
    return Math.pow(this.damping, time)
  }

  /**
   * 判断惯性滚动是否已基本停止。
   *
   * @returns 当当前速度绝对值小于 3 px/s 时返回 true
   */
  done() {
    return Math.abs(this.velocity()) < 3
  }

  /**
   * 重新配置阻尼因子，并保持当前位置与当前速度不变。
   *
   * @param newDamping 新的阻尼因子
   */
  reconfigure(newDamping: number) {
    const curX = this.position()
    const curV = this.velocity()
    this.damping = newDamping
    this.set(curX, curV)
  }

  /**
   * 返回可用于调试或 UI 控制的配置对象。
   */
  configuration() {
    return [
      {
        label: 'Friction',
        read: () => {
          return this.damping
        },
        write: (value: number) => {
          this.reconfigure(value)
        },
        min: 0.001,
        max: 0.1,
        step: 0.001,
      },
    ]
  }
}
