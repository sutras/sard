import { Tabbar } from 'sard-taro'

export default () => {
  return (
    <Tabbar defaultActiveKey={0} fixed={false}>
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
  )
}
