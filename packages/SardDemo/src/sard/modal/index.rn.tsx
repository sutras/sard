import { FC } from 'react'
import { Modal as RNModal } from 'react-native'
import { BaseProps } from '../base'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export interface ModalProps extends BaseProps {
  visible?: boolean
  onRequestClose?: () => void
}

export const Modal: FC<ModalProps> = (props) => {
  const { children, visible, onRequestClose } = props

  return (
    <RNModal
      visible={visible}
      statusBarTranslucent={true}
      presentationStyle="overFullScreen"
      transparent={true}
      animationType="none"
      hardwareAccelerated
      onRequestClose={onRequestClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {children}
      </GestureHandlerRootView>
    </RNModal>
  )
}

export default Modal
