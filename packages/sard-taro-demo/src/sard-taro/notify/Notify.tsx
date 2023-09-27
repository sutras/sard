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
import { Text, View } from '@tarojs/components'
import { Popup, PopupProps } from '../popup'
import { useBem, useSetTimeout } from '../use'
import { filterNullish } from '../utils'
import SafeArea from '../safe-area'

export interface NotifyProps extends Omit<PopupProps, 'children'> {
  type?: 'primary' | 'success' | 'warning' | 'error'
  message?: ReactNode
  duration?: number
  color?: string
  background?: string
  onTimeout?: (visible: false) => void
  visible?: boolean
  onVisible?: (visible: boolean) => void
  placement?: 'top' | 'bottom'
  popupProps?: PopupProps
}

export interface NotifyRef {
  cancelHide: () => void
  hideLater: () => void
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
    contentClass,
    contentStyle,
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

  const [bem] = useBem('notify')

  const [hideLater, cancelHide] = useSetTimeout(
    () => {
      onTimeout?.(false)
      onVisible?.(false)
    },
    duration,
    {
      canDelay: () => duration !== 0,
    },
  )

  useEffect(() => {
    if (visible) {
      hideLater()
    } else {
      cancelHide()
    }
  }, [visible, type, duration])

  useImperativeHandle(
    ref,
    () => ({
      hideLater,
      cancelHide,
    }),
    [],
  )

  return (
    <Popup
      {...(restProps as PopupProps)}
      mask={mask}
      visible={visible}
      effect={mapPlacementEffect[placement]}
      className={classNames(bem.e('popup'), className)}
      style={style}
      contentClass={classNames(bem.b(), bem.m(placement), contentClass)}
      contentStyle={{
        ...contentStyle,
      }}
      onlyPopup
    >
      {placement === 'top' && (
        <SafeArea direction="top" className={bem.e('safe-area')} />
      )}
      <View
        className={classNames(bem.e('content'), bem.em('content', type))}
        style={filterNullish({
          backgroundColor: background,
        })}
      >
        <Text
          className={bem.e('text')}
          style={filterNullish({
            color,
          })}
        >
          {message}
        </Text>
      </View>
      {placement === 'bottom' && (
        <SafeArea direction="bottom" className={bem.e('safe-area')} />
      )}
    </Popup>
  )
})

export default Notify
