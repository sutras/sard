import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefExoticComponent,
  ReactNode,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { Loading, LoadingProps } from '../loading'
import { Popup, PopupProps } from '../popup'
import { Icon, IconProps } from '../icon'
import { useSetTimeout } from '../use'
import { BaseProps } from '../base'

export interface ToastProps extends BaseProps, PopupProps {
  type?: 'text' | 'loading' | 'success' | 'fail' | 'custom'
  title?: ReactNode
  icon?: ReactNode
  iconProps?: IconProps
  loadingProps?: LoadingProps
  duration?: number
  onTimeout?: (visible: false) => void
  visible?: boolean
  onVisible?: (visible: boolean) => void
  placement?: 'top' | 'bottom'
}

export interface ToastRef {
  clear: () => void
  reset: () => void
}

export type ToastFC = ForwardRefExoticComponent<
  PropsWithoutRef<ToastProps> & RefAttributes<ToastRef>
>

export const Toast: ToastFC = forwardRef((props, ref) => {
  const {
    className,
    type = 'text',
    title,
    icon,
    iconProps,
    loadingProps,
    duration = 2000,
    onTimeout,
    visible = false,
    onVisible,
    placement,
    mask = false,
    ...restProps
  } = props

  const [reset, clear] = useSetTimeout(
    () => {
      onTimeout?.(false)
      onVisible?.(false)
    },
    duration,
    () => type !== 'loading' && duration !== 0,
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
    'sar-toast',
    {
      'sar-toast-text': type === 'text' && !icon && !iconProps,
      [`sar-toast-${placement}`]: placement,
    },
    className,
  )

  return (
    <Popup
      {...restProps}
      visible={visible}
      mask={mask}
      effect="fade"
      className={toastClass}
    >
      {(type !== 'text' || icon || iconProps) && (
        <View className="sar-toast-icon">
          {icon ||
            (type === 'loading' ? (
              <Loading
                className="sar-toast-loading"
                color="inherit"
                size={32}
                {...loadingProps}
              ></Loading>
            ) : (
              <Icon name={type} size="1em" {...iconProps}></Icon>
            ))}
        </View>
      )}
      <View className="sar-toast-title">{title}</View>
    </Popup>
  )
})

export default Toast
