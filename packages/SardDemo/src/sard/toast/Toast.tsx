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
import { useBem, useControllableValue, useSetTimeout } from '../use'

export interface ToastProps extends PopupProps {
  type?: 'text' | 'loading' | 'success' | 'fail' | 'custom'
  title?: ReactNode
  icon?: ReactNode
  iconProps?: IconProps
  loadingProps?: LoadingProps
  duration?: number
  onTimeout?: (visible: false) => void
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  placement?: 'top' | 'bottom'
}

export interface ToastRef {
  cancelHide: () => void
  hideLater: () => void
}

export type ToastFC = ForwardRefExoticComponent<
  PropsWithoutRef<ToastProps> & RefAttributes<ToastRef>
>

export const Toast: ToastFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    contentClass,
    contentStyle,
    mask = false,

    type = 'text',
    title,
    icon,
    iconProps,
    loadingProps,
    duration = 1500,
    onTimeout,
    visible,
    defaultVisible,
    onVisible,
    placement,
    ...restProps
  } = props

  const [bem] = useBem('toast')

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  const [hideLater, cancelHide] = useSetTimeout(
    () => {
      onTimeout?.(false)
      setInnerVisible?.(false)
    },
    duration,
    {
      canDelay: () => type !== 'loading' && duration !== 0,
    },
  )

  useEffect(() => {
    if (innerVisible) {
      hideLater()
    } else {
      cancelHide()
    }
  }, [innerVisible])

  useEffect(() => {
    hideLater()
  }, [duration, type])

  useImperativeHandle(
    ref,
    () => ({
      hideLater,
      cancelHide,
    }),
    [],
  )

  const isText = type === 'text' && !icon && !iconProps

  return (
    <Popup
      {...(restProps as PopupProps)}
      visible={innerVisible}
      mask={mask}
      effect="fade"
      className={classNames(
        bem.e('popup'),
        bem.m(placement, placement),
        className,
      )}
      style={style}
      contentClass={classNames(
        bem.b(),
        bem.m('is-text', isText),
        bem.m('not-text', !isText),
        contentClass,
      )}
      contentStyle={contentStyle}
      onlyPopup
    >
      {(type !== 'text' || icon || iconProps) && (
        <View className={bem.e('icon-wrapper')}>
          {icon ||
            (type === 'loading' ? (
              <Loading
                size={36}
                {...loadingProps}
                className={bem.e('loading')}
              />
            ) : (
              <Icon
                name={type}
                {...iconProps}
                className={bem.e('icon')}
                imageClass={bem.e('icon-image')}
                imageMode="aspectFill"
              />
            ))}
        </View>
      )}
      <View className={bem.e('title')}>{title}</View>
    </Popup>
  )
})

export default Toast
