import { View } from '@tarojs/components'
import { ReactNode } from 'react'
import classNames from 'classnames'
import { BaseProps } from '../base'
import './index.scss'

interface Props extends BaseProps {
  title: ReactNode
  full?: boolean
}

export default (props: Props) => {
  const { title, full, children } = props

  return (
    <>
      <View className="demo-title">
        <View className="demo-title-line" />
        {title}
      </View>

      {full ? (
        children
      ) : (
        <View
          className={classNames('demo-body', {
            'demo-full': full,
          })}
        >
          {children}
        </View>
      )}

      <View style={{ marginBottom: 40 }}></View>
    </>
  )
}
