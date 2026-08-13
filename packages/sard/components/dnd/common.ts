import { type UnwrapRef, type InjectionKey } from 'vue'

export interface DndProps<T> {
  list?: T[]
}

export interface DndSlots<T> {
  default?(props: { list: DndListItem<T>[] }): any
}

export interface DndEmits<T> {
  'item-drag-start': [event: { itemIndex: number }]
  'item-drag-move': [event: { itemIndex: number; insertIndex: number }]
  'item-drop': [event: { itemIndex: number; insertIndex: number }]
  'update:list': [list: T[]]
}

export interface DndExpose {}

export interface DndListItem<T> {
  data: UnwrapRef<T>
  itemInfo: DndItemInfo
  key: string
}

export interface DndItemInfo {
  offset: number
  dragging: boolean
}

export interface DndContext<T> {
  list: DndListItem<T>[]
  dragging: boolean
  currentHeight: number
  dragStart: (itemIndex: number) => void
  dragMove: (itemIndex: number, insertIndex: number) => void
  drop: (itemIndex: number, insertIndex: number) => void
  rectItems: (() => DOMRect)[]
  addRectItem: (getRect: () => DOMRect) => void
  removeRectItem: (getRect: () => DOMRect) => void
}

export const dndContextKey = Symbol('dndContext') as InjectionKey<DndContext<any>>

export interface DndItemProps {
  itemInfo: DndItemInfo
}

export interface DndItemSlots {
  default?(props: Record<string, never>): any
}

export interface DndItemEmits {}

export interface DndItemExpose {}

export interface DndItemContext {
  immediateStart: () => void
  start: () => void
  move: (delta: number) => void
  end: () => void
}

export const dndItemContextKey = Symbol('dndItemContext') as InjectionKey<DndItemContext>

export interface DndHandleProps {}

export interface DndHandleSlots {
  default?(props: Record<string, never>): any
}

export interface DndHandleEmits {}

export interface DndHandleExpose {}
