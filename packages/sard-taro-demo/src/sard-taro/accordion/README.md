# Accordion 手风琴

### 介绍

通过折叠收纳内容，允许同时展开一个或多个。

### 引入

```ts
import { Accordion } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/accordion/demo/Basic.tsx)

### 默认展开

使用 `defaultActiveKey` 指定默认展开的面板，可以指定为为 `key` 属性的值，或者为组件所处的位置下标。

%(${DEMO_PATH}/accordion/demo/Expand.tsx)

### 展开多个

使用 `multiple` 属性可以同时展开多个面板，数组类型的 `defaultActiveKey` 可以默认展开多个面板。

%(${DEMO_PATH}/accordion/demo/MultipleExpand.tsx)

### 受控

%(${DEMO_PATH}/accordion/demo/Controllable.tsx)

### 禁用

使用 `disabled` 属性可以禁用指定单个面板。

%(${DEMO_PATH}/accordion/demo/Disabled.tsx)

### 自定义箭头

`arrow` 属性为接收当前面板展开状态的函数。

%(${DEMO_PATH}/accordion/demo/Arrow.tsx)

### 折叠时间

%(${DEMO_PATH}/accordion/demo/Duration.tsx)

## API

### AccordionProps

| 属性             | 描述                   | 类型                                                          | 默认值 |
| ---------------- | ---------------------- | ------------------------------------------------------------- | ------ |
| defaultActiveKey | 默认展开面板的 `key`   | string \| number \| (string \| number)[]                      | -      |
| activeKey        | 当前展开面板的 `key`   | string \| number \| (string \| number)[]                      | -      |
| onChange         | 切换面板时触发         | (activeKey: string \| number \| (string \| number)[]) => void | -      |
| multiple         | 是否可同时展开多个面板 | boolean                                                       | false  |
| duration         | 展开折叠缓动时间       | number                                                        | 300    |
| arrow            | 自定义箭头             | (expanded: boolean) => ReactNode                              | -      |

### AccordionItemProps

| 属性            | 描述             | 类型                                 | 默认值 |
| --------------- | ---------------- | ------------------------------------ | ------ |
| title           | 面板标题         | React.ReactNode                      | -      |
| arrow           | 自定义箭头       | (active: boolean) => React.ReactNode | -      |
| key             | 对应 `activeKey` | string \| number                     | -      |
| disabled        | 禁用面板         | boolean                              | -      |
| duration        | 展开折叠缓动时间 | number                               | 300    |
| onClick         | 点击面板头部触发 | (event: ITouchEvent) => void         | -      |
| arrow           | 自定义箭头       | (expanded: boolean) => ReactNode     | -      |
| expanded        | 是否展开         | boolean                              | -      |
| defaultExpanded | 是否默认展开     | boolean                              | -      |
| onChange        | 切换面板时触发   | (expanded: boolean) => void          | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
