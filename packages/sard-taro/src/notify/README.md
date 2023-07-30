# Notify 通知

### 介绍

在页面顶部展示消息通知。

### 引入

```js
import { Notify } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <Cell.Group card>
      <Cell linkable title="显示通知" onClick={() => setVisible(true)} />
      <Cell linkable title="隐藏通知" onClick={() => setVisible(false)} />
    </Cell.Group>

    <Notify
      visible={visible}
      message="这是一条通知"
      onTimeout={setVisible}
    />
  )
}
```

### 命令式

因为小程序不能动态往页面插入节点，通过命令式展示前，需要在页面上放置可选`id`的代理组件。

```tsx
<Notify.Agent />
```

然后就可以调用`Notify`下的方法进行展示了。（这些方法可以传递可选的和对应的代理组件一样的`id`，这样可以同时展示多个。）

```tsx
Notify.show('这是一条通知')

Notify.hide()
```

### 类型

```tsx
Notify.success('这是一条通知')
Notify.warning('这是一条通知')
Notify.error('这是一条通知')
```

### 自定义颜色

```tsx
Notify.show('这是一条通知', {
  color: 'black',
  background: 'fuchsia',
})
```

### 自定义时长

```tsx
Notify.show('这是一条通知', {
  duration: 0,
})
```

### 自定义位置

```tsx
Notify.show('这是一条通知', {
  placement: 'bottom',
})
```

## API

### NotifyProps

| 属性       | 描述                                  | 类型                                           | 默认值    |
| ---------- | ------------------------------------- | ---------------------------------------------- | --------- |
| type       | 加载类型                              | 'primary' \| 'success' \| 'warning' \| 'error' | 'primary' |
| message    | 通知内容                              | React.ReactNode                                | -         |
| duration   | 展示时长(ms)，值为 0 时，通知不会消失 | number                                         | 3000      |
| color      | 字体颜色                              | string                                         | -         |
| background | 背景色                                | string                                         | -         |
| onTimeout  | 到时间关闭时触发                      | (visible: false) => void                       | -         |
| visible    | 是否显示通知                          | boolean                                        | false     |
| onVisible  | 显隐时触发                            | (visible: boolean) => void                     | -         |
| placement  | 通知放置的位置                        | 'top' \| 'bottom'                              | 'top'     |

### Notify 类方法

| 名称    | 描述                       | 类型                    |
| ------- | -------------------------- | ----------------------- |
| show    | 显示通知                   | NotifyShow              |
| success | 显示成功类型通知           | NotifyShow              |
| warning | 显示警告类型通知           | NotifyShow              |
| error   | 显示错误类型通知           | NotifyShow              |
| hide    | 隐藏指定 `id` 的命令式通知 | (id = 'notify') => void |
| hideAll | 隐藏所有命令式通知         | () => void              |

### NotifyShow

```ts
export interface NotifyShow {
  (options: NotifyOptions): void
  (message: ReactNode, options?: NotifyOptions): void
}
```

### NotifyOptions

`NotifyOptions` 继承 `NotifyProps`，并有以下额外属性：

| 属性 | 描述                                                                            | 类型   | 默认值   |
| ---- | ------------------------------------------------------------------------------- | ------ | -------- |
| id   | 代理组件的 id，用于命令式操作指定代理；默认会动态生成一个代理，隐藏时会进行销毁 | string | 'notify' |

### NotifyAgentProps

`NotifyAgentProps` 继承 `NotifyProps`，并有以下额外属性：

| 属性 | 描述    | 类型   | 默认值   |
| ---- | ------- | ------ | -------- |
| id   | 组件 id | string | 'notify' |

## 主题定制

### CSS 变量

%{variables}
