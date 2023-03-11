# Notify 通知

### 介绍

在页面顶部展示消息通知。

### 引入

```js
import { Notify } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Type.tsx",
    "./demo/Color.tsx",
    "./demo/Duration.tsx",
    "./demo/Placement.tsx",
    "./demo/Imperative.tsx",
    "./demo/Agent.tsx"
  ]
</script>

## API

### NotifyProps

| 名称       | 描述                                  | 类型                                           | 默认值    |
| ---------- | ------------------------------------- | ---------------------------------------------- | --------- |
| type       | 加载类型                              | 'primary' \| 'success' \| 'warning' \| 'error' | 'primary' |
| message    | 通知内容                              | React.ReactNode                                | -         |
| duration   | 展示时长(ms)，值为 0 时，通知不会消失 | number                                         | 3000      |
| color      | 字体颜色                              | string                                         | -         |
| background | 背景色                                | string                                         | -         |
| onTimeout  | 到时间关闭时触发                      | (visible: false) => void                       | -         |
| visible    | 是否显示通知                          | boolean                                        | false     |
| onVisible  | 显隐时触发                            | (visible: boolean) => void                     | -         |
| popupProps | `Popup` 组件的 `props`                | popupProps                                     | -         |

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

| 名称 | 描述                                                                            | 类型   | 默认值   |
| ---- | ------------------------------------------------------------------------------- | ------ | -------- |
| id   | 代理组件的 id，用于命令式操作指定代理；默认会动态生成一个代理，隐藏时会进行销毁 | string | 'notify' |

### NotifyAgentProps

`NotifyAgentProps` 继承 `NotifyProps`，并有以下额外属性：

| 名称 | 描述    | 类型   | 默认值   |
| ---- | ------- | ------ | -------- |
| id   | 组件 id | string | 'notify' |

## 主题定制

### CSS 变量

%{variables}
