import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { Popup, PopupProps } from '../popup'
import { Button, ButtonProps } from '../button'
import { Icon } from '../icon'
import { useBem, useEvent } from '../use'
import useTranslate from '../locale/useTranslate'
import { BaseProps } from '../base'

const CANCEL = 'cancel'
const CONFIRM = 'confirm'

const buttonProps: {
  [p in DialogButtonType]: {
    [p in 'cancel' | 'confirm']: ButtonProps
  }
} = {
  text: {
    cancel: {
      type: 'text',
      theme: 'secondary',
      size: 'large',
    },
    confirm: {
      type: 'text',
      theme: 'primary',
      size: 'large',
    },
  },
  round: {
    cancel: {
      type: 'pale',
      theme: 'primary',
      round: true,
    },
    confirm: {
      type: 'default',
      theme: 'primary',
      round: true,
    },
  },
}

type CloseType = 'cancel' | 'confirm'

type DialogButtonType = 'round' | 'text'

export interface DialogProps extends BaseProps, PopupProps {
  title?: ReactNode
  message?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  headed?: boolean
  buttonType?: DialogButtonType
  showCancel?: boolean
  cancelText?: ReactNode
  cancelProps?: ButtonProps
  showConfirm?: boolean
  confirmText?: ReactNode
  confirmProps?: ButtonProps
  maskClosable?: boolean
  onCancel?: () => void
  onConfirm?: () => void
  beforeClose?: (done: () => void, type: CloseType) => Promise<unknown> | void
  visible?: boolean
  onVisible?: (visible: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DialogRef {}

export type DialogFC = ForwardRefExoticComponent<
  PropsWithoutRef<DialogProps> & RefAttributes<DialogRef>
>

export const Dialog: DialogFC = forwardRef<DialogRef, DialogProps>(
  (props, ref) => {
    const [t] = useTranslate('dialog')

    const {
      className,
      children,
      title,
      message,
      header,
      headed,
      footer,
      buttonType = 'text',
      showCancel = false,
      cancelText = t('cancel'),
      cancelProps,
      showConfirm = true,
      confirmText = t('confirm'),
      confirmProps,
      maskClosable = false,
      onCancel,
      onConfirm,
      beforeClose,
      onVisible,

      onMaskClick,
      ...restProps
    } = props

    const [bem] = useBem('dialog')

    const [loading, setLoading] = useState({
      cancel: false,
      confirm: false,
    })

    const handleMaskClick = useEvent((event: ITouchEvent) => {
      onMaskClick?.(event)

      if (maskClosable) {
        onCancel?.()
      }
    })

    const handleClose = () => {
      perhapsClose(CANCEL, onCancel)
    }
    const handleCancel = () => {
      perhapsClose(CANCEL, onCancel)
    }
    const handleConfirm = () => {
      perhapsClose(CONFIRM, onConfirm)
    }

    const perhapsClose = (
      type: CloseType,
      callback: (() => void) | undefined,
    ) => {
      function toggleLoading(play: boolean) {
        setLoading((loading) => ({
          ...loading,
          [type]: play,
        }))
      }

      function didClose() {
        onVisible?.(false)
        callback?.()
      }

      if (beforeClose) {
        toggleLoading(true)

        const beforeResult = beforeClose(() => {
          toggleLoading(false)
          didClose()
        }, type)

        if (beforeResult instanceof Promise) {
          beforeResult
            .then(() => {
              didClose()
            })
            .finally(() => {
              toggleLoading(false)
            })
        }
      } else {
        didClose()
      }
    }

    useImperativeHandle(ref, () => ({}))

    const dialogClass = classNames(bem.b(), bem.m('headed', headed), className)

    const renderTitle = () => {
      return (
        <View
          className={classNames(
            bem.e('title'),
            bem.em('title', 'headed', headed),
          )}
        >
          {title}
        </View>
      )
    }

    return (
      <Popup
        {...restProps}
        effect="zoom"
        mask
        onMaskClick={handleMaskClick}
        className={dialogClass}
      >
        {headed && (
          <View
            className={classNames(
              bem.e('header'),
              bem.em('header', 'titled', !!title),
            )}
          >
            {header || renderTitle()}

            <Button
              className={bem.e('close')}
              type="pale-text"
              theme="secondary"
              size="large"
              onClick={handleClose}
            >
              <Icon name="close"></Icon>
            </Button>
          </View>
        )}
        <View
          className={classNames(
            bem.e('body'),
            bem.em('body', 'untitled', !title),
          )}
        >
          {children ?? (
            <>
              {!headed && title && renderTitle()}
              {message && (
                <View
                  className={classNames(
                    bem.e('message'),
                    bem.em('message', 'headless-titled', !headed && !!title),
                  )}
                >
                  {message}
                </View>
              )}
            </>
          )}
        </View>
        <View
          className={classNames(
            bem.e('footer'),
            bem.em('footer', 'text-button', buttonType === 'text'),
            bem.em('footer', 'round-button', buttonType === 'round'),
          )}
        >
          {footer || (
            <>
              {showCancel && (
                <Button
                  {...buttonProps[buttonType].cancel}
                  className={classNames(
                    bem.e('button'),
                    bem.e('cancel'),
                    bem.em('button', 'text', buttonType === 'text'),
                    bem.em('button', 'text-first', buttonType === 'text'),
                    bem.em(
                      'button',
                      'text-last',
                      buttonType === 'text' && !showConfirm,
                    ),
                  )}
                  {...cancelProps}
                  block
                  loading={loading.cancel}
                  onClick={handleCancel}
                >
                  {cancelText}
                </Button>
              )}
              {showCancel && buttonType === 'text' && (
                <View className={bem.e('divider')}></View>
              )}
              {showConfirm && (
                <Button
                  {...buttonProps[buttonType].confirm}
                  className={classNames(
                    bem.e('button'),
                    bem.e('confirm'),
                    bem.em('button', 'text', buttonType === 'text'),
                    bem.em('button', 'text-last', buttonType === 'text'),
                    bem.em(
                      'button',
                      'text-first',
                      buttonType === 'text' && !showCancel,
                    ),
                    bem.em(
                      'button',
                      'round-later',
                      showCancel && buttonType === 'round',
                    ),
                  )}
                  {...confirmProps}
                  block
                  loading={loading.confirm}
                  onClick={handleConfirm}
                >
                  {confirmText}
                </Button>
              )}
            </>
          )}
        </View>
      </Popup>
    )
  },
)

export default Dialog
