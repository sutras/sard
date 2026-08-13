import { type App, type ComputedRef, type Ref, computed, inject, ref, watch } from 'vue'

const colorSchemeContextSymbol = Symbol('colorSchemeContext')

const colorSchemeKey = 'Sard:colorScheme'
const darkCls = 'dark'

export type ColorScheme = 'dark' | 'light' | 'auto'
export type AppliedColorScheme = 'dark' | 'light'

interface ColorSchemeContext {
  colorScheme: Ref<ColorScheme>
  appliedColorScheme: ComputedRef<AppliedColorScheme>
}

export function isColorScheme(t: string): t is ColorScheme {
  return /^(?:dark|light|auto)$/.test(t)
}

export function provideColorScheme(app: App) {
  const storageKey = localStorage.getItem(colorSchemeKey)
  const defaultColorScheme = storageKey && isColorScheme(storageKey) ? storageKey : 'auto'

  const colorScheme = ref<ColorScheme>(defaultColorScheme)
  const appliedColorScheme = ref<AppliedColorScheme>('light')

  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = (event: MediaQueryListEvent) => {
    if (colorScheme.value === 'auto') {
      appliedColorScheme.value = event.matches ? 'dark' : 'light'
    }
  }

  mediaQueryList.addEventListener('change', handleChange)

  watch(
    colorScheme,
    () => {
      if (colorScheme.value === 'auto') {
        appliedColorScheme.value = mediaQueryList.matches ? 'dark' : 'light'
      } else {
        appliedColorScheme.value = colorScheme.value
      }
      localStorage.setItem(colorSchemeKey, colorScheme.value)
    },
    {
      immediate: true,
    },
  )

  watch(
    appliedColorScheme,
    () => {
      if (appliedColorScheme.value === 'dark') {
        document.documentElement.classList.add(darkCls)
      } else {
        document.documentElement.classList.remove(darkCls)
      }
    },
    {
      immediate: true,
    },
  )

  const context: ColorSchemeContext = {
    colorScheme,
    appliedColorScheme: computed(() => appliedColorScheme.value),
  }

  app.provide<ColorSchemeContext>(colorSchemeContextSymbol, context)

  return context
}

export function useColorScheme() {
  return inject<ColorSchemeContext>(colorSchemeContextSymbol) as ColorSchemeContext
}
