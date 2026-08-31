import { reactive } from 'vue'

export interface PopupItem {
  close: () => void
}

export function createPopupManager() {
  const stack = reactive<PopupItem[]>([])

  const push = (item: PopupItem) => {
    if (!stack.includes(item)) {
      stack.push(item)
    }
  }

  const pop = () => {
    const item = stack.pop()
    if (item) {
      item.close()
    }
  }

  const remove = (item: PopupItem) => {
    const index = stack.indexOf(item)
    if (index !== -1) {
      stack.splice(index, 1)
    }
  }

  return {
    stack,
    push,
    pop,
    remove,
  }
}

export const popupManager = createPopupManager()
