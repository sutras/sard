# Tabbar 标签栏

### 介绍

固定在页面底部的导航栏，用于切换不同的页面。

### 引入

```js
import { Tabbar } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
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
```

### 自定义图标

```tsx
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
      <Icon prefix="demo-icon" name={active ? 'chat-dots-fill' : 'chat-dots'} />
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
```

### 自定义颜色

```tsx
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
```

### 固定定位

```tsx
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
```

### 徽标

```tsx
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
```

## API

### TabbarProps

| 属性             | 描述                          | 类型                            | 默认值 |
| ---------------- | ----------------------------- | ------------------------------- | ------ |
| activeKey        | 当前选中标签的 `key` 或索引值 | number \| string                | -      |
| defaultActiveKey | 默认选中标签的 `key` 或索引值 | number \| string                | -      |
| color            | 未选中标签的颜色              | string                          | -      |
| activeColor      | 选中标签的颜色                | string                          | -      |
| fixed            | 是否固定在底部                | boolean                         | true   |
| zIndex           | 固定时的层级                  | boolean                         | -      |
| onChange         | 切换标签时触发                | (key: number \| string) => void | -      |

### TabbarItemProps

| 属性        | 描述             | 类型                                                | 默认值 |
| ----------- | ---------------- | --------------------------------------------------- | ------ |
| key         | 对应 `activeKey` | string \| number                                    | -      |
| icon        | 自定义图标       | IconProps \| ((active: boolean) => React.ReactNode) | -      |
| color       | 未选中标签的颜色 | string                                              | -      |
| activeColor | 选中标签的颜色   | string                                              | -      |
| badge       | 添加徽标         | BadgeProps                                          | -      |

## 主题定制

### CSS 变量

%{variables}
