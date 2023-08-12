import { useState } from 'react'
import { Checkbox, Tabbar } from 'sard-taro'

export default () => {
  const [fixed, setFixed] = useState(false)

  return (
    <>
      <Checkbox
        defaultChecked={fixed}
        onChange={setFixed}
        style={{ marginBottom: 20 }}
      >
        固定定位
      </Checkbox>

      <Tabbar defaultActiveKey={0} fixed={fixed}>
        <Tabbar.Item icon={{ prefix: 'demo-icon', name: 'house-door-fill' }}>
          首页
        </Tabbar.Item>
        <Tabbar.Item icon={{ prefix: 'demo-icon', name: 'cart-fill' }}>
          购物车
        </Tabbar.Item>
        <Tabbar.Item icon={{ prefix: 'demo-icon', name: 'chat-dots-fill' }}>
          消息
        </Tabbar.Item>
        <Tabbar.Item icon={{ prefix: 'demo-icon', name: 'person-fill' }}>
          我的
        </Tabbar.Item>
      </Tabbar>
    </>
  )
}
