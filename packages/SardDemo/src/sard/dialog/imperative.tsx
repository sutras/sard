import { DialogProps } from './Dialog'
import { mapIdAgent } from './Agent'
import { ReactNode } from 'react'
import { isNotReactNode } from '../utils'

export interface DialogOptions extends DialogProps {
  id?: string
}

export interface DialogShow {
  (options: DialogOptions): void
  (title: ReactNode, options?: DialogOptions): void
}

export interface DialogInternalShow {
  (
    optionsOrTitle: ReactNode | DialogOptions,
    options: DialogOptions,
    internalOptions: DialogOptions,
  ): void
}

const internalShow: DialogInternalShow = (
  optionsOrTitle,
  options,
  internalOptions,
) => {
  if (isNotReactNode(optionsOrTitle)) {
    options = optionsOrTitle as DialogOptions
  } else {
    options.title = optionsOrTitle as ReactNode
  }

  const { id = 'dialog' } = options

  const ref = mapIdAgent[id]

  if (ref) {
    ref.current?.show({
      ...options,
      ...internalOptions,
    })
  }
}

export const show: DialogShow = (optionsOrTitle, options?) => {
  internalShow(optionsOrTitle, options, { showCancel: false })
}

export const alert: DialogShow = (optionsOrTitle, options?) => {
  internalShow(optionsOrTitle, options, { showCancel: false })
}

export const confirm: DialogShow = (optionsOrTitle, options?) => {
  internalShow(optionsOrTitle, options, {
    showCancel: true,
  })
}

export const hide = (id = 'dialog') => {
  mapIdAgent[id]?.current?.hide()
}

export const hideAll = () => {
  Object.keys(mapIdAgent).forEach((key) => mapIdAgent[key]?.current?.hide())
}
