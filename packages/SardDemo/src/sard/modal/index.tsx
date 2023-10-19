import { FC } from 'react'
import { BaseProps } from '../base'

export interface ModalProps extends BaseProps {
  visible?: boolean
  onRequestClose?: () => void
}

export const Modal: FC<ModalProps> = (props) => {
  const { children, visible } = props

  if (!visible) {
    return null
  }

  return <>{children}</>
}

export default Modal
