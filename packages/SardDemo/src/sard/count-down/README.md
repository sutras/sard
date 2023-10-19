# CountDown 倒计时

### 介绍

倒计时的展示 ，以便告知用户在一定时间后可以进行某些操作。

### 引入

```ts
import { CountDown } from 'sard'
```

## 代码演示

### 基础使用

使用 `time` 属性配置倒计时总时长（单位毫秒）。

@code('${DEMO_PATH}/count-down/demo/Basic.tsx')

### 自定义格式

默认格式为 `HH:mm:ss` ，也可以使用 `format` 自定义人任意想要的格式。

@code('${DEMO_PATH}/count-down/demo/Format.tsx')

### 毫秒级别的渲染

默认每隔一秒渲染一次，使用 `interval` 属性可以配置任意时间间隔。

@code('${DEMO_PATH}/count-down/demo/Interval.tsx')

### 自定义样式

如果不想只限定以文本格式输出，`CountDown` 组件的 `children` 属性可以是一个函数，
此函数接收 `CountDownCurrentTime` 对象作为参数，并将其返回值作为输出。

@code('${DEMO_PATH}/count-down/demo/Style.tsx')

### 手动控制

当倒计时结束时便会停止，通过组件提供的命令式句柄可以控制倒计时的开始、暂停或进行重置。

@code('${DEMO_PATH}/count-down/demo/Control.tsx')

### 验证码倒计时

下面代码演示了获取验证码需求中倒计时配合按钮的使用。

@code('${DEMO_PATH}/count-down/demo/Captcha.tsx')

## API

### CountDownProps

| 属性      | 描述                   | 类型                                            | 默认值     |
| --------- | ---------------------- | ----------------------------------------------- | ---------- |
| children  | 自定义渲染函数         | (time: CountDownCurrentTime) => React.ReactNode | -          |
| time      | 倒计时总时长，单位毫秒 | number                                          | -          |
| autoStart | 是否自动开始倒计时     | boolean                                         | true       |
| format    | 时间格式               | string                                          | 'HH:mm:ss' |
| interval  | 倒计时时间改变间隔     | number                                          | 1000       |
| onChange  | 倒计时变化时触发       | (time: CountDownCurrentTime) => void            | -          |
| onFinish  | 倒计时结束时触发       | () => void                                      | -          |

### CountDownRef

| 属性  | 描述       | 类型       |
| ----- | ---------- | ---------- |
| start | 开始倒计时 | () => void |
| pause | 暂停倒计时 | () => void |
| reset | 重置倒计时 | () => void |

### CountDownCurrentTime 类型

| 属性         | 描述                   | 类型   |
| ------------ | ---------------------- | ------ |
| milliseconds | 剩余毫秒               | number |
| seconds      | 剩余秒数               | number |
| minutes      | 剩余分钟               | number |
| hours        | 剩余小时               | number |
| days         | 剩余天数               | number |
| total        | 剩余总时间（单位毫秒） | number |
