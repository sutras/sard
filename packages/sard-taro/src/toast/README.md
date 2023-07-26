# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，表示提示、结果、加载中状态。

### 引入

```js
import { Toast } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
export default () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<ToastProps['type']>('text')
  const [title, setTitle] = useState<ToastProps['title']>('')

  const showToast = (type: ToastProps['type'], title: ToastProps['title']) => {
    setType(type)
    setTitle(title)
    setVisible(true)
  }

  return (
    <Cell.Group card>
      <Cell
        isLink
        title="文本提示"
        onClick={() => showToast('text', '文本提示')}
      />
      <Cell
        isLink
        title="成功提示"
        onClick={() => showToast('success', '成功')}
      />

      <Cell
        isLink
        title="失败提示"
        onClick={() => showToast('fail', '失败')}
      />
      <Cell
        isLink
        title="加载中提示"
        onClick={() => showToast('loading', '加载中')}
      />
      <Cell isLink title="隐藏提示" onClick={() => setVisible(false)} />
    </Cell.Group>

    <Toast
      visible={visible}
      type={type}
      title={title}
      onTimeout={setVisible}
    ></Toast>
  )
}
```

### 命令式

因为小程序不能动态往页面插入节点，通过命令式展示前，需要在页面上放置可选`id`的代理组件。

```tsx
<Toast.Agent />
```

然后就可以调用`Toast`下的方法进行展示了。（这些方法可以传递可选的和对应的代理组件一样的`id`，这样可以同时展示多个。）

```tsx
Toast.show('文本提示')
Toast.success('成功')
Toast.fail('失败')
Toast.loading('加载中')
Toast.hide()
```

### 自定义图标

```tsx
Toast.show('笑一笑', {
  iconProps: {
    prefix: 'demo-icon',
    name: 'emoji-smile',
  },
})

Toast.show('Sard', {
  iconProps: {
    name: pic1,
  },
})
```

### 自定义位置

```tsx
Toast.show('顶部位置', {
  placement: 'top',
})

Toast.show('底部位置', {
  placement: 'bottom',
})
```

### 加载中的背景

```tsx
Toast.loading('加载中', {
  mask: true,
})

Toast.loading('加载中', {
  mask: true,
  clearMask: true,
})
```

## API

### ToastProps

| 属性         | 描述                                      | 类型                                                   | 默认值 |
| ------------ | ----------------------------------------- | ------------------------------------------------------ | ------ |
| type         | 提示框类型                                | 'text' \| 'loading' \| 'success' \| 'fail' \| 'custom' | 'text' |
| title        | 标题                                      | React.ReactNode                                        | -      |
| icon         | 自定义图标                                | React.ReactNode                                        | -      |
| loadingProps | `loading` 类型图标的 `props`              | LoadingProps                                           | -      |
| duration     | 展示时长(ms)，值为 0 时，`toast` 不会消失 | number                                                 | 2000   |
| visible      | 是否可见                                  | boolean                                                | false  |
| onVisible    | 显隐时触发                                | (visible: boolean) => void                             | -      |
| onTimeout    | 到隐藏时间时触发                          | (visible: false) => void                               | -      |
| placement    | 提示框垂直方向放置的位置，默认垂直居中    | 'top' \| 'bottom'                                      | -      |

### Toast 类方法

| 名称    | 描述                       | 类型                   |
| ------- | -------------------------- | ---------------------- |
| show    | 显示提示                   | ToastShow              |
| success | 显示成功类型提示           | ToastShow              |
| fail    | 显示失败类型提示           | ToastShow              |
| loading | 显示加载类型提示           | ToastShow              |
| hide    | 隐藏指定 `id` 的命令式提示 | (id = 'toast') => void |
| hideAll | 隐藏所有命令式提示         | () => void             |

### ToastShow

```ts
export interface ToastShow {
  (options: ToastOptions): void
  (title: React.ReactNode, options?: ToastOptions): void
}
```

### ToastOptions

`ToastOptions` 继承 `ToastProps`，并有以下额外属性：

| 属性 | 描述                                                                            | 类型   | 默认值  |
| ---- | ------------------------------------------------------------------------------- | ------ | ------- |
| id   | 代理组件的 id，用于命令式操作指定代理；默认会动态生成一个代理，隐藏时会进行销毁 | string | 'toast' |

### ToastAgentProps

`ToastAgentProps` 继承 `ToastProps`，并有以下额外属性：

| 属性 | 描述    | 类型   | 默认值  |
| ---- | ------- | ------ | ------- |
| id   | 组件 id | string | 'toast' |

## 主题定制

### CSS 变量

%{variables}
