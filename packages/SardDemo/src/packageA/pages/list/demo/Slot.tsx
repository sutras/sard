import { Image, View } from '@tarojs/components'
import { List, Input, Slider, Space, Switch } from 'sard'

export default () => {
  return (
    <List bodyStyle={{ width: 60, flexGrow: 0 }}>
      <List.Item
        bodyStyle={{ width: 90 }}
        title="无线局域网"
        value={<Switch defaultChecked />}
      />
      <List.Item
        title="音量"
        footer={<Slider style={{ width: '100%' }} defaultValue={50} />}
      />
      <List.Item>
        <Space align="center" style={{ padding: 20 }}>
          <Image
            src="https://unpkg.com/@sard/assets@1.2.0/images/logo.png"
            style={{ width: 48, height: 48 }}
          />
          <View style={{ fontSize: 20 }}>这是标题</View>
          <View>
            这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述...
          </View>
        </Space>
      </List.Item>
      <List.Item
        title="用户名"
        footer={<Input inlaid placeholder="请输入用户名" />}
      />
      <List.Item
        title="密码"
        footer={<Input inlaid type="password" placeholder="请输入密码" />}
      />
    </List>
  )
}
