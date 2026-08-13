import {
  type InjectionKey,
  type Ref,
  provide,
  inject,
  onMounted,
  onUnmounted,
  useAttrs,
  ref,
} from 'vue'
import { type ActionSheetItemProps } from './common'
import { reactiveComputed } from '../../use'

export interface ActionSheetContext {
  select: (item: ActionSheetItemProps) => void
  addMember: (item: ActionSheetItemProps) => void
  removeMember: (item: ActionSheetItemProps) => void
}

export const actionSheetContextKey = Symbol(
  'ActionSheetContext',
) as InjectionKey<ActionSheetContext>

export interface UseActionSheetReturn {
  items: Ref<ActionSheetItemProps[]>
  setSelectCallback: (callback: (item: ActionSheetItemProps, index: number) => void) => void
}

export function useActionSheet(): UseActionSheetReturn {
  const items = ref<ActionSheetItemProps[]>([])

  let selectCallback: ((item: ActionSheetItemProps, index: number) => void) | null = null

  const setSelectCallback = (callback: (item: ActionSheetItemProps, index: number) => void) => {
    selectCallback = callback
  }

  provide(actionSheetContextKey, {
    select: (item) => {
      const index = items.value.indexOf(item)
      selectCallback?.(item, index)
    },
    addMember: (item) => {
      if (!items.value.includes(item)) {
        items.value.push(item)
      }
    },
    removeMember: (item) => {
      const index = items.value.indexOf(item)
      if (index > -1) {
        items.value.splice(index, 1)
      }
    },
  })

  return {
    items,
    setSelectCallback,
  }
}

export function useActionSheetItem(item: ActionSheetItemProps) {
  const context = inject(actionSheetContextKey)
  if (!context) {
    throw new Error('ActionSheetItem must be included in ActionSheet.')
  }

  const attrs = useAttrs()

  const member = reactiveComputed(() => {
    return {
      ...item,
      ...attrs,
    }
  })

  onMounted(() => {
    context.addMember(member)
  })

  onUnmounted(() => {
    context.removeMember(member)
  })

  return {
    select: () => {
      context.select(member)
    },
  }
}
