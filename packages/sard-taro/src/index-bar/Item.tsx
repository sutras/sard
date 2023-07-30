import { CSSProperties, forwardRef, ReactNode, useEffect } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useBem, useSelectorId } from '../use'
import { BaseProps } from '../base'

export interface IndexBarItemProps extends BaseProps {
  title?: ReactNode
  offset?: number | string
  anchorClass?: string
  anchorStyle?: CSSProperties
  _onMounted?: (id: string) => void
}

export const IndexBarItem = forwardRef<HTMLElement, IndexBarItemProps>(
  (props, ref) => {
    const {
      className,
      children,
      title,
      offset,
      anchorClass,
      anchorStyle,
      _onMounted,
      ...restProps
    } = props

    const [bem] = useBem('index-bar-item')

    const selectorId = useSelectorId()

    useEffect(() => {
      _onMounted?.(selectorId)
    }, [])

    const itemClass = classNames(bem.b(), className)

    return (
      <View {...restProps} ref={ref} className={itemClass} id={selectorId}>
        <View
          className={classNames(bem.e('anchor'), anchorClass)}
          style={{ ...anchorStyle, top: offset }}
        >
          {title}
        </View>
        <View className={bem.e('content')}>{children}</View>
      </View>
    )
  },
)

export default IndexBarItem
