# Collapse 折叠

### 介绍

可以展开/折叠内容区域。

### 引入

```js
import { Collapse } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/collapse/demo/Basic.tsx)

## API

### CollapseProps

| 属性       | 描述                       | 类型       | 默认值 |
| ---------- | -------------------------- | ---------- | ------ |
| visible    | 是否可见                   | boolean    | false  |
| duration   | 展开/折叠持续时间，单位 ms | number     | 500    |
| onEnter    | 准备展开时触发             | () => void | -      |
| onEntering | 开始展开时触发             | () => void | -      |
| onEntered  | 完全展开时触发             | () => void | -      |
| onExit     | 准备折叠时触发             | () => void | -      |
| onExiting  | 开始折叠时触发             | () => void | -      |
| onExited   | 完全折叠时触发             | () => void | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
