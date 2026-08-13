import {
  type InjectionKey,
  provide,
  inject,
  onMounted,
  onUnmounted,
  useAttrs,
  type Ref,
  reactive,
  computed,
  type ComputedRef,
  toRef,
} from 'vue'
import { reactiveComputed } from '../../use'
import { type MenuItemProps, type MenuProps } from './common'

export interface MenuMember {
  props: MenuItemProps
  hasIconSlot: boolean
}

export interface MenuContext {
  hasIcon: ComputedRef<boolean>
  direction: Readonly<Ref<MenuProps['direction']>>
  select: (memer: MenuMember) => void
  addMember: (memer: MenuMember) => void
  removeMember: (memer: MenuMember) => void
}

export const menuContextKey = Symbol('menuContext') as InjectionKey<MenuContext>

export function useMenu(options: { props: MenuProps; onSelect: (item: MenuMember) => void }) {
  const { props, onSelect } = options

  const members = reactive<MenuMember[]>([])

  const hasIcon = computed(() => {
    return members.some((member) => member.hasIconSlot)
  })

  const context: MenuContext = {
    hasIcon,
    direction: toRef(() => props.direction),
    select: (item) => {
      onSelect(item)
    },
    addMember: (item) => {
      if (!members.includes(item)) {
        members.push(item)
      }
    },
    removeMember: (item) => {
      const index = members.indexOf(item)
      if (index > -1) {
        members.splice(index, 1)
      }
    },
  }

  provide(menuContextKey, context)

  return context
}

export function useMenuItem(props: MenuItemProps, hasIconSlot: Ref<boolean>) {
  const context = inject(menuContextKey)
  if (!context) {
    throw new Error('MenuItem must be included in Menu.')
  }

  const attrs = useAttrs()

  const mergedProps = reactiveComputed(() => {
    return {
      ...props,
      ...attrs,
    }
  })

  const member = reactive({
    props: mergedProps,
    hasIconSlot,
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
    hasIcon: context.hasIcon,
    direction: context.direction,
  }
}
