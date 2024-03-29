import { ReactNode } from 'react'
import { NotifyProps } from './Notify'
import { mapIdAgent } from './Agent'
import { isNotReactNode } from '../utils'

export interface NotifyOptions extends NotifyProps {
  id?: string
}

export interface NotifyShow {
  (options: NotifyOptions): void
  (message: ReactNode, options?: NotifyOptions): void
}

export interface NotifyInternalShow {
  (
    optionsOrMessage: ReactNode | NotifyOptions,
    options?: NotifyOptions,
    innerType?: NotifyOptions['type'],
  ): void
}

const internalShow: NotifyInternalShow = (
  optionsOrMessage,
  options = {},
  internalType,
) => {
  if (isNotReactNode(optionsOrMessage)) {
    options = optionsOrMessage as NotifyOptions
  } else {
    options.message = optionsOrMessage as ReactNode
  }

  options.type = internalType

  const { id = 'notify' } = options

  const ref = mapIdAgent[id]

  if (ref) {
    ref.current?.hideLater()
    ref.current?.show(options)
  }
}

export const show: NotifyShow = (optionsOrMessage, options?) => {
  internalShow(optionsOrMessage, options, 'primary')
}

export const success: NotifyShow = (optionsOrMessage, options?) => {
  internalShow(optionsOrMessage, options, 'success')
}

export const warning: NotifyShow = (optionsOrMessage, options?) => {
  internalShow(optionsOrMessage, options, 'warning')
}

export const error: NotifyShow = (optionsOrMessage, options?) => {
  internalShow(optionsOrMessage, options, 'error')
}

export const hide = (id = 'notify') => {
  mapIdAgent[id]?.current?.hide()
}

export const hideAll = () => {
  Object.keys(mapIdAgent).forEach((key) => mapIdAgent[key]?.current?.hide())
}
