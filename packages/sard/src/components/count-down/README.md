# CountDown 倒计时

### 介绍

倒计时的展示 ，以便告知用户在一定时间后可以进行某些操作。

### 引入

```js
import { CountDown } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Format.tsx",
    "./demo/Milliseconds.tsx",
    "./demo/Style.tsx",
    "./demo/Imperative.tsx"
  ]
</script>

## API

### Props

| 属性      | 描述                   | 类型                                   | 默认值     |
| --------- | ---------------------- | -------------------------------------- | ---------- |
| children  | 自定义渲染函数         | (time: CurrentTime) => React.ReactNode | -          |
| time      | 倒计时总时长，单位毫秒 | number                                 | -          |
| autoStart | 是否自动开始倒计时     | boolean                                | true       |
| format    | 时间格式               | string                                 | 'HH:mm:ss' |
| interval  | 倒计时时间改变间隔     | number                                 | 1000       |
| onChange  | 倒计时变化时触发       | (time: CurrentTime) => void            | -          |
| onFinish  | 倒计时结束时触发       | () => void                             | -          |

### 方法

| 名称  | 描述       | 类型       |
| ----- | ---------- | ---------- |
| start | 开始倒计时 | () => void |
| pause | 暂停倒计时 | () => void |
| reset | 重置倒计时 | () => void |

### CurrentTime 类型

| 属性         | 描述                   | 类型   |
| ------------ | ---------------------- | ------ |
| milliseconds | 剩余毫秒               | number |
| seconds      | 剩余秒数               | number |
| minutes      | 剩余分钟               | number |
| hours        | 剩余小时               | number |
| days         | 剩余天数               | number |
| total        | 剩余总时间（单位毫秒） | number |

## 主题定制

### SCSS

```scss

```
