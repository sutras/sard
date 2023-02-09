/*
### 自定义图标

传递接收当前活动状态作为参数的函数并返回 ReactNode
*/

import { Tabbar, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <Tabbar defaultActiveKey={0} fixed={false}>
      <Tabbar.Item
        icon={(active) => (
          <Icon name={active ? 'bi-house-door-fill' : 'bi-house-door'} />
        )}
      >
        首页
      </Tabbar.Item>
      <Tabbar.Item icon={{ name: 'bi-cart-fill' }}>购物车</Tabbar.Item>
      <Tabbar.Item icon={{ name: 'bi-chat-dots-fill' }}>消息</Tabbar.Item>
      <Tabbar.Item icon={{ name: 'bi-person-circle' }}>我的</Tabbar.Item>
    </Tabbar>
  )
}
