/*
### 固定定位
*/

import { useState } from 'react'
import { Tabbar, Checkbox } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
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
        <Tabbar.Item icon={{ name: 'bi-house-door-fill' }}>首页</Tabbar.Item>
        <Tabbar.Item icon={{ name: 'bi-cart-fill' }}>购物车</Tabbar.Item>
        <Tabbar.Item icon={{ name: 'bi-chat-dots-fill' }}>消息</Tabbar.Item>
        <Tabbar.Item icon={{ name: 'bi-person-circle' }}>我的</Tabbar.Item>
      </Tabbar>
    </>
  )
}
