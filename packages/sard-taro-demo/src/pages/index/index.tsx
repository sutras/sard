import { View, Text, Image } from '@tarojs/components'
import Menu from '@/components/menu'
import { Space } from 'sard-taro'
import logo from '@/static/logo.png'
import './index.scss'

export default () => {
  return (
    <>
      <Space className="demo-index-header">
        <Space direction="horizontal">
          <Image className="demo-index-logo" src={logo} />
          <Text className="demo-index-title">sard-taro</Text>
        </Space>
        <View className="demo-index-desc">
          <Text>Taro React 移动端 UI 组件库</Text>
        </View>
      </Space>
      <Menu />
    </>
  )
}
