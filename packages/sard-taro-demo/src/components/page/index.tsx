import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import './index.scss'

type Props = BaseProps

export default (props: Props) => {
  const { className, children, ...restProps } = props

  return (
    <View {...restProps} className={classNames('page', className)}>
      {children}
    </View>
  )
}
