import { FC } from 'react'
import { View, ITouchEvent } from '@tarojs/components'
import classNames from 'classnames'
import { Icon } from '../icon'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish } from '../utils'

export interface TagProps extends BaseProps {
  theme?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
  plain?: boolean
  round?: boolean
  mark?: boolean
  size?: 'small' | 'medium' | 'large'
  color?: string
  textColor?: string
  closable?: boolean
  onClose?: () => void
  onClick?: (event: ITouchEvent) => void
}

export const Tag: FC<TagProps> = (props) => {
  const {
    className,
    style,
    children,

    theme = 'default',
    plain,
    round,
    mark,
    size = 'medium',
    color,
    textColor,
    closable,
    onClose,
    ...restProps
  } = props

  const [bem] = useBem('tag')

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m(theme),
        bem.m(`${theme}-plain`, plain),
        bem.m(size),
        bem.m('round', round),
        bem.m('mark', mark),
        className,
      )}
      style={{
        ...style,
        ...filterNullish({
          backgroundColor: !plain ? color : null,
          color: plain ? color : textColor,
          borderColor: plain ? color : null,
        }),
      }}
    >
      {children}
      {closable && (
        <Icon
          name="close"
          className={classNames(
            bem.e('close'),
            bem.em('close', theme),
            bem.em('close', `${theme}-plain`, plain),
          )}
          style={filterNullish({
            color: plain ? color : textColor,
          })}
          onClick={onClose}
        />
      )}
    </View>
  )
}

export default Tag
