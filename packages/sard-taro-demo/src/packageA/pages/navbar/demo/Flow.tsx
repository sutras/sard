import { View } from '@tarojs/components'
import { Icon, Navbar } from 'sard-taro'

export default () => {
  return (
    <Navbar
      flow
      left={
        <Navbar.Item>
          <Icon prefix="demo-icon" name="list-task" size={18}></Icon>
        </Navbar.Item>
      }
      title={<View style={{ textAlign: 'left' }}>发现</View>}
      right={
        <>
          <Navbar.Item>
            <Icon prefix="demo-icon" name="share" size={16}></Icon>
          </Navbar.Item>
          <Navbar.Item>
            <Icon prefix="demo-icon" name="star" size={18}></Icon>
          </Navbar.Item>
          <Navbar.Item>
            <Icon prefix="demo-icon" name="heart" size={16}></Icon>
          </Navbar.Item>
        </>
      }
    />
  )
}
