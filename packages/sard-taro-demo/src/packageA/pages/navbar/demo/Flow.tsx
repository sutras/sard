import { View } from '@tarojs/components'
import { Icon, Navbar } from 'sard-taro'

export default () => {
  return (
    <Navbar
      flow
      left={
        <Navbar.Item>
          <Icon family="demo-icons" name="list-task" size={18} />
        </Navbar.Item>
      }
      title={<View style={{ textAlign: 'left' }}>发现</View>}
      right={
        <>
          <Navbar.Item>
            <Icon family="demo-icons" name="share" size={16} />
          </Navbar.Item>
          <Navbar.Item>
            <Icon family="demo-icons" name="star" size={18} />
          </Navbar.Item>
          <Navbar.Item>
            <Icon family="demo-icons" name="heart" size={16} />
          </Navbar.Item>
        </>
      }
    />
  )
}
