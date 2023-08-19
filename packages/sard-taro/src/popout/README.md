# Popout 弹出框

### 介绍

底部弹出框，可以控制组件的展示与交互，可作为 `Picker` 等组件的弹出框容器。

### 引入

```js
import { Popout } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/popout/demo/Basic.tsx)

### 紧凑类型

通过将 `type` 设为 `compact` 可以将确定/取消按钮放到标题两侧，以便节省空间。

%(${DEMO_PATH}/popout/demo/Compact.tsx)

### 结合日期组件

使用 `PopoutOutlet` 输出值，使用 `PopoutTarget` 连接目标组件，
以便减少控制显隐、中间值等状态和回调的声明；
并且将输出组件和目标组件结合在 `Popout` 组件下，
为搭配 `Form` 组件一起使用提供了便利。

%(${DEMO_PATH}/popout/demo/WithCalendar.tsx)

### 受控的弹出框

弹出框代理了目标组件的值及变化的回调，可以设置初始值，或将其变为受控组件。

%(${DEMO_PATH}/popout/demo/Controllable.tsx)

### 快捷确认

添加 `fast` 属性可以在组件触发回调时快速确定，此时可以将确定按钮隐藏。

%(${DEMO_PATH}/popout/demo/Fast.tsx)

### 结合其他表单组件

%(${DEMO_PATH}/popout/demo/WithForm.tsx)

## API

### PopoutProps

| 属性           | 描述                                                                                                                   | 类型                           | 默认值  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------- |
| title          | 弹出框标题                                                                                                             | React.ReactNode                | -       |
| showCancel     | 是否显示取消按钮，适用 `loose` 类型                                                                                    | boolean                        | false   |
| cancelText     | 取消按钮文案                                                                                                           | React.ReactNode                | '取消'  |
| cancelProps    | 取消按钮组件的 `props`                                                                                                 | ButtonProps                    | -       |
| showConfirm    | 是否显示确定按钮，适用 `loose` 类型                                                                                    | boolean                        | true    |
| confirmText    | 确定按钮文案                                                                                                           | React.ReactNode                | '确定'  |
| confirmProps   | 确定按钮组件的 `props`                                                                                                 | ButtonProps                    | -       |
| showClose      | 是否显示关闭按钮，适用 `loose` 类型                                                                                    | boolean                        | true    |
| type           | 弹出框按钮排版方式                                                                                                     | 'compact' \| 'loose'           | 'loose' |
| fast           | 快捷选择，在目标组件触发改变事件时自动选择，通常需要隐藏确定按钮                                                       | boolean                        | false   |
| visible        | 是否显示弹出框                                                                                                         | boolean                        | -       |
| defaultVisible | 默认是否显示弹出框                                                                                                     | boolean                        | -       |
| onVisible      | 弹出框显隐时触发                                                                                                       | (visible: boolean) => void     | -       |
| maskClosable   | 点击遮罩是否关闭                                                                                                       | boolean                        | true    |
| onConfirm      | 点击确认按钮时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态                               | () => void \| Promise<unknown> | -       |
| onCancel       | 点击取消按钮时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态                               | () => void \| Promise<unknown> | -       |
| onClose        | 点击关闭按钮或遮罩（如果允许点击遮罩关闭）时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态 | () => void \| Promise<unknown> | -       |
| value          | 目标组件的当前值                                                                                                       | any                            | -       |
| defaultValue   | 目标组件的默认值                                                                                                       | any                            | -       |
| onChange       | 目标组件值改变时触发                                                                                                   | (value: any) => void           | -       |
| disabled       | 禁用状态                                                                                                               | boolean                        | false   |
| readOnly       | 只读状态                                                                                                               | boolean                        | false   |

### PopoutBridgeProps

| 属性          | 描述                       | 类型   | 默认值     |
| ------------- | -------------------------- | ------ | ---------- |
| valuePropName | 目标组件值的属性名         | string | 'value'    |
| trigger       | 目标组件值改变事件的属性名 | string | 'onChange' |

### PopoutOutletProps

| 属性     | 描述               | 类型                                                    | 默认值 |
| -------- | ------------------ | ------------------------------------------------------- | ------ |
| children | 目标组件值的属性名 | (params: PopoutOutletCallbackParams) => React.ReactNode | -      |

### PopoutOutletCallbackParams

| 属性        | 描述                                                        | 类型                       |
| ----------- | ----------------------------------------------------------- | -------------------------- |
| value       | 弹出框组件的当前值                                          | any                        |
| triggerArgs | 目标组件值改变事件回调的参数列表，通常用于展示 `label` 文案 | any[]                      |
| setValue    | 设置弹出框组件和目标组件的当前值                            | (value?: any) => void      |
| setVisible  | 设置弹出框的显隐                                            | (visible: boolean) => void |

## 主题定制

### CSS 变量

%(./index.scss#variables)
