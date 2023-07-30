# ShareSheet 分享面板

### 介绍

从底部向上弹出分享菜单。

### 引入

```js
import { ShareSheet } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
export default () => {
  const [visible, setVisible] = useState(false)

  const handleSelect = (item: ShareSheetItemProps) => {
    Toast.show(item.name)
  }

  const itemList: ShareSheetItemList = [
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      icon: {
        prefix: 'demo-icon',
        name: 'wechat-fill',
      },
    },
    {
      name: 'Alipay',
      color: '#fff',
      background: '#1677ff',
      icon: {
        prefix: 'demo-icon',
        name: 'alipay-fill',
      },
    },
    {
      name: 'Twitter',
      color: '#fff',
      background: '#1d9bf0',
      icon: {
        prefix: 'demo-icon',
        name: 'twitter-fill',
      },
    },
    {
      name: 'Facebook',
      color: '#fff',
      background: '#1877f2',
      icon: {
        prefix: 'demo-icon',
        name: 'facebook-circle-fill',
      },
    },
  ]

  return (
    <Cell.Group card>
      <Cell linkable title="显示分享面板" onClick={() => setVisible(true)} />
    </Cell.Group>

    <ShareSheet
      visible={visible}
      itemList={itemList}
      cancel="取消"
      actionClosable
      onSelect={handleSelect}
      onClose={setVisible}
    />
  )
}
```

### 多行

`itemList`属性值如果为二维数组可以渲染成多行。

```tsx
const itemList: ShareSheetItemList = [
  [
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      icon: {
        prefix: 'demo-icon',
        name: 'wechat-fill',
      },
    },
    {
      name: 'Alipay',
      color: '#fff',
      background: '#1677ff',
      icon: {
        prefix: 'demo-icon',
        name: 'alipay-fill',
      },
    },
    {
      name: 'Twitter',
      color: '#fff',
      background: '#1d9bf0',
      icon: {
        prefix: 'demo-icon',
        name: 'twitter-fill',
      },
    },
    {
      name: 'Facebook',
      color: '#fff',
      background: '#1877f2',
      icon: {
        prefix: 'demo-icon',
        name: 'facebook-circle-fill',
      },
    },
  ],
  [
    {
      name: 'Spotify',
      color: '#fff',
      background: '#1ed760',
      icon: {
        prefix: 'demo-icon',
        name: 'spotify-fill',
      },
    },
    {
      name: 'Skype',
      color: '#fff',
      background: '#0b64a4',
      icon: {
        prefix: 'demo-icon',
        name: 'skype-fill',
      },
    },
    {
      name: 'Youtube',
      color: '#fff',
      background: '#ff0000',
      icon: {
        prefix: 'demo-icon',
        name: 'youtube-fill',
      },
    },
    {
      name: 'Paypal',
      color: '#fff',
      background: '#0070ba',
      icon: {
        prefix: 'demo-icon',
        name: 'paypal-fill',
      },
    },
    {
      name: 'Whatsapp',
      color: '#fff',
      background: '#128c7e',
      icon: {
        prefix: 'demo-icon',
        name: 'whatsapp-fill',
      },
    },
    {
      name: 'Telegram',
      color: '#fff',
      background: '#0088cc',
      icon: {
        prefix: 'demo-icon',
        name: 'telegram-fill',
      },
    },
    {
      name: 'Snapchat',
      color: '#000',
      background: '#fffc00',
      icon: {
        prefix: 'demo-icon',
        name: 'snapchat-fill',
      },
    },
  ],
]
```

### 描述

```tsx
<ShareSheet
  visible={visible}
  itemList={itemList}
  title="分享到"
  description="这是描述"
  cancel="取消"
  actionClosable
  onSelect={handleSelect}
  onClose={setVisible}
/>
```

### 图片类型图标

```tsx
import pic1 from '@/static/pic1.jpg'

const itemList: ShareSheetItemList = [
  {
    name: 'Sard',
    icon: pic1,
  },
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    icon: {
      prefix: 'demo-icon',
      name: 'wechat-fill',
    },
  },
]
```

### 禁用

```tsx
const itemList: ShareSheetItemList = [
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    icon: {
      prefix: 'demo-icon',
      name: 'wechat-fill',
    },
    disabled: true,
  },
  {
    name: 'Alipay',
    color: '#fff',
    background: '#1677ff',
    icon: {
      prefix: 'demo-icon',
      name: 'alipay-fill',
    },
  },
]
```

### 手动声明项目组件

```tsx
<ShareSheet
  visible={visible}
  cancel="取消"
  actionClosable
  onSelect={handleSelect}
  onClose={setVisible}
>
  <ShareSheet.Row>
    <ShareSheet.Item
      name="Wechat"
      color="#fff"
      background="#0bc15f"
      icon={{
        prefix: 'demo-icon',
        name: 'wechat-fill',
      }}
    />
    <ShareSheet.Item
      name="Alipay"
      color="#fff"
      background="#1677ff"
      icon={{
        prefix: 'demo-icon',
        name: 'alipay-fill',
      }}
    />
  </ShareSheet.Row>
</ShareSheet>
```

## API

### ShareSheetProps

| 属性           | 描述                                             | 类型                                                    | 默认值 |
| -------------- | ------------------------------------------------ | ------------------------------------------------------- | ------ |
| itemList       | 面板选项列表                                     | ShareSheetItemList                                      | []     |
| visible        | 面板是否可见                                     | boolean                                                 | false  |
| title          | 面板标题                                         | React.ReactNode                                         | -      |
| description    | 面板描述                                         | React.ReactNode                                         | -      |
| cancel         | 取消按钮内容                                     | React.ReactNode                                         | -      |
| maskClosable   | 点击遮罩后是否关闭                               | boolean                                                 | true   |
| actionClosable | 点击选项后是否关闭                               | boolean                                                 | false  |
| onSelect       | 点击选项时触发，禁用状态下不会触发               | (itemProps: ShareSheetItemProps, index: number) => void | -      |
| onCancel       | 点击取消按钮时触发                               | (visible: false) => void                                | -      |
| onClose        | 点击取消或遮罩或选项时触发，遮罩和选项需允许关闭 | (visible: false) => void                                | -      |

### ShareSheetItemProps

| 属性       | 描述       | 类型                         | 默认值 |
| ---------- | ---------- | ---------------------------- | ------ |
| className  | 类名       | string                       | -      |
| style      | 样式       | CSSProperties                | -      |
| name       | 名称       | React.ReactNode              | -      |
| label      | 标签       | React.ReactNode              | -      |
| color      | 字体颜色   | string                       | -      |
| background | 背景颜色   | string                       | -      |
| disabled   | 禁用状态   | boolean                      | false  |
| onClick    | 点击时调用 | (event: ITouchEvent) => void | -      |

## 主题定制

### CSS 变量

%{variables}
