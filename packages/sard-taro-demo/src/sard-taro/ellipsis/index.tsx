import { FC } from 'react'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { isRN } from '../utils'

export interface EllipsisProps extends BaseProps {
  rows?: number
  mode?: 'clip' | 'tail'
}

export const Ellipsis: FC<EllipsisProps> = (props) => {
  const {
    className,
    style,
    children,
    rows = 1,
    mode = 'tail',
    ...restProps
  } = props

  const [bem] = useBem('ellipsis')

  if (isRN) {
    return (
      <Text
        {...restProps}
        numberOfLines={rows}
        className={className}
        {...{ ellipsizeMode: mode }}
        style={style}
      >
        {children}
      </Text>
    )
  }

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m(mode), className)}
      style={{
        WebkitLineClamp: rows,
        ...style,
      }}
    >
      {children}
    </View>
  )
}

export default Ellipsis
