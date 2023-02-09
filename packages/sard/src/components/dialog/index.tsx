import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  CSSProperties,
  useState,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import classNames from 'classnames'
import { Popup, PopupProps } from '../popup'
import { Button, ButtonProps } from '../button'
import { Icon } from '../icon'
import { useEvent } from '../../use'

import { DialogAgent } from './Agent'
import { show, alert, confirm } from './imperative'

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

export interface DialogProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
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
  beforeClose?: (done: () => void, type: CloseType) => void
  visible?: boolean
  onVisible?: (visible: boolean) => void
  popupProps?: PopupProps
}

export interface DialogRef {}

export interface DialogFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<DialogProps> & RefAttributes<DialogRef>
  > {
  show: typeof show
  alert: typeof alert
  confirm: typeof confirm
  Agent: typeof DialogAgent
}

export const Dialog: DialogFC = forwardRef<DialogRef, DialogProps>(
  (props, ref) => {
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
      cancelText = '取消',
      cancelProps,
      showConfirm = true,
      confirmText = '确定',
      confirmProps,
      maskClosable = false,
      onCancel,
      onConfirm,
      beforeClose,
      visible = false,
      onVisible,
      popupProps = {},
      ...restProps
    } = props

    const {
      mask = true,
      placement = 'center',
      onMaskClick,
      ...restPopupProps
    } = popupProps

    const [loading, setLoading] = useState({
      cancel: false,
      confirm: false,
    })

    const handleMaskClick = useEvent(() => {
      onMaskClick?.()

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
      if (beforeClose) {
        setLoading((loading) => ({
          ...loading,
          [type]: true,
        }))

        beforeClose(() => {
          setLoading((loading) => ({
            ...loading,
            [type]: false,
          }))

          onVisible?.(false)
          callback?.()
        }, type)
      } else {
        onVisible?.(false)
        callback?.()
      }
    }

    useImperativeHandle(ref, () => ({}))

    const dialogClass = classNames(
      's-dialog',
      {
        's-dialog-headed': headed,
        's-dialog-untitled': !title,
        's-dialog-round-button': buttonType === 'round',
      },
      className,
    )

    const renderTitle = () => {
      return <div className="s-dialog-title">{title}</div>
    }

    return (
      <Popup
        {...restPopupProps}
        visible={visible}
        placement={placement}
        mask={mask}
        onMaskClick={handleMaskClick}
      >
        <div {...restProps} className={dialogClass}>
          {headed && (
            <div className="s-dialog-header">
              {header || renderTitle()}

              <Button
                className="s-dialog-close"
                type="pale-text"
                theme="secondary"
                size="large"
                onClick={handleClose}
              >
                <Icon prefix="si" name="close"></Icon>
              </Button>
            </div>
          )}
          <div className="s-dialog-body">
            {children || (
              <>
                {!headed && title && renderTitle()}
                {message && <div className="s-dialog-message">{message}</div>}
              </>
            )}
          </div>
          <div className="s-dialog-footer">
            {footer || (
              <>
                {showCancel && (
                  <Button
                    {...buttonProps[buttonType].cancel}
                    className="s-dialog-button s-dialog-cancel"
                    {...cancelProps}
                    loading={loading.cancel}
                    onClick={handleCancel}
                  >
                    {cancelText}
                  </Button>
                )}
                {showConfirm && (
                  <Button
                    {...buttonProps[buttonType].confirm}
                    className="s-dialog-button s-dialog-confirm"
                    {...confirmProps}
                    loading={loading.confirm}
                    onClick={handleConfirm}
                  >
                    {confirmText}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Popup>
    )
  },
) as DialogFC

Dialog.show = show
Dialog.alert = alert
Dialog.confirm = confirm
Dialog.Agent = DialogAgent

export { DialogAgent }

export default Dialog
