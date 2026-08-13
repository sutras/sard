import { nextTick, ref } from 'vue'
import { isKorean } from '../utils'

interface UseCompositionOptions {
  afterComposition: (event: CompositionEvent) => void
  emit?: ((event: 'compositionstart', evt: CompositionEvent) => void) &
    ((event: 'compositionupdate', evt: CompositionEvent) => void) &
    ((event: 'compositionend', evt: CompositionEvent) => void)
}

export function useComposition({ afterComposition, emit }: UseCompositionOptions) {
  const isComposing = ref(false)

  const onCompositionStart = (event: CompositionEvent) => {
    emit?.('compositionstart', event)
    isComposing.value = true
  }

  const onCompositionUpdate = (event: CompositionEvent) => {
    emit?.('compositionupdate', event)
    const text = (event.target as HTMLInputElement)?.value
    const lastCharacter = text[text.length - 1] || ''
    isComposing.value = !isKorean(lastCharacter)
  }

  const onCompositionEnd = (event: CompositionEvent) => {
    emit?.('compositionend', event)
    if (isComposing.value) {
      isComposing.value = false
      nextTick(() => afterComposition(event))
    }
  }

  return {
    isComposing,
    onCompositionStart,
    onCompositionUpdate,
    onCompositionEnd,
  }
}
