import { ReactNode } from 'react'
import { ToastProps } from './Toast'
import { mapIdAgent } from './Agent'
import { isNotReactNode } from '../utils'

export interface ToastOptions extends ToastProps {
  id?: string
}

export interface ToastShow {
  (options: ToastOptions): void
  (title: ReactNode, options?: ToastOptions): void
}

export interface ToastInternalShow {
  (
    optionsOrTitle: ReactNode | ToastOptions,
    options?: ToastOptions,
    internalType?: ToastOptions['type'],
  ): void
}

const internalShow: ToastInternalShow = (
  optionsOrTitle,
  options = {},
  internalType = 'text',
) => {
  if (isNotReactNode(optionsOrTitle)) {
    options = optionsOrTitle as ToastOptions
  } else {
    options.title = optionsOrTitle as ReactNode
  }

  options.type = internalType

  const { id = 'toast' } = options

  const ref = mapIdAgent[id]

  if (ref) {
    ref.current?.reset()
    ref.current?.show(options)
  }
}

export const show: ToastShow = (optionsOrTitle, options?) => {
  internalShow(optionsOrTitle, options)
}

export const success: ToastShow = (optionsOrTitle, options?) => {
  internalShow(optionsOrTitle, options, 'success')
}

export const fail: ToastShow = (optionsOrTitle, options?) => {
  internalShow(optionsOrTitle, options, 'fail')
}

export const loading: ToastShow = (optionsOrTitle, options?) => {
  internalShow(optionsOrTitle, options, 'loading')
}

export const hide = (id = 'toast') => {
  mapIdAgent[id]?.current?.hide()
}

export const hideAll = () => {
  Object.keys(mapIdAgent).forEach((key) => mapIdAgent[key]?.current?.hide())
}
