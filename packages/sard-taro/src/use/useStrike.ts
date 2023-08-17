import { MutableRefObject, useEffect, useRef } from 'react'
import { createStrike, Strike, PartialConfig } from '../strike'
import { useEvent } from './useEvent'
import { isNullish } from '../utils'

export type UseStrikeConfig = PartialConfig & {
  binding?: boolean
}

export function useStrike(
  elRef: MutableRefObject<HTMLElement>,
  callback: (strike: Strike) => void,
  config: UseStrikeConfig = {},
  dynamicConfig: UseStrikeConfig = {
    binding: true,
  },
) {
  const strike = useRef<Strike>(null)
  const binding = useRef(false)

  const bind = useEvent(() => {
    if (!binding.current && strike.current) {
      strike.current.init()
      callback(strike.current)
      binding.current = true
    }
  })

  const unbind = useEvent(() => {
    if (binding.current && strike.current) {
      strike.current.destroy()
      binding.current = false
    }
  })

  const configure = useEvent((config) => {
    strike.current?.configure(config)
  })

  useEffect(() => {
    if (elRef.current) {
      strike.current = createStrike(elRef.current, {
        ...config,
        ...dynamicConfig,
      })

      if (config?.init) {
        bind()
      }
    }
    return () => {
      unbind()
      strike.current?.destroy()
      strike.current = null
    }
  }, [])

  useEffect(() => {
    if (dynamicConfig) {
      const binding = dynamicConfig.binding
      if (isNullish(binding) || binding) {
        configure(dynamicConfig)
        bind()
      } else {
        unbind()
      }
    }
  }, [dynamicConfig])

  return {
    bind,
    unbind,
    configure,
  }
}
