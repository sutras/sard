# Popout 弹出框

### 介绍

底部弹出框，可以控制组件的展示与交互，可作为 `Picker` 等组件的弹出框容器。

### 引入

```ts
import { Popout } from 'sard'
```

## 代码演示

### 基础使用

使用 `visible` 和 `onVisible` 控制显隐。

@code('${DEMO_PATH}/popout/demo/Basic.tsx')

### 紧凑类型

通过将 `type` 设为 `compact` 可以将确定/取消按钮放到标题两侧，以便节省空间。

@code('${DEMO_PATH}/popout/demo/Compact.tsx')

### 结合日期组件

弹出框可以放置任何内容。

@code('${DEMO_PATH}/popout/demo/WithCalendar.tsx')

## API

### PopoutProps

`PopoutProps` 继承 `PopupProps` 并拥有以下属性：

| 属性           | 描述                                                                                           | 类型                           | 默认值  |
| -------------- | ---------------------------------------------------------------------------------------------- | ------------------------------ | ------- |
| title          | 弹出框标题                                                                                     | React.ReactNode                | -       |
| showCancel     | 是否显示取消按钮，适用 `loose` 类型                                                            | boolean                        | false   |
| cancelText     | 取消按钮文案                                                                                   | React.ReactNode                | '取消'  |
| cancelProps    | 取消按钮组件的 `props`                                                                         | ButtonProps                    | -       |
| showConfirm    | 是否显示确定按钮，适用 `loose` 类型                                                            | boolean                        | true    |
| confirmText    | 确定按钮文案                                                                                   | React.ReactNode                | '确定'  |
| confirmProps   | 确定按钮组件的 `props`                                                                         | ButtonProps                    | -       |
| showClose      | 是否显示关闭按钮，适用 `loose` 类型                                                            | boolean                        | true    |
| showFooter     | 是否显示底部按钮                                                                               | boolean                        | true    |
| type           | 弹出框按钮排版方式                                                                             | 'compact' \| 'loose'           | 'loose' |
| visible        | 是否显示弹出框                                                                                 | boolean                        | -       |
| defaultVisible | 默认是否显示弹出框                                                                             | boolean                        | -       |
| onVisible      | 弹出框显隐时触发                                                                               | (visible: boolean) => void     | -       |
| maskClosable   | 点击遮罩是否关闭                                                                               | boolean                        | true    |
| onClose        | 点击关闭按钮或遮罩时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态 | () => void \| Promise<unknown> | -       |
| onCancel       | 点击取消按钮时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态       | () => void \| Promise<unknown> | -       |
| onConfirm      | 点击确认按钮时触发，如果返回`Promise`对象则会在`fulfilled`状态时关闭，期间会显示加载状态       | () => void \| Promise<unknown> | -       |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
