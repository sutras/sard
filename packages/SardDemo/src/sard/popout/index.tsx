import { FC, ReactNode, useState } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { Popup, PopupProps } from '../popup'
import { Button, ButtonProps } from '../button'
import { isFunction, isNullish, noop } from '../utils'
import { useEvent, useControllableValue, useBem } from '../use'
import useTranslate from '../locale/useTranslate'
import Ellipsis from '../ellipsis'
import SafeArea from '../safe-area'

const CLOSE = 'close'
const CANCEL = 'cancel'
const CONFIRM = 'confirm'

export type PopoutCloseType = 'close' | 'cancel' | 'confirm'

export interface PopoutProps extends PopupProps {
  title?: ReactNode
  showCancel?: boolean
  cancelText?: ReactNode
  cancelProps?: ButtonProps
  showConfirm?: boolean
  confirmText?: ReactNode
  confirmProps?: ButtonProps
  showClose?: boolean
  showFooter?: boolean
  type?: 'compact' | 'loose'
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  maskClosable?: boolean
  onClose?: () => void | Promise<any>
  onCancel?: () => void | Promise<any>
  onConfirm?: () => void | Promise<any>
}

export const Popout: FC<PopoutProps> = (props) => {
  const { t } = useTranslate('popout')

  const {
    className,
    style,
    children,

    contentClass,
    contentStyle,
    onMaskClick,

    title,
    showCancel = false,
    cancelText = t('cancel'),
    cancelProps,
    showConfirm = true,
    confirmText = t('confirm'),
    confirmProps,
    showClose = true,
    showFooter = true,
    type = 'loose',
    visible,
    defaultVisible,
    onVisible,
    maskClosable = true,
    onClose,
    onCancel,
    onConfirm,
    ...restProps
  } = props

  const [bem] = useBem('popout')

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  const [loading, setLoading] = useState({
    cancel: false,
    confirm: false,
  })

  const perhapsClose = (
    type: PopoutCloseType,
    callback?: () => void | Promise<any>,
  ) => {
    function toggleLoading(play: boolean) {
      setLoading((loading) => ({
        ...loading,
        [type]: play,
      }))
    }

    if (isFunction(callback)) {
      const result = callback()
      if (result instanceof Promise) {
        toggleLoading(true)

        return result
          .then(() => {
            setInnerVisible(false)
          })
          .catch(noop)
          .finally(() => {
            toggleLoading(false)
          })
      }
    }

    setInnerVisible(false)
  }

  const handleRequestClose = useEvent(() => {
    setInnerVisible(false)
  })

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    onMaskClick?.(event)

    if (maskClosable) {
      perhapsClose(CLOSE, onClose)
    }
  })

  const handleClose = useEvent(() => {
    perhapsClose(CLOSE, onClose)
  })

  const handleCancel = useEvent(() => {
    perhapsClose(CANCEL, onCancel)
  })

  const handleConfirm = useEvent(() => {
    perhapsClose(CONFIRM, onConfirm)
  })

  const renderCancelButton = (
    type: ButtonProps['type'],
    theme: ButtonProps['theme'],
    round: boolean,
    placement: string,
  ) => {
    return (
      <Button
        className={classNames(
          bem.e(`${placement}-cancel`),
          bem.e(`${placement}-button`),
        )}
        type={type}
        theme={theme}
        round={round}
        loading={loading.cancel}
        {...cancelProps}
        onClick={handleCancel}
      >
        {cancelText}
      </Button>
    )
  }

  const renderConfirmButton = (
    type: ButtonProps['type'],
    round: boolean,
    placement: string,
  ) => {
    return (
      <Button
        className={classNames(
          bem.e(`${placement}-confirm`),
          bem.e(`${placement}-button`),
        )}
        type={type}
        theme="primary"
        round={round}
        loading={loading.confirm}
        {...confirmProps}
        onClick={handleConfirm}
      >
        {confirmText}
      </Button>
    )
  }

  const renderHeader = () => {
    return (
      <View className={classNames(bem.e('header'), bem.em('header', type))}>
        {type === 'compact' && (
          <View className={bem.e('button-wrap')}>
            {renderCancelButton('pale-text', 'secondary', false, 'header')}
          </View>
        )}

        {!isNullish(title) && (
          <Ellipsis className={bem.e('title')}>{title}</Ellipsis>
        )}

        {type === 'compact' && (
          <View className={bem.e('button-wrap')}>
            {renderConfirmButton('pale-text', false, 'header')}
          </View>
        )}

        {type === 'loose' && showClose && (
          <Button
            className={bem.e('close')}
            type="pale-text"
            theme="secondary"
            size="large"
            onClick={handleClose}
            iconProps={{
              name: 'close',
            }}
          />
        )}
      </View>
    )
  }

  const renderFooter = () => {
    return (
      showFooter &&
      type === 'loose' && (
        <View className={bem.e('footer')}>
          {showCancel && renderCancelButton('pale', 'primary', true, 'footer')}
          {showConfirm && renderConfirmButton('default', true, 'footer')}
        </View>
      )
    )
  }

  return (
    <Popup
      {...restProps}
      effect="slide-bottom"
      visible={innerVisible}
      className={classNames(bem.e('popup'), className)}
      style={style}
      contentClass={classNames(bem.b(), contentClass)}
      contentStyle={contentStyle}
      onMaskClick={handleMaskClick}
      onRequestClose={handleRequestClose}
    >
      {renderHeader()}
      {children}
      {renderFooter()}
      <SafeArea direction="bottom" />
    </Popup>
  )
}

export default Popout
