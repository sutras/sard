# Dialog 对话框

### 介绍

提示或接收用户的确认。

### 引入

```js
import { Dialog } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Confirm.tsx",
    "./demo/Async.tsx",
    "./demo/Imperative.tsx",
    "./demo/Round.tsx",
    "./demo/Headed.tsx",
    "./demo/Agent.tsx"
  ]
</script>

## API

### DialogProps

| 属性         | 描述                                                                              | 类型                                                    | 默认值 |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------- | ------ |
| title        | 标题                                                                              | React.ReactNode                                         | -      |
| message      | 文本内容                                                                          | React.ReactNode                                         | -      |
| header       | 自定义头部                                                                        | React.ReactNode                                         | -      |
| footer       | 自定义底部（按钮部分）                                                            | React.ReactNode                                         | -      |
| headed       | 是否显示带头部类型                                                                | boolean                                                 | false  |
| buttonType   | 按钮类型                                                                          | 'round' \| 'text'                                       | 'text' |
| showCancel   | 是否显示取消按钮                                                                  | boolean                                                 | false  |
| cancelText   | 取消按钮文案                                                                      | React.ReactNode                                         | '取消' |
| cancelProps  | 取消按钮组件的 `props`                                                            | ButtonProps                                             | -      |
| showConfirm  | 是否显示确定按钮                                                                  | boolean                                                 | true   |
| cancelText   | 确定按钮文案                                                                      | React.ReactNode                                         | '确定' |
| confirmProps | 确定按钮组件的 `props`                                                            | ButtonProps                                             | -      |
| maskClosable | 点击遮罩是否关闭                                                                  | boolean                                                 | false  |
| onCancel     | 点击取消按钮时触发（点击遮罩或关闭按钮时也会触发）                                | () => void                                              | -      |
| onConfirm    | 点击确认按钮时触发                                                                | () => void                                              | -      |
| beforeClose  | 关闭前的回调，调用 `done` 后才会关闭；`type` 表示是点击确定按钮还是取消按钮关闭的 | (done: () => void, type: 'cancel' \| 'confirm') => void | -      |
| visible      | 是否可见                                                                          | boolean                                                 | false  |
| onVisible    | 显隐时触发                                                                        | (visible: boolean) => void                              | -      |
| popupProps   | `Popup` 组件的 `props`                                                            | PopupProps                                              | -      |

### Dialog 类方法

| 名称    | 描述       | 类型                           |
| ------- | ---------- | ------------------------------ |
| show    | 显示对话框 | (props: DialogOptions) => void |
| alert   | 显示警告框 | (props: DialogOptions) => void |
| confirm | 显示确认框 | (props: DialogOptions) => void |

### DialogOptions

`DialogOptions` 继承 `DialogProps`，并有以下额外属性：

| 名称 | 描述                                                                            | 类型   | 默认值   |
| ---- | ------------------------------------------------------------------------------- | ------ | -------- |
| id   | 代理组件的 id，用于命令式操作指定代理；默认会动态生成一个代理，隐藏时会进行销毁 | string | 'dialog' |

### DialogAgentProps

`DialogAgentProps` 继承 `DialogProps`，并有以下额外属性：

| 名称 | 描述    | 类型   | 默认值   |
| ---- | ------- | ------ | -------- |
| id   | 组件 id | string | 'dialog' |

## 主题定制

### SCSS

```scss

```
