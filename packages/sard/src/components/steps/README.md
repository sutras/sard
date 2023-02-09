# Steps 步骤条

### 介绍

引导用户按照流程完成任务的分步导航条。

### 引入

```js
import { Steps } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Center.tsx",
    "./demo/Vertical.tsx",
    "./demo/VerticalCenter.tsx",
    "./demo/CurrentStatus.tsx",
    "./demo/Icon.tsx",
    "./demo/Status.tsx",
    "./demo/Clickable.tsx",
    "./demo/Disabled.tsx"
  ]
</script>

## API

### StepsProps

| 属性      | 描述                 | 类型                                       | 默认值 |
| --------- | -------------------- | ------------------------------------------ | ------ |
| center    | 是否居中             | boolean                                    | false  |
| vertical  | 是否垂直             | boolean                                    | false  |
| current   | 当前步骤对应的索引值 | number                                     | 0      |
| status    | 指定当前步骤的状态   | 'wait' \| 'process' \| 'error' \| 'finish' | -      |
| lineColor | 线条颜色             | string                                     | -      |
| clickable | 是否可点击           | boolean                                    | false  |
| disabled  | 是否禁用             | boolean                                    | false  |

### StepsStepProps

| 属性      | 描述       | 类型                                       | 默认值 |
| --------- | ---------- | ------------------------------------------ | ------ |
| center    | 是否居中   | boolean                                    | false  |
| vertical  | 是否垂直   | boolean                                    | false  |
| status    | 自定义状态 | 'wait' \| 'process' \| 'error' \| 'finish' | -      |
| lineColor | 线条颜色   | string                                     | -      |
| clickable | 是否可点击 | boolean                                    | false  |
| disabled  | 是否禁用   | boolean                                    | false  |
| onClick   | 点击时触发 | (event: React.MouseEvent) => void          | -      |

## 主题定制

### SCSS

```scss

```
