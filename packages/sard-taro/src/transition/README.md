# Transition 过渡

### 介绍

`Transition` 组件允许您使用简单的声明式 API 描述随时间从一个组件状态到另一个组件状态的转换。最常用的是动画化组件的安装和卸载，但也可以用来描述原地转换状态。

`Transition` 是一个平台无关的基础组件。如果你在 CSS 中使用过渡效果，你可能会想要使用 `CSSTransition`。它继承了 `Transition` 的所有功能，但包含了更好地使用 CSS 过渡所需的额外功能。

默认情况下，`Transition` 组件不会改变它渲染的组件的行为，它只跟踪组件的“进入”和“退出”状态。

### 引入

```js
import { Transition, CSSTransition } from 'sard-taro'
```

## 代码演示

<script type="code">
  [
    "./demo/Transition.tsx",
    "./demo/CSSTransition.tsx"
  ]
</script>

## API

### TransitionProps

| 属性          | 描述                                                                                                                                  | 类型                                                                                          | 默认值 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------ |
| in            | 触发进入或退出状态                                                                                                                    | boolean                                                                                       | false  |
| children      | 可以为一个接受状态的函数，或者为 React 元素                                                                                           | ReactElement\| ((status: Status, props: { [key: PropertyKey]: any }) => ReactElement \| null) | -      |
| mountOnEnter  | 默认情况下，子组件会和父组件一起立即挂载。设置此值可以在首次 `in` 时才挂载                                                            | boolean                                                                                       | false  |
| unmountOnExit | 默认情况下，子组件在达到 `exited` 状态后保持挂载。设置此值可以在组件退出后卸载                                                        | boolean                                                                                       | false  |
| appear        | 默认情况下，子组件在第一次挂载时不会执行进入状态的转换，无论 `in` 的值是多少。如果你想要这种行为，将 `appear` 和 `in` 都设置为 `true` | boolean                                                                                       | false  |
| enter         | 启用或禁用进入的过渡                                                                                                                  | boolean                                                                                       | true   |
| exit          | 启用或禁用退出的过渡                                                                                                                  | boolean                                                                                       | true   |
| timeout       | 过渡的持续时间，单位为毫秒                                                                                                            | number \| { enter?: number; exit?: number; appear?: number }                                  | -      |
| onEnter       | 在进入 `entering` 状态之前触发                                                                                                        | () => void                                                                                    | -      |
| onEntering    | 在进入 `entering` 状态之后触发                                                                                                        | () => void                                                                                    | -      |
| onEntered     | 在进入 `entered` 状态之后触发                                                                                                         | () => void                                                                                    | -      |
| onExit        | 在进入 `exiting` 状态之前触发                                                                                                         | () => void                                                                                    | -      |
| onExiting     | 在进入 `exiting` 状态之后触发                                                                                                         | () => void                                                                                    | -      |
| onExited      | 在进入 `exited` 状态之后触发                                                                                                          | () => void                                                                                    | -      |

### CSSTransitionProps

`CSSTransitionProps` 继承 `TransitionProps`，并拥有以下额外属性：

| 属性   | 描述                                                                                                                                   | 类型                                                                                             | 默认值 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| name   | 类名前缀。如果 `name="fade"` ，在不同阶段合并的类名为：`fade-enter, fade-entering, fade-entered, fade-exit, fade-exiting, fade-exited` | string                                                                                           | -      |
| effect | 用来使用内置的动画效果；`name` 属性优先级较高                                                                                          | 'fade' \| 'slide-top' \| 'slide-right' \| 'slide-bottom' \| 'slide-left' \| 'zoom' \| 'collapse' | 'fade' |

## 主题定制

### CSS 变量

%{variables}
