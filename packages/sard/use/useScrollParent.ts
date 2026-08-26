import { ref, type Ref, onMounted } from 'vue'

type ScrollElement = HTMLElement | Window

const overflowScrollReg = /scroll|auto|overlay/i
const defaultRoot = window

function isContentElement(node: Element) {
  return node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'HTML' && node.tagName !== 'BODY'
}

export function getScrollParent(el: Element, root: ScrollElement | undefined | null = defaultRoot) {
  let node = el

  while (node && node !== root && isContentElement(node)) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowScrollReg.test(overflowY)) {
      return node
    }
    node = node.parentNode as Element
  }

  return root
}

export function useScrollParent(
  el: Ref<Element | undefined | null>,
  root: ScrollElement | undefined | null = defaultRoot,
) {
  const scrollParent = ref<Element | Window | null>()

  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root)
    }
  })

  return scrollParent
}
