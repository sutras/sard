# Dialog 对话框

### 介绍

提示或接收用户的确认。

### 引入

```js
import { Dialog } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/dialog/demo/Basic.tsx)

### 命令式

因为小程序不能动态往页面插入节点，通过命令式展示前，需要在页面上放置可选`id`的代理组件。

```tsx
<Dialog.Agent />
```

然后就可以调用`Dialog`下的方法进行展示了。（这些方法可以传递可选的和对应的代理组件一样的`id`，这样可以同时展示多个。）

%(${DEMO_PATH}/dialog/demo/Imperative.tsx)

### 异步关闭

%(${DEMO_PATH}/dialog/demo/AsyncClose.tsx)

### 圆角按钮

%(${DEMO_PATH}/dialog/demo/Round.tsx)

### 有头部的

%(${DEMO_PATH}/dialog/demo/Headed.tsx)

## API

### DialogProps

| 属性         | 描述                                                                                                                   | 类型                           | 默认值 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------ |
| title        | 标题                                                                                                                   | React.ReactNode                | -      |
| message      | 文本内容                                                                                                               | React.ReactNode                | -      |
| header       | 自定义头部                                                                                                             | React.ReactNode                | -      |
| footer       | 自定义底部（按钮部分）                                                                                                 | React.ReactNode                | -      |
| headed       | 是否显示带头部类型                                                                                                     | boolean                        | false  |
| buttonType   | 按钮类型                                                                                                               | 'round' \| 'text'              | 'text' |
| showCancel   | 是否显示取消按钮                                                                                                       | boolean                        | false  |
| cancelText   | 取消按钮文案                                                                                                           | React.ReactNode                | '取消' |
| cancelProps  | 取消按钮组件的 `props`                                                                                                 | ButtonProps                    | -      |
| showConfirm  | 是否显示确定按钮                                                                                                       | boolean                        | true   |
| cancelText   | 确定按钮文案                                                                                                           | React.ReactNode                | '确定' |
| confirmProps | 确定按钮组件的 `props`                                                                                                 | ButtonProps                    | -      |
| maskClosable | 点击遮罩是否关闭                                                                                                       | boolean                        | false  |
| onConfirm    | 点击确认按钮时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态                               | () => void \| Promise<unknown> | -      |
| onCancel     | 点击取消按钮时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态                               | () => void \| Promise<unknown> | -      |
| onClose      | 点击关闭按钮或遮罩（如果允许点击遮罩关闭）时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态 | () => void \| Promise<unknown> | -      |
| visible      | 是否可见                                                                                                               | boolean                        | false  |
| onVisible    | 显隐时触发                                                                                                             | (visible: boolean) => void     | -      |

### Dialog 类方法

| 名称    | 描述       | 类型                           |
| ------- | ---------- | ------------------------------ |
| show    | 显示对话框 | (props: DialogOptions) => void |
| alert   | 显示警告框 | (props: DialogOptions) => void |
| confirm | 显示确认框 | (props: DialogOptions) => void |

### DialogOptions

`DialogOptions` 继承 `DialogProps`，并有以下额外属性：

| 属性 | 描述                                                                            | 类型   | 默认值   |
| ---- | ------------------------------------------------------------------------------- | ------ | -------- |
| id   | 代理组件的 id，用于命令式操作指定代理；默认会动态生成一个代理，隐藏时会进行销毁 | string | 'dialog' |

### DialogAgentProps

`DialogAgentProps` 继承 `DialogProps`，并有以下额外属性：

| 属性 | 描述    | 类型   | 默认值   |
| ---- | ------- | ------ | -------- |
| id   | 组件 id | string | 'dialog' |

## 主题定制

### CSS 变量

%(./index.scss#variables)
