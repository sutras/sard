import {
  inject,
  onBeforeMount,
  onBeforeUnmount,
  provide,
  reactive,
  toRef,
  type InjectionKey,
} from 'vue'
import type { TableColProps, TableColumnProps } from './common'

export interface TableColumnMember<T = any> {
  width: number
  index: number
  column: TableColumnProps<T>
}

export interface TableColumnContext<T = any> {
  members: TableColumnMember<T>[]
  addMember: (item: TableColumnMember<T>) => void
  removeMember: (item: TableColumnMember<T>) => void
}

export const tableColumnContextKey = Symbol(
  'tableColumnContext',
) as InjectionKey<TableColumnContext>

export function useColumnProvide<T>() {
  const members = reactive<TableColumnMember<T>[]>([])

  const sort = () => {
    members.sort((a, b) => a.index - b.index)
  }

  const context = {
    members,
    addMember(number: TableColumnMember) {
      if (!members.includes(number as any)) {
        members.push(number as any)
        sort()
      }
    },
    removeMember(member: TableColumnMember) {
      const index = members.indexOf(member as any)
      if (index !== -1) {
        members.splice(index, 1)
        sort()
      }
    },
  }

  provide(tableColumnContextKey, context)

  return {
    cols: members,
  }
}

export function useColumnConsume(props: TableColProps) {
  const context = inject(tableColumnContextKey, null)!

  const { addMember, removeMember } = context

  const member = reactive({
    width: 0,
    index: toRef(() => props.index),
    column: toRef(() => props.column),
  }) as TableColumnMember

  onBeforeMount(() => {
    addMember(member)
  })

  onBeforeUnmount(() => {
    removeMember(member)
  })

  return member
}
