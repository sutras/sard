import { CSSProperties, ForwardedRef, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface TabPaneProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  label?: ReactNode | ((active: boolean) => ReactNode)
  labelStyle?: CSSProperties
  labelClass?: string
  name?: any
  activeKey?: any
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
    name,
    activeKey,
    ...restProps
  } = props

  const active = name === activeKey

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
