import { Text } from '@tarojs/components'
import { Icon, Input, Navbar } from 'sard-taro'

export default () => {
  return (
    <Navbar
      flow
      left={
        <Navbar.Item>
          <Text style={{ marginRight: 2 }}>城市</Text>
          <Icon name="down" size={16} />
        </Navbar.Item>
      }
      right={<Navbar.Item>搜索</Navbar.Item>}
    >
      <Input placeholder="请输入关键词" style={{ borderRadius: 9999 }} />
    </Navbar>
  )
}
