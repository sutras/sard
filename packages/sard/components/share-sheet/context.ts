import { type InjectionKey, provide, inject, onMounted, onUnmounted, useAttrs, ref } from 'vue'
import type { ShareSheetItemProps } from './common'
import { reactiveComputed } from '../../use'

export interface ShareSheetContext {
  select: (item: ShareSheetItemProps) => void
  addMember: (item: ShareSheetItemProps) => void
  removeMember: (item: ShareSheetItemProps) => void
}

export const shareSheetContextKey = Symbol('ShareSheetContext') as InjectionKey<ShareSheetContext>

export function useShareSheet(options: { onSelect: (item: ShareSheetItemProps) => void }) {
  const members = ref<ShareSheetItemProps[]>([])

  provide(shareSheetContextKey, {
    select: (item) => {
      options.onSelect(item)
    },
    addMember: (item) => {
      if (!members.value.includes(item)) {
        members.value.push(item)
      }
    },
    removeMember: (item) => {
      const index = members.value.indexOf(item)
      if (index > -1) {
        members.value.splice(index, 1)
      }
    },
  })
}

export function useShareSheetItem(props: ShareSheetItemProps) {
  const context = inject(shareSheetContextKey)
  if (!context) {
    throw new Error('ShareSheetItem must be included in ShareSheet.')
  }

  const attrs = useAttrs()

  const member = reactiveComputed(() => {
    return {
      ...props,
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
