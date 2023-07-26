import {
  ReactNode,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import classNames from 'classnames'
import { Popup, PopupProps } from '../popup'
import { useSetTimeout } from '../use'

export interface NotifyProps extends Omit<PopupProps, 'children'> {
  type?: 'primary' | 'success' | 'warning' | 'error'
  message?: ReactNode
  duration?: number
  color?: string
  background?: string
  onTimeout?: (visible: false) => void
  visible?: boolean
  onVisible?: (visible: boolean) => void
  popupProps?: PopupProps
  placement?: 'top' | 'bottom'
}

export interface NotifyRef {
  clear: () => void
  reset: () => void
}

export type NotifyFC = ForwardRefExoticComponent<
  PropsWithoutRef<NotifyProps> & RefAttributes<NotifyRef>
>

const mapPlacementEffect = {
  top: 'slide-top',
  bottom: 'slide-bottom',
} as const

export const Notify: NotifyFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    type = 'primary',
    message,
    duration = 3000,
    color,
    background,
    onTimeout,
    visible = false,
    onVisible,
    placement = 'top',
    mask = false,
    ...restProps
  } = props

  const [reset, clear] = useSetTimeout(
    () => {
      onTimeout?.(false)
      onVisible?.(false)
    },
    duration,
    () => duration !== 0,
  )

  useEffect(() => {
    if (visible) {
      reset()
    } else {
      clear()
    }
  }, [visible, type])

  useImperativeHandle(ref, () => ({
    reset,
    clear,
  }))

  const notifyClass = classNames('sar-notify', 'sar-notify-' + type, className)
  const notifyStyle = {
    color,
    background,
    ...style,
  }

  return (
    <Popup
      {...restProps}
      mask={mask}
      visible={visible}
      effect={mapPlacementEffect[placement]}
      className={notifyClass}
      style={notifyStyle}
    >
      {message}
    </Popup>
  )
})

export default Notify
