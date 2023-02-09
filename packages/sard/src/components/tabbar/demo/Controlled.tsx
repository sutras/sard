/*
### 受控
*/

import { useState } from 'react'
import { Tabbar } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [activeKey, setActiveKey] = useState<number | string>(0)

  return (
    <Tabbar activeKey={activeKey} fixed={false} onChange={setActiveKey}>
      <Tabbar.Item icon={{ name: 'bi-house-door-fill' }}>首页</Tabbar.Item>
      <Tabbar.Item icon={{ name: 'bi-cart-fill' }}>购物车</Tabbar.Item>
      <Tabbar.Item icon={{ name: 'bi-chat-dots-fill' }}>消息</Tabbar.Item>
      <Tabbar.Item icon={{ name: 'bi-person-circle' }}>我的</Tabbar.Item>
    </Tabbar>
  )
}
