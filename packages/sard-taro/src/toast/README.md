# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，表示提示、结果、加载中状态。

### 引入

```js
import { Toast } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/toast/demo/Basic.tsx)

### 命令式

因为小程序不能动态往页面插入节点，通过命令式展示前，需要在页面上放置可选`id`的代理组件。

```tsx
<Toast.Agent />
```

然后就可以调用`Toast`下的方法进行展示了。（这些方法可以传递可选的和对应的代理组件一样的`id`，这样可以同时展示多个。）

%(${DEMO_PATH}/toast/demo/Imperative.tsx)

### 自定义图标

%(${DEMO_PATH}/toast/demo/Icon.tsx)

### 自定义位置

%(${DEMO_PATH}/toast/demo/Placement.tsx)

### 加载中的背景

%(${DEMO_PATH}/toast/demo/Mask.tsx)

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

%(./index.scss#variables)
