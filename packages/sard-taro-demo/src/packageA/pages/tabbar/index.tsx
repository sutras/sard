import Demo from '@/components/demo'
import Page from '@/components/page'
import { useState } from 'react'
import { Checkbox, Icon, Tabbar } from 'sard-taro'

import './index.scss'

export default () => {
  const [fixed, setFixed] = useState(false)

  return (
    <Page className="page-tabbar">
      <Demo title="基础使用" full>
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
      </Demo>

      <Demo title="自定义图标" full>
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
              <Icon
                prefix="demo-icon"
                name={active ? 'person-fill' : 'person'}
              />
            )}
          >
            我的
          </Tabbar.Item>
        </Tabbar>
      </Demo>

      <Demo title="自定义颜色" full>
        <Tabbar
          defaultActiveKey={0}
          fixed={false}
          color="var(--sar-tertiary-color)"
          activeColor="#D33832"
        >
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
      </Demo>

      <Demo title="固定定位" full>
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
      </Demo>

      <Demo title="徽标" full>
        <Tabbar defaultActiveKey={0} fixed={false}>
          <Tabbar.Item icon={{ prefix: 'demo-icon', name: 'house-door-fill' }}>
            首页
          </Tabbar.Item>
          <Tabbar.Item icon={{ prefix: 'demo-icon', name: 'cart-fill' }}>
            购物车
          </Tabbar.Item>
          <Tabbar.Item
            icon={{ prefix: 'demo-icon', name: 'chat-dots-fill' }}
            badge={{ value: 5 }}
          >
            消息
          </Tabbar.Item>
          <Tabbar.Item
            icon={{ prefix: 'demo-icon', name: 'person-fill' }}
            badge={{ isDot: true, color: 'orange' }}
          >
            我的
          </Tabbar.Item>
        </Tabbar>
      </Demo>
    </Page>
  )
}
