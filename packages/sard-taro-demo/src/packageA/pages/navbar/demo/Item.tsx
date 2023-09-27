import { Text } from '@tarojs/components'
import { Icon, Navbar } from 'sard-taro'

export default () => {
  return (
    <Navbar
      title="标题"
      left={
        <Navbar.Item onClick={() => console.log('返回')}>
          <Icon name="left" size={16} />
          <Text>返回</Text>
        </Navbar.Item>
      }
      right={
        <Navbar.Item onClick={() => console.log('查看信息')}>
          <Icon family="demo-icons" name="list-task" size={20} />
        </Navbar.Item>
      }
    />
  )
}
