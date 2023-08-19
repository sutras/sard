import { View, Text, Image } from '@tarojs/components'
import Menu from '@/components/menu'
import './index.scss'
import logo from '@/static/logo.svg'

export default () => {
  return (
    <View className="index-page">
      <View className="header">
        <View>
          <View className="flex-row">
            <Image className="logo" src={logo} />
            <Text className="title">sard-taro</Text>
          </View>
          <View className="desc">
            <Text>Taro React 移动端 UI 组件库</Text>
          </View>
        </View>
      </View>

      <Menu></Menu>
    </View>
  )
}
