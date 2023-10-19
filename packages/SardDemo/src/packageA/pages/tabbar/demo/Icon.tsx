import { Tabbar } from 'sard'

export default () => {
  return (
    <Tabbar defaultActiveKey={0}>
      <Tabbar.Item
        iconProps={(active) => ({
          family: 'demo-icons',
          name: active ? 'house-door-fill' : 'house-door',
        })}
      >
        首页
      </Tabbar.Item>
      <Tabbar.Item
        iconProps={(active) => ({
          family: 'demo-icons',
          name: active ? 'cart-fill' : 'cart',
        })}
      >
        购物车
      </Tabbar.Item>
      <Tabbar.Item
        iconProps={(active) => ({
          family: 'demo-icons',
          name: active ? 'chat-dots-fill' : 'chat-dots',
        })}
      >
        消息
      </Tabbar.Item>
      <Tabbar.Item
        iconProps={(active) => ({
          family: 'demo-icons',
          name: active ? 'person-fill' : 'person',
        })}
      >
        我的
      </Tabbar.Item>
    </Tabbar>
  )
}
