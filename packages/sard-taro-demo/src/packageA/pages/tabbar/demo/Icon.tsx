import { Icon, Tabbar } from 'sard-taro'

export default () => {
  return (
    <Tabbar defaultActiveKey={0} fixed={false}>
      <Tabbar.Item
        icon={(active) => (
          <Icon
            prefix="demo-icon"
            name={active ? 'house-door-fill' : 'house-door'}
          />
        )}
      >
        首页
      </Tabbar.Item>
      <Tabbar.Item
        icon={(active) => (
          <Icon prefix="demo-icon" name={active ? 'cart-fill' : 'cart'} />
        )}
      >
        购物车
      </Tabbar.Item>
      <Tabbar.Item
        icon={(active) => (
          <Icon
            prefix="demo-icon"
            name={active ? 'chat-dots-fill' : 'chat-dots'}
          />
        )}
      >
        消息
      </Tabbar.Item>
      <Tabbar.Item
        icon={(active) => (
          <Icon prefix="demo-icon" name={active ? 'person-fill' : 'person'} />
        )}
      >
        我的
      </Tabbar.Item>
    </Tabbar>
  )
}
