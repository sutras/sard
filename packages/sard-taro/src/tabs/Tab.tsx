import { FC, ReactNode, useEffect } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { useBem, useSelectorId } from '../use'
import { isFunction } from '../utils'

export interface TabsTabProps extends Omit<BaseProps, 'children'> {
  children?: ReactNode | ((active: boolean) => ReactNode)
  disabled?: boolean

  isActive?: boolean
  privateKey?: string | number
  onSelect?: (key: string | number) => void
  scrollable?: boolean
  onMounted?: (id: string) => void
  onUnMounted?: () => void
}

export const TabsTab: FC<TabsTabProps> = (props) => {
  const {
    className,
    disabled,
    children,

    privateKey,
    isActive,
    onSelect,
    scrollable,
    onMounted,
    onUnMounted,
    ...restProps
  } = props

  const [bem] = useBem('tabs')

  const selectorId = useSelectorId()

  const handleClick = () => {
    if (!disabled && !isActive) {
      onSelect?.(privateKey)
    }
  }

  useEffect(() => {
    onMounted?.(selectorId)

    return () => {
      onUnMounted?.()
    }
  }, [])

  return (
    <View
      {...restProps}
      className={classNames(
        bem.e('tab'),
        bem.em('tab', 'active', isActive),
        bem.em('tab', 'scrollable', scrollable),
        bem.em('tab', 'disabled', disabled),
        className,
      )}
      onClick={handleClick}
      id={selectorId}
    >
      {isFunction(children) ? children(isActive) : children}
    </View>
  )
}

export default TabsTab
