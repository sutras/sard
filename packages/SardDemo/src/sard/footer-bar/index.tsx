import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import Halfline from '../halfline'
import { filterNullish } from '../utils'

export interface FooterBarProps extends BaseProps {
  showLine?: boolean
  gap?: number
}

export const FooterBar: FC<FooterBarProps> = (props) => {
  const {
    className,
    style,
    children,
    showLine = true,
    gap,
    ...restProps
  } = props

  const [bem] = useBem('footer-bar')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={{
        ...style,
        ...filterNullish({ gap }),
      }}
    >
      {showLine && <Halfline direction="top" />}
      {children}
    </View>
  )
}

export default FooterBar
