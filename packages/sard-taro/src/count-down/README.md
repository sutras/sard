# CountDown 倒计时

### 介绍

倒计时的展示 ，以便告知用户在一定时间后可以进行某些操作。

### 引入

```js
import { CountDown } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<CountDown time={1000 * 60 * 60 * 2} />
```

### 自定义格式

```tsx
<CountDown time={1000 * 60 * 60 * 2} format="HH 时 mm 分 ss 秒" />
```

### 毫秒级别的渲染

```tsx
<CountDown
  time={1000 * 60 * 60 * 2}
  format="HH 时 mm 分 ss 秒 SSS 毫秒"
  interval={93}
/>
```

### 自定义样式

```tsx
<CountDown time={1000 * 60 * 60 * 2} interval={93}>
  {(time) => (
    <View className="time-wrap">
      <View className="time">{String(time.hours).padStart(2, '0')}</View>
      <View className="colon">:</View>
      <View className="time">{String(time.minutes).padStart(2, '0')}</View>
      <View className="colon">:</View>
      <View className="time">{String(time.seconds).padStart(2, '0')}</View>
    </View>
  )}
</CountDown>
```

### 手动控制

```tsx
import { CountDownRef } from 'sard-taro'
export default () => {
  const ref = useRef<CountDownRef>(null)
  return (
    <Button onClick={() => ref.current?.start()}>开始</Button>
    <Button onClick={() => ref.current?.pause()}>暂停</Button>
    <Button onClick={() => ref.current?.reset()}>重置</Button>
    <CountDown
      ref={ref}
      time={1000 * 10}
      format="ss:SSS"
      interval={60}
      autoStart={false}
    />
  )
}
```

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

## 主题定制

### CSS 变量

%{variables}
