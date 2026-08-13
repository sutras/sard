import {
  shallowRef,
  computed,
  inject,
  ref,
  watch,
  type App,
  type InjectionKey,
  type Ref,
} from 'vue'
import zhCN from './lang/zh-CN'
import { chainGet } from '../utils'

export const currentLocale = shallowRef<Record<string, any>>(zhCN)

export interface LocaleTranslate {
  (
    chainOrData?: string | Record<string, number | string>,
    data?: Record<string, number | string>,
  ): string
}

export function useTranslate(prefix = '') {
  const locale = computed(() => {
    return currentLocale.value || zhCN
  })

  const translate: LocaleTranslate = (chainOrData?, data?) => {
    const chain =
      typeof chainOrData === 'string' ? (prefix ? prefix + '.' + chainOrData : chainOrData) : prefix

    data = chainOrData && typeof chainOrData === 'object' ? chainOrData : data

    const result = chainGet(locale.value, chain)

    if (typeof result === 'string') {
      if (data) {
        return result.replace(/\{([^}]*)\}/g, (match, p1) => {
          const value = (data as Record<string, string | number>)[p1]
          return value != null ? String(value) : match
        })
      }

      return result
    }

    return chain
  }

  const select = (chain?: string) => {
    const mergedChain = typeof chain === 'string' ? (prefix ? prefix + '.' + chain : chain) : prefix

    const result = chainGet(locale.value, mergedChain)

    return result
  }

  return {
    t: translate,
    translate,
    select,
  }
}

export function useTranslateWithPrefix(prefix = '') {
  return useTranslate(prefix ? `_sard.${prefix}` : prefix)
}

export function setLocale(locale: Record<string, any>) {
  currentLocale.value = locale
}

export const localeContextKey = Symbol('localeContext') as InjectionKey<Ref<string>>

export function provideLocale<T extends Record<string, any>>(
  app: App,
  languages: T,
  defaultLocale: keyof T,
) {
  const locale = ref<string>(defaultLocale as string)

  watch(
    locale,
    () => {
      setLocale(languages[locale.value])
    },
    {
      immediate: true,
    },
  )

  app.provide(localeContextKey, locale)
}

export function useLocale() {
  return inject(localeContextKey)
}
