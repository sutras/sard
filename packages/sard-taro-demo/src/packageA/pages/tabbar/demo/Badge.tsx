import { Tabbar } from 'sard-taro'

export default () => {
  return (
    <Tabbar defaultActiveKey={0}>
      <Tabbar.Item
        iconProps={{ family: 'demo-icons', name: 'house-door-fill' }}
      >
        首页
      </Tabbar.Item>
      <Tabbar.Item iconProps={{ family: 'demo-icons', name: 'cart-fill' }}>
        购物车
      </Tabbar.Item>
      <Tabbar.Item
        iconProps={{ family: 'demo-icons', name: 'chat-dots-fill' }}
        badge={{ value: 5 }}
      >
        消息
      </Tabbar.Item>
      <Tabbar.Item
        iconProps={{ family: 'demo-icons', name: 'person-fill' }}
        badge={{ isDot: true, color: 'tomato' }}
      >
        我的
      </Tabbar.Item>
    </Tabbar>
  )
}
