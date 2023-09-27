# Dialog 对话框

### 介绍

提示或接收用户的确认。

### 引入

```ts
import { Dialog } from 'sard-taro'
```

## 代码演示

### 基础使用

因为小程序和 `RN` 不能动态往页面插入节点，因此在通过命令式展示前，需要在页面上放置可选`id`属性的代理组件。

为了在 `RN` 实现类似于固定定位的效果，需要在 `app.tsx` 文件放置代理组件。

#### app.tsx 文件

```tsx
function App({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      {process.env.TARO_ENV === 'rn' && <Dialog.Agent />}
    </>
  )
}
```

`H5` 和小程序则需要在页面放置代理组件。

#### 页面文件

```tsx
export default () => {
  return (
    <>
      {process.env.TARO_ENV !== 'rn' && <Dialog.Agent />}
      {'页面内容。。。'}
    </>
  )
}
```

为了避免在每个页面都放置代理组件，可以编写一个页面容器组件，所有页面内容都放置在这个组件里面。
这样只需要在页面容器组件放置一次代理组件即可。

然后就可以调用`Dialog`下的方法进行展示了。（这些方法可以传递可选的和对应的代理组件一样的`id`，这样可以同时展示多个。）

下面演示 `Dialog` 的使用：

%(${DEMO_PATH}/dialog/demo/Basic.tsx)

### 不使用代理

也可以不通过命令式，而是通过声明组件的方式使用。

%(${DEMO_PATH}/dialog/demo/NoAgent.tsx)

### 异步关闭

`onConfirm` 或 `onCancel`如果是返回一个 `Promise` 对象的函数，只有在 `fulfilled` 状态时才会隐藏，期间按钮会显式加载状态。

%(${DEMO_PATH}/dialog/demo/AsyncClose.tsx)

### 圆角按钮

`buttonType` 属性值为 `round` 可以将底部按钮显示为圆角的形式。

%(${DEMO_PATH}/dialog/demo/Round.tsx)

### 有头部的

配置 `headed` 属性让对话框显示头部，此时的对话框更像一个模态框。

%(${DEMO_PATH}/dialog/demo/Headed.tsx)

### 自定义内容

对话框里面可以放置任何内容，例如以模态的方式展示一个表单，通常要配合 `headed` 属性一起使用。

%(${DEMO_PATH}/dialog/demo/Content.tsx)

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

| 名称    | 描述                         | 类型                    |
| ------- | ---------------------------- | ----------------------- |
| show    | 显示对话框                   | DialogShow              |
| alert   | 显示警告框                   | DialogShow              |
| confirm | 显示确认框                   | DialogShowAsync         |
| hide    | 隐藏指定 `id` 的命令式对话框 | (id = 'dialog') => void |
| hideAll | 隐藏所有命令式对话框         | () => void              |

### DialogShow

```ts
interface DialogShow {
  (options: ToastOptions): void
  (title: React.ReactNode, options?: ToastOptions): void
}
```

### DialogShowAsync

```ts
interface DialogShowAsync {
  (options: DialogOptions): Promise<void>
  (title: ReactNode, options?: DialogOptions): Promise<void>
}
```

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
