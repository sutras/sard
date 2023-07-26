import { DialogProps } from './Dialog'
import { mapIdAgent, DialogAgent } from './Agent'
import { mountAgent } from '../utils/imperative'

export interface DialogOptions extends DialogProps {
  id?: string
}

export const show = (options: DialogOptions) => {
  const { id = 'dialog' } = options

  const ref = mapIdAgent[id]

  if (ref) {
    ref.current?.show(options)
  } else {
    mountAgent(id, DialogAgent, mapIdAgent, options)
  }
}

export const alert = (options: DialogOptions) => {
  show({ ...options, showCancel: false })
}

export const confirm = (options: DialogOptions) => {
  show({ ...options, showCancel: true })
}
