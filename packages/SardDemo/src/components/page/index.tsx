import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { ActionSheet, Dialog, Notify, SafeArea, Toast } from 'sard'

import './index.scss'

interface PageProps extends BaseProps {
  emphasis?: boolean
}

export default (props: PageProps) => {
  const { className, children, style, emphasis, ...restProps } = props

  return (
    <View
      {...restProps}
      className={classNames(
        'demo-page',
        {
          'demo-page-emphasis': emphasis,
        },
        className,
      )}
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
