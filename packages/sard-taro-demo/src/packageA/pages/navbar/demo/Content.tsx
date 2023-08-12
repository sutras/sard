import { View } from '@tarojs/components'
import { Icon, Input, Navbar } from 'sard-taro'

export default () => {
  return (
    <Navbar
      flow
      left={
        <Navbar.Item>
          <View style={{ marginRight: 2 }}>城市</View>
          <Icon name="down" size={16}></Icon>
        </Navbar.Item>
      }
      right={<Navbar.Item>搜索</Navbar.Item>}
    >
      <Input placeholder="请输入关键词" />
    </Navbar>
  )
}
