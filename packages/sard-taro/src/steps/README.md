# Steps 步骤条

### 介绍

引导用户按照流程完成任务的分步导航条。

### 引入

```js
import { Steps } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `current` 属性指定步骤的下标，小于这个下标的步骤状态为 `finish`，等于这个下标的步骤状态为 `process`，大于这个下标的步骤状态为 `wait`。

```tsx
export default () => {
  const [current, setCurrent] = useState(1)

  const prevStep = () => {
    setCurrent(current <= 0 ? 3 : current - 1)
  }
  const nextStep = () => {
    setCurrent(current >= 3 ? 0 : current + 1)
  }

  return (
    <Steps current={current}>
      <Steps.Step>步骤1</Steps.Step>
      <Steps.Step>步骤2</Steps.Step>
      <Steps.Step>步骤3</Steps.Step>
    </Steps>
    <Button onClick={prevStep}>上一步</Button>
    <Button onClick={nextStep}>下一步</Button>
  )
}
```

### 居中

```tsx
<Steps current={current} center>
  <Steps.Step>步骤1</Steps.Step>
  <Steps.Step>步骤2</Steps.Step>
  <Steps.Step>步骤3</Steps.Step>
</Steps>
<Button onClick={prevStep}>上一步</Button>
<Button onClick={nextStep}>下一步</Button>
```

### 垂直步骤条

```tsx
<Steps vertical current={current}>
  <Steps.Step>
    <View>步骤1</View>
    <View>这是描述</View>
  </Steps.Step>
  <Steps.Step>
    <View>步骤2</View>
    <View>这是描述</View>
  </Steps.Step>
  <Steps.Step>
    <View>步骤3</View>
    <View>这是描述</View>
  </Steps.Step>
</Steps>
<Button onClick={prevStep}>上一步</Button>
<Button onClick={nextStep}>下一步</Button>
```

### 垂直居中

```tsx
<Steps vertical center current={current}>
  <Steps.Step>
    <View>步骤1</View>
    <View>这是描述</View>
  </Steps.Step>
  <Steps.Step>
    <View>步骤2</View>
    <View>这是描述</View>
  </Steps.Step>
  <Steps.Step>
    <View>步骤3</View>
    <View>这是描述</View>
  </Steps.Step>
</Steps>
<Button onClick={prevStep}>上一步</Button>
<Button onClick={nextStep}>下一步</Button>
```

### 自定义图标

```tsx
<Steps
  center
  current={current}
  icon={(status) => (
    <Icon
      size={18}
      name={status === 'finish' ? 'star-fill' : 'star'}
    ></Icon>
  )}
>
  <Steps.Step>步骤1</Steps.Step>
  <Steps.Step>步骤2</Steps.Step>
  <Steps.Step>步骤3</Steps.Step>
</Steps>
<Button onClick={prevStep}>上一步</Button>
<Button onClick={nextStep}>下一步</Button>
```

### 当前步骤状态

可以设置当前处理中的步骤的状态为`finish`来模拟只有“未处理”和“已处理”两个状态的步骤条。

```tsx
<Steps vertical status="finish" current={current}>
  <Steps.Step>
    <View>订单已提交</View>
    <View className="small">01月01日 12:00</View>
  </Steps.Step>
  <Steps.Step>
    <View>正在处理中</View>
    <View className="small">01月01日 12:05</View>
  </Steps.Step>
  <Steps.Step>
    <View>订单已完成</View>
    <View className="small">01月01日 12:10</View>
  </Steps.Step>
</Steps>
```

### 错误步骤

可以设置当前处理中的步骤的状态为`error`表示步骤运行错误。

```tsx
<Steps current={1} center status="error">
  <Steps.Step>步骤1</Steps.Step>
  <Steps.Step>步骤2</Steps.Step>
  <Steps.Step>步骤3</Steps.Step>
</Steps>
```

### 自定义各步骤状态

```tsx
<Steps vertical lineColor="#ddd">
  <Steps.Step status="finish">
    <View>第1节</View>
    <View className="small">已学习</View>
  </Steps.Step>
  <Steps.Step status="process">
    <View>第2节</View>
    <View className="small">学习中</View>
  </Steps.Step>
  <Steps.Step status="wait">
    <View>第3节</View>
    <View className="small">未学习</View>
  </Steps.Step>
  <Steps.Step status="finish">
    <View>第4节</View>
    <View className="small">已学习</View>
  </Steps.Step>
  <Steps.Step status="error">
    <View>第5节</View>
    <View className="small">出错了</View>
  </Steps.Step>
</Steps>
```

### 可点击的

设置 `clickable` 属性添加点击状态。

```tsx
<Steps clickable center current={1}>
  <Steps.Step>步骤1</Steps.Step>
  <Steps.Step>步骤2</Steps.Step>
  <Steps.Step>步骤3</Steps.Step>
</Steps>

<Steps clickable center vertical current={1}>
  <Steps.Step>
    <div>步骤1</div>
    <div>这是描述</div>
  </Steps.Step>
  <Steps.Step>
    <div>步骤2</div>
    <div>这是描述</div>
  </Steps.Step>
  <Steps.Step>
    <div>步骤3</div>
    <div>这是描述</div>
  </Steps.Step>
</Steps>
```

### 禁用

```tsx
<Steps clickable center current={1} disabled>
  <Steps.Step>步骤1</Steps.Step>
  <Steps.Step>步骤2</Steps.Step>
  <Steps.Step>步骤3</Steps.Step>
</Steps>
```

## API

### StepsProps

| 属性      | 描述                 | 类型                                                          | 默认值 |
| --------- | -------------------- | ------------------------------------------------------------- | ------ |
| center    | 是否居中             | boolean                                                       | false  |
| vertical  | 是否垂直             | boolean                                                       | false  |
| current   | 当前步骤对应的索引值 | number                                                        | 0      |
| status    | 指定当前步骤的状态   | StepsStatus                                                   | -      |
| lineColor | 线条颜色             | string                                                        | -      |
| clickable | 是否可点击           | boolean                                                       | false  |
| disabled  | 是否禁用             | boolean                                                       | false  |
| icon      | 自定义图标           | React.ReactNode \| ((status: StepsStatus) => React.ReactNode) | -      |

### StepsStepProps

| 属性      | 描述       | 类型                                                          | 默认值 |
| --------- | ---------- | ------------------------------------------------------------- | ------ |
| status    | 自定义状态 | StepsStatus                                                   | -      |
| lineColor | 线条颜色   | string                                                        | -      |
| disabled  | 是否禁用   | boolean                                                       | false  |
| icon      | 自定义图标 | React.ReactNode \| ((status: StepsStatus) => React.ReactNode) | -      |
| onClick   | 点击时触发 | (event: ITouchEvent) => void                                  | -      |

### StepsStatus

```tsx
export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'
```

## 主题定制

### CSS 变量

%{variables}
