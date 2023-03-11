# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，表示提示、结果、加载中状态

### 引入

```js
import { Toast } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Imperative.tsx",
    "./demo/Icon.tsx",
    "./demo/Agent.tsx"
  ]
</script>

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
| popupProps   | `Popup` 组件的 `props`                    | PopupProps                                             | -      |

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

| 名称 | 描述                                                                            | 类型   | 默认值  |
| ---- | ------------------------------------------------------------------------------- | ------ | ------- |
| id   | 代理组件的 id，用于命令式操作指定代理；默认会动态生成一个代理，隐藏时会进行销毁 | string | 'toast' |

### ToastAgentProps

`ToastAgentProps` 继承 `ToastProps`，并有以下额外属性：

| 名称 | 描述    | 类型   | 默认值  |
| ---- | ------- | ------ | ------- |
| id   | 组件 id | string | 'toast' |

## 主题定制

### CSS 变量

%{variables}
