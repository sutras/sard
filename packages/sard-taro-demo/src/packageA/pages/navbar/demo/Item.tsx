import { View } from '@tarojs/components'
import { Icon, Navbar } from 'sard-taro'

export default () => {
  return (
    <Navbar
      title="标题"
      left={
        <Navbar.Item onClick={() => console.log('返回')}>
          <Icon name="left" size={16}></Icon>
          <View>返回</View>
        </Navbar.Item>
      }
      right={
        <Navbar.Item onClick={() => console.log('查看信息')}>
          <Icon name="list-task" size={20}></Icon>
        </Navbar.Item>
      }
    />
  )
}
