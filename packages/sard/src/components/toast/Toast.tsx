import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefExoticComponent,
  ReactNode,
  CSSProperties,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import classNames from 'classnames'
import { Loading, LoadingProps } from '../loading'
import { Popup, PopupProps } from '../popup'
import { Icon } from '../icon'
import { useSetTimeout } from '../../use'

export interface ToastProps {
  className?: string
  style?: CSSProperties
  type?: 'text' | 'loading' | 'success' | 'fail' | 'custom'
  title?: ReactNode
  icon?: ReactNode
  loadingProps?: LoadingProps
  duration?: number
  onTimeout?: () => void
  visible?: boolean
  onVisible?: (visible: boolean) => void
  popupProps?: PopupProps
}

export interface ToastRef {
  clear: () => void
  reset: () => void
}

export interface ToastFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<ToastProps> & RefAttributes<ToastRef>
  > {}

export const Toast: ToastFC = forwardRef((props, ref) => {
  const {
    className,
    type = 'text',
    title,
    icon,
    loadingProps,
    duration = 2000,
    onTimeout,
    visible = false,
    onVisible,
    popupProps = {},
    ...restProps
  } = props

  const {
    mask = false,
    placement = 'center-fade',
    lockScroll = false,
    ...restPopupProps
  } = popupProps

  const { reset, clear } = useSetTimeout(
    () => {
      onTimeout?.()
      onVisible?.(false)
    },
    duration,
    () => type !== 'loading',
  )

  useEffect(() => {
    if (visible) {
      reset()
    } else {
      clear()
    }
  }, [visible])

  useEffect(() => {
    reset()
  }, [duration, type])

  useImperativeHandle(ref, () => ({
    reset,
    clear,
  }))

  const toastClass = classNames(
    's-toast',
    {
      's-toast-text': type === 'text' && !icon,
    },
    className,
  )

  return (
    <Popup
      {...restPopupProps}
      visible={visible}
      placement={placement}
      lockScroll={lockScroll}
      mask={mask}
    >
      <div {...(restProps as any)} className={toastClass}>
        {(type !== 'text' || icon) && (
          <div className="s-toast-icon">
            {icon ||
              (type === 'loading' ? (
                <Loading {...loadingProps}></Loading>
              ) : (
                <Icon prefix="si" name={type} size="1em"></Icon>
              ))}
          </div>
        )}
        <div className="s-toast-title">{title}</div>
      </div>
    </Popup>
  )
})

export default Toast
