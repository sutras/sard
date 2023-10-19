# Notify 通知

### 介绍

在页面顶部展示消息通知。

### 引入

```ts
import { Notify } from 'sard'
```

## 代码演示

### 基础使用

同 `Dialog` 组件，命令式使用 `Notify` 组件需要先放置代理组件。

@code('${DEMO_PATH}/notify/demo/Basic.tsx')

### 类型

支持 `primary、success、warning、error` 四种通知类型，默认为 `primary`

@code('${DEMO_PATH}/notify/demo/Type.tsx')

### 自定义颜色

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

@code('${DEMO_PATH}/notify/demo/Color.tsx')

### 自定义时长

`duration` 设为 0 后会一直显示。

@code('${DEMO_PATH}/notify/demo/Duration.tsx')

### 自定义位置

通知允许在屏幕上边或下边展示。

@code('${DEMO_PATH}/notify/demo/Placement.tsx')

## API

### NotifyProps

| 属性           | 描述                                  | 类型                                           | 默认值    |
| -------------- | ------------------------------------- | ---------------------------------------------- | --------- |
| type           | 加载类型                              | 'primary' \| 'success' \| 'warning' \| 'error' | 'primary' |
| message        | 通知内容                              | React.ReactNode                                | -         |
| duration       | 展示时长(ms)，值为 0 时，通知不会消失 | number                                         | 3000      |
| color          | 字体颜色                              | string                                         | -         |
| background     | 背景色                                | string                                         | -         |
| onTimeout      | 到时间关闭时触发                      | (visible: false) => void                       | -         |
| visible        | 是否显示通知                          | boolean                                        | -         |
| defaultVisible | 默认是否可见                          | boolean                                        | -         |
| onVisible      | 显隐时触发                            | (visible: boolean) => void                     | -         |
| placement      | 通知放置的位置                        | 'top' \| 'bottom'                              | 'top'     |

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
interface NotifyShow {
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

### SCSS 变量

@code('./index.scss#variables')
