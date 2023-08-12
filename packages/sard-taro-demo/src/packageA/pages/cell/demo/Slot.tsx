import { Image, View } from '@tarojs/components'
import { Cell, Input, Slider, Switch } from 'sard-taro'

import logo from '@/static/logo.svg'

export default () => {
  return (
    <Cell.Group>
      <Cell title="无线局域网" value={<Switch defaultChecked></Switch>} />
      <Cell
        title="音量"
        bodyStyle={{ maxWidth: 40 }}
        footer={<Slider style={{ width: '100%' }} defaultValue={50}></Slider>}
      />
      <Cell>
        <View style={{ padding: 20 }}>
          <View style={{ textAlign: 'center' }}>
            <Image src={logo} style={{ width: 48 }}></Image>
            <View style={{ fontSize: 20 }}>这是一句简洁</View>
          </View>
          <View
            style={{
              fontSize: 14,
              marginTop: 10,
              color: 'var(--sar-secondary-color)',
            }}
          >
            这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述...
          </View>
        </View>
      </Cell>
      <Cell
        bodyStyle={{ maxWidth: 80 }}
        title="用户名"
        footer={<Input inlaid placeholder="请输入用户名" />}
      />
      <Cell
        bodyStyle={{ maxWidth: 80 }}
        title="密码"
        footer={<Input inlaid type="password" placeholder="请输入密码" />}
      />
    </Cell.Group>
  )
}
