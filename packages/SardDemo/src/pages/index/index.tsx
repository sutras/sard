import { View, Text, Image } from '@tarojs/components'
import Menu from '@/components/menu'
import { Space } from 'sard'
import './index.scss'

export default () => {
  return (
    <>
      <Space className="demo-index-header">
        <Space direction="horizontal">
          <Image
            className="demo-index-logo"
            src="https://unpkg.com/@sard/assets@1.2.0/images/logo2.png"
          />
          <Text className="demo-index-title">sard</Text>
        </Space>
        <View className="demo-index-desc">
          <Text>Taro React 移动端 UI 组件库</Text>
        </View>
      </Space>
      <Menu />
    </>
  )
}
