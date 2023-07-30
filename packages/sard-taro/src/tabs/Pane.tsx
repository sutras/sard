import {
  Component,
  CSSProperties,
  forwardRef,
  ReactNode,
  useEffect,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { useBem, useSelectorId } from '../use'

export interface TabPaneProps extends BaseProps {
  label?: ReactNode | ((active: boolean) => ReactNode)
  labelStyle?: CSSProperties
  labelClass?: string
  innerKey?: number | string
  activeKey?: number | string
  disabled?: boolean
  _onMounted?: (id: string) => void
}

export type TabsPane = React.ForwardRefExoticComponent<
  TabPaneProps & React.RefAttributes<HTMLElement>
>

export const TabsPane = forwardRef<Component, TabPaneProps>((props, ref) => {
  const {
    className,
    children,
    label,
    labelStyle,
    labelClass,
    innerKey,
    activeKey,
    _onMounted,
    ...restProps
  } = props

  const [bem] = useBem('tabs')

  void label, labelStyle, labelClass

  const selectorId = useSelectorId()

  useEffect(() => {
    _onMounted(selectorId)
  }, [])

  const active = innerKey === activeKey

  const tabPaneClass = classNames(bem.em('pane', 'active', active), className)

  return (
    <View {...restProps} className={tabPaneClass} id={selectorId} ref={ref}>
      {children}
    </View>
  )
})

export default TabsPane
