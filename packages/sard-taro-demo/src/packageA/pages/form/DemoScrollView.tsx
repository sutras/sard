import { View, ScrollView } from '@tarojs/components'
import { FC, ReactNode } from 'react'
import { Halfline, isMP } from 'sard-taro'
import { systemInfo } from './DemoPopup'

interface DemoScrollViewProps {
  children?: ReactNode
  footer?: ReactNode
}

const CustomScrollView = ({ children, style }) => {
  // ios小程序端 ScrollView 里面固定定位的元素会变为绝对定位，因此需要 View 模拟 ScrollView
  if (isMP) {
    return (
      <View style={{ ...style, overflowY: 'scroll', overflowX: 'hidden' }}>
        {children}
      </View>
    )
  }

  return (
    <ScrollView scrollY style={style}>
      {children}
    </ScrollView>
  )
}

const DemoScrollView: FC<DemoScrollViewProps> = (props) => {
  const { children, footer } = props

  return (
    <>
      <CustomScrollView style={{ height: systemInfo.windowHeight * 0.65 }}>
        <View style={{ paddingTop: 15, paddingBottom: 15 }}>{children}</View>
      </CustomScrollView>
      <View
        style={{
          position: 'relative',
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: 'white',
        }}
      >
        <Halfline direction="top" />
        {footer}
      </View>
    </>
  )
}

export default DemoScrollView
