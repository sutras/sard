# Accordion 手风琴

### 介绍

通过折叠收纳内容，允许同时展开一个或多个。

### 引入

```js
import { Accordion } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Accordion>
  <Accordion.Item title="标题1">内容1</Accordion.Item>
  <Accordion.Item title="标题2">内容2</Accordion.Item>
  <Accordion.Item title="标题3">内容3</Accordion.Item>
</Accordion>
```

### 默认展开

使用 defaultActiveKey 指定默认展开的 Item，AccordionItem 可以指定一个 name 属性，默认为 DOM 中子节点位置下标。

```tsx
<Accordion defaultActiveKey={1}>
  <Accordion.Item title="标题1">内容1</Accordion.Item>
  <Accordion.Item title="标题2">内容2</Accordion.Item>
  <Accordion.Item title="标题3">内容3</Accordion.Item>
</Accordion>
```

### 展开多个

```tsx
<Accordion multiple defaultActiveKey={[0, 1]}>
  <Accordion.Item title="标题1">内容1</Accordion.Item>
  <Accordion.Item title="标题2">内容2</Accordion.Item>
  <Accordion.Item title="标题3">内容3</Accordion.Item>
</Accordion>
```

### 受控

```tsx
<Accordion activeKey={activeKey} onChange={handleChange}>
  <Accordion.Item title="标题1">内容1</Accordion.Item>
  <Accordion.Item title="标题2">内容2</Accordion.Item>
  <Accordion.Item title="标题3">内容3</Accordion.Item>
</Accordion>
```

### 禁用

```tsx
<Accordion>
  <Accordion.Item title="标题1">内容1</Accordion.Item>
  <Accordion.Item disabled title="标题2">
    内容2
  </Accordion.Item>
  <Accordion.Item title="标题3">内容3</Accordion.Item>
</Accordion>
```

### 插槽

```tsx
<Accordion>
  <Accordion.Item
    title={
      <>
        <Icon name="bi-cup-hot"></Icon>
        <Text>标题1</Text>
      </>
    }
    icon={(active) => (
      <Icon name={active ? 'caret-up-fill' : 'caret-down-fill'}></Icon>
    )}
  >
    内容1
  </Accordion.Item>
  <Accordion.Item title="标题2">内容2</Accordion.Item>
  <Accordion.Item title="标题3">内容3</Accordion.Item>
</Accordion>
```

### 折叠时间

```tsx
<Accordion duration={0}>
  <Accordion.Item title="标题1">内容1</Accordion.Item>
  <Accordion.Item title="标题2">内容2</Accordion.Item>
  <Accordion.Item title="标题3">内容3</Accordion.Item>
</Accordion>
```

## API

### AccordionProps

| 属性             | 描述                    | 类型                                                          | 默认值 |
| ---------------- | ----------------------- | ------------------------------------------------------------- | ------ |
| duration         | 展开折叠缓动时间        | number                                                        | -      |
| multiple         | 是否可同时展开多个      | boolean                                                       | false  |
| defaultActiveKey | 默认选中面板的 key      | string \| number \| (string \| number)[]                      | -      |
| activeKey        | 当前激活 tab 面板的 key | string \| number \| (string \| number)[]                      | -      |
| onChange         | 切换面板时触发          | (activeKey: string \| number \| (string \| number)[]) => void | -      |

### AccordionItemProps

| 属性     | 描述             | 类型                                                      | 默认值 |
| -------- | ---------------- | --------------------------------------------------------- | ------ |
| title    | 面板标题         | React.ReactNode                                           | -      |
| icon     | 面板右侧图标     | React.ReactNode \| ((active: boolean) => React.ReactNode) | -      |
| key      | 对应 `activeKey` | string \| number                                          | -      |
| disabled | 禁用面板         | boolean                                                   | -      |
| duration | 展开折叠缓动时间 | number                                                    | 300    |
| onClick  | 点击面板头部触发 | (event: ITouchEvent) => void                              | -      |

## 主题定制

### CSS 变量

%{variables}
