# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，表示提示、结果、加载中状态。

### 引入

```ts
import { Toast } from 'sard'
```

## 代码演示

### 基础使用

同 `Dialog` 组件，命令式使用 `Toast` 组件需要先放置代理组件。

@code('${DEMO_PATH}/toast/demo/Basic.tsx')

### 自定义图标

通过 `iconProps` 选项可以自定义图标。

@code('${DEMO_PATH}/toast/demo/Icon.tsx')

### 自定义位置

`Toast` 默认渲染在屏幕正中位置，通过 `placement` 属性可以控制 `Toast` 展示的位置。

@code('${DEMO_PATH}/toast/demo/Placement.tsx')

### 加载中的背景

默认显示加载类型 `Toast` 不会显示遮罩背景，设置 `mask: true` 会显示黑色遮罩， 设置 `transparent: true` 会让背景变透明。

@code('${DEMO_PATH}/toast/demo/Mask.tsx')

## API

### ToastProps

| 属性           | 描述                                      | 类型                                                   | 默认值 |
| -------------- | ----------------------------------------- | ------------------------------------------------------ | ------ |
| type           | 提示框类型                                | 'text' \| 'loading' \| 'success' \| 'fail' \| 'custom' | 'text' |
| title          | 标题                                      | React.ReactNode                                        | -      |
| icon           | 自定义图标                                | React.ReactNode                                        | -      |
| iconProps      | 自定义图标                                | IconProps                                              | -      |
| duration       | 展示时长(ms)，值为 0 时，`toast` 不会消失 | number                                                 | 1500   |
| onTimeout      | 到隐藏时间时触发                          | (visible: false) => void                               | -      |
| visible        | 是否可见                                  | boolean                                                | -      |
| defaultVisible | 默认是否可见                              | boolean                                                | -      |
| onVisible      | 显隐时触发                                | (visible: boolean) => void                             | -      |
| placement      | 提示框垂直方向放置的位置，默认垂直居中    | 'top' \| 'bottom'                                      | -      |
| loadingProps   | `loading` 类型图标的 `props`              | LoadingProps                                           | -      |

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
interface ToastShow {
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

### SCSS 变量

@code('./index.scss#variables')
