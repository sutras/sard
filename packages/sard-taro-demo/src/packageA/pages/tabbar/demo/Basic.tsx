import { useState } from 'react'
import { Tabbar } from 'sard-taro'

export default () => {
  const [activeKey, setActiveKey] = useState<number | string>(0)

  return (
    <Tabbar activeKey={activeKey} onChange={setActiveKey}>
      <Tabbar.Item
        iconProps={{ family: 'demo-icons', name: 'house-door-fill' }}
      >
        首页
      </Tabbar.Item>
      <Tabbar.Item iconProps={{ family: 'demo-icons', name: 'cart-fill' }}>
        购物车
      </Tabbar.Item>
      <Tabbar.Item iconProps={{ family: 'demo-icons', name: 'chat-dots-fill' }}>
        消息
      </Tabbar.Item>
      <Tabbar.Item iconProps={{ family: 'demo-icons', name: 'person-fill' }}>
        我的
      </Tabbar.Item>
    </Tabbar>
  )
}
