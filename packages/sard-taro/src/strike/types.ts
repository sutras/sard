export interface Point {
  x: number
  y: number
}

export interface StrikeTouch {
  clientX: number
  clientY: number
  identifier: number
  target: EventTarget
}

export type StrikeTouchList = StrikeTouch[]
