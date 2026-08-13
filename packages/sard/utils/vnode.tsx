import {
  Comment,
  Text,
  cloneVNode,
  defineComponent,
  Fragment,
  isVNode,
  withDirectives,
  type Directive,
  type VNode,
} from 'vue'
import { isObject } from './is'
import { logError } from './log'

export function flatVNode(nodes: any): VNode[] {
  const array: VNode[] = []
  if (Array.isArray(nodes)) {
    nodes.forEach((vnode) => {
      if (isVNode(vnode)) {
        if (vnode.type === Fragment) {
          array.push(...flatVNode(vnode.children))
        } else {
          if (vnode.type !== Comment) array.push(vnode)
        }
      } else if (Array.isArray(vnode)) {
        array.push(...flatVNode(vnode))
      }
    })
  }
  return array
}

function wrapTextContent(s: string | VNode) {
  return <span>{s}</span>
}

function findFirstLegitChild(node: VNode[] | undefined): [VNode | null, number] {
  if (!node) return [null, 0]
  const children = node as VNode[]
  const len = children.filter((c) => c.type !== Comment).length

  for (const child of children) {
    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue
        case Text:
        case 'svg':
          return [wrapTextContent(child), len]
        case Fragment:
          return findFirstLegitChild(child.children as VNode[])
        default:
          return [child, len]
      }
    }
    return [wrapTextContent(child), len]
  }
  return [null, 0]
}

export const OnlyChild = defineComponent({
  emits: {
    update(_el: HTMLElement | null) {
      return true
    },
  },
  setup(_, { slots, attrs, emit }) {
    const getElDirective: Directive = {
      mounted(el) {
        emit('update', el)
      },
      updated(el) {
        emit('update', el)
      },
      unmounted() {
        emit('update', null)
      },
    }

    return () => {
      const defaultSlot = slots.default?.(attrs)
      if (!defaultSlot) return null

      const [firstLegitNode, length] = findFirstLegitChild(defaultSlot)

      if (!firstLegitNode) {
        logError('no valid child node found')
        return null
      }
      if (length > 1) {
        logError('requires exact only one valid child.')
      }

      return withDirectives(cloneVNode(firstLegitNode!, attrs), [[getElDirective]])
    }
  },
})
