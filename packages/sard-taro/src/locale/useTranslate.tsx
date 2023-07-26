import { useContext } from 'react'
import { LocaleContext } from './index'
import { useEvent } from '../use'
import { chainSelect, isString } from '../utils'

export function useTranslate(prefix?: string) {
  const { lang } = useContext(LocaleContext)

  const translate = useEvent(
    (
      chain?: string | Record<string, number | string | object>,
      data?: Record<string, number | string | object>,
    ) => {
      const mergedChain = isString(chain)
        ? prefix
          ? prefix + '.' + chain
          : chain
        : prefix

      data = chain && typeof chain === 'object' ? chain : data

      const result = chainSelect(lang, mergedChain)

      if (isString(result)) {
        if (data) {
          return result.replace(/\${([^}]*)}/g, (_, p1) => {
            return data[p1] as string
          })
        }

        return result
      }

      return mergedChain
    },
  )

  const select = useEvent((chain?: string) => {
    const mergedChain = isString(chain)
      ? prefix
        ? prefix + '.' + chain
        : chain
      : prefix

    const result = chainSelect(lang, mergedChain)

    return result
  })

  return [translate, select] as const
}

export default useTranslate
