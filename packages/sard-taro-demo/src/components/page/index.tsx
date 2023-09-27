import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import './index.scss'
import { ActionSheet, Dialog, Notify, SafeArea, Toast } from 'sard-taro'

type Props = BaseProps

export default (props: Props) => {
  const { className, children, style, ...restProps } = props

  return (
    <View
      {...restProps}
      className={classNames('page', className)}
      style={style}
    >
      {children}
      <SafeArea direction="bottom" />
      {process.env.TARO_ENV !== 'rn' && (
        <>
          <Toast.Agent />
          <Notify.Agent />
          <Dialog.Agent />
          <ActionSheet.Agent />
        </>
      )}
    </View>
  )
}
