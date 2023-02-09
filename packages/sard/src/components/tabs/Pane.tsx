import { CSSProperties, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'

export interface TabPaneProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  label?: ReactNode | ((active: boolean) => ReactNode)
  labelStyle?: CSSProperties
  labelClass?: string
  innerKey?: number | string
  activeKey?: number | string
  disabled?: boolean
}

export type TabPane = React.ForwardRefExoticComponent<
  TabPaneProps & React.RefAttributes<HTMLElement>
>

export const TabPane = forwardRef<HTMLElement, TabPaneProps>((props, ref) => {
  const {
    className,
    children,
    label,
    labelStyle,
    labelClass,
    innerKey,
    activeKey,
    ...restProps
  } = props

  const active = innerKey === activeKey

  const tabPaneClass = classNames(
    's-tab-pane',
    {
      's-tab-pane-active': active,
    },
    className,
  )

  return (
    <div {...restProps} className={tabPaneClass} ref={ref as any}>
      {children}
    </div>
  )
})

export default TabPane
