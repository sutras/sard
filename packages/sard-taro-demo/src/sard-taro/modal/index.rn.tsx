import { FC } from 'react'
import { Modal as RNModal } from 'react-native'
import { BaseProps } from '../base'

export interface ModalProps extends BaseProps {
  visible?: boolean
}

export const Modal: FC<ModalProps> = (props) => {
  const { children, visible } = props

  return (
    <RNModal
      visible={visible}
      statusBarTranslucent={true}
      presentationStyle="overFullScreen"
      transparent={true}
      animationType="none"
    >
      {children}
    </RNModal>
  )
}

export default Modal
