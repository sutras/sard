# Tabs 标签页

### 介绍

选项卡切换组件。

### 引入

```js
import { Tabs } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Tabs>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 胶囊标签

```tsx
<Tabs type="pill">
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 边框标签

```tsx
<Tabs type="border">
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 卡片标签

```tsx
<Tabs
  type="card"
  inactiveLabelStyle={{ background: 'var(--sar-secondary-bg)' }}
>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 垂直

```tsx
<Tabs vertical>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>

<Tabs vertical type="pill">
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>

<Tabs vertical type="border">
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>

<Tabs
  vertical
  type="card"
  inactiveLabelStyle={{ background: 'var(--sar-secondary-bg)' }}
>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 自定义样式

```tsx
<Tabs
  headerStyle={{ borderBottom: '1px solid var(--sar-border-color)' }}
  activeLabelStyle={{ fontWeight: 'bold', color: 'orange' }}
  inkbarStyle={{ background: 'orange' }}
>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>

<Tabs type="border" wrapperStyle={{ color: 'orange' }}>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>

<Tabs type="pill" line activeLabelStyle={{ backgroundColor: 'orange' }}>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
  <TabsPane label="标签4">内容4</TabsPane>
  <TabsPane label="标签5">内容5</TabsPane>
  <TabsPane label="标签6">内容6</TabsPane>
</Tabs>

<Tabs
  type="card"
  inactiveLabelStyle={{ background: 'var(--sar-secondary-bg)' }}
  lineWidth="15px"
>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 自定义标签

```tsx
<Tabs>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane
    label={(active) => (
      <View>
        <Icon prefix="demo-icon" name={active ? 'heart-fill' : 'heart'} />
        <Text>标签1</Text>
      </View>
    )}
  >
    内容2
  </TabsPane>
  <TabsPane label={<Badge value={2}>标签3</Badge>}>内容3</TabsPane>
</Tabs>
```

### 禁用标签

```tsx
<Tabs>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2" disabled>
    内容2
  </TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 名称匹配

可以使用 `key` 唯一标识当前 `pane`，默认 `key` 为当前 `pane` 在 `DOM` 中的位置下标。

```tsx
<Tabs>
  <TabsPane key="key1" label="标签1">
    内容1
  </TabsPane>
  <TabsPane key="key2" label="标签2">
    内容2
  </TabsPane>
  <TabsPane key="key3" label="标签3">
    内容3
  </TabsPane>
</Tabs>
```

### 受控组件

```tsx
export default () => {
  const [activeKey, setActiveKey] = useState<number | string>(1)

  return (
    <Button onClick={() => setActiveKey(2)}>切换到标签3</Button>

    <Tabs activeKey={activeKey} onChange={setActiveKey}>
      <TabsPane label="标签1">内容1</TabsPane>
      <TabsPane label="标签2">内容2</TabsPane>
      <TabsPane label="标签3">内容3</TabsPane>
    </Tabs>
  )
}
```

### 可滚动的标签栏

当标签数大于 `scrollCount`，标签父元素溢出时可以横向滚动。

```tsx
<Tabs>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
  <TabsPane label="标签4">内容4</TabsPane>
  <TabsPane label="标签5">内容5</TabsPane>
  <TabsPane label="标签6">内容6</TabsPane>
  <TabsPane label="标签7">内容7</TabsPane>
</Tabs>
```

### 插槽

```tsx
<Tabs
  prepend={<View style={{ fontWeight: 'bold' }}>推荐</View>}
  append={<Icon size={20} prefix="demo-icon" name="list-task"></Icon>}
>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
  <TabsPane label="标签4">内容4</TabsPane>
  <TabsPane label="标签5">内容5</TabsPane>
  <TabsPane label="标签6">内容6</TabsPane>
  <TabsPane label="标签7">内容7</TabsPane>
</Tabs>
```

### 切换动画

```tsx
<Tabs animated>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 滑动切换

```tsx
<Tabs swipeable swiperProps={{ style: { height: 100 } }}>
  <TabsPane label="标签1">内容1</TabsPane>
  <TabsPane label="标签2">内容2</TabsPane>
  <TabsPane label="标签3">内容3</TabsPane>
</Tabs>
```

### 粘性定位

```tsx
<Tabs sticky headerStyle={{ top: 0, background: 'var(--sar-emphasis-bg)' }}>
  {Array(3)
    .fill(0)
    .map((_, i) => (
      <TabsPane key={i} label={`标签${i + 1}`}>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <View key={index}>
              内容 {i + 1}-{index + 1}
            </View>
          ))}
      </TabsPane>
    ))}
</Tabs>
```

### 滚动监听

```tsx
<Tabs
  scrollspy
  offset={-48 - 5}
  sticky
  headerStyle={{ top: 0, background: 'var(--sar-emphasis-bg)' }}
>
  {Array(7)
    .fill(0)
    .map((_, i) => (
      <TabsPane
        key={i}
        label={`标签${i + 1}`}
        style={{ border: '1px solid #ddd', margin: 5, padding: 50 }}
      >
        内容{i + 1}
      </TabsPane>
    ))}
</Tabs>
```

### 垂直滚动监听

```tsx
<Tabs
  type="card"
  vertical
  sticky
  scrollspy
  offset={-5}
  headerStyle={{
    top: 5,
    background: 'var(--sar-secondary-bg)',
  }}
  wrapperStyle={{
    maxHeight: '100vh',
  }}
  contentStyle={{
    paddingBottom: 50,
  }}
  activeLabelStyle={{ background: 'var(--sar-body-bg)' }}
>
  {Array(20)
    .fill(0)
    .map((_, i) => (
      <TabsPane
        key={i}
        label={`标签${i + 1}`}
        style={{ border: '1px solid #ddd', margin: 5, padding: 70 }}
      >
        内容{i + 1}
      </TabsPane>
    ))}
</Tabs>
```

## API

### TabsProps

| 属性                | 描述                                     | 类型                                     | 默认值   |
| ------------------- | ---------------------------------------- | ---------------------------------------- | -------- |
| defaultActiveKey    | 初始化选中面板的 `key`                   | number \| string                         | -        |
| activeKey           | 选中面板的 `key`                         | number \| string                         | -        |
| onChange            | 切换面板时触发                           | (key: number \| string) => void          | -        |
| onLabelClick        | label 点击时触发                         | (key: number \| string) => void          | -        |
| inkbarWrapperStyle  | 墨水条包裹元素的样式                     | React.CSSProperties                      | -        |
| inkbarWidth         | 墨水条宽度                               | 'auto' \| string                         | '40px'   |
| inkbarStyle         | 墨水条样式                               | React.CSSProperties                      | -        |
| inkbar              | 自定义墨水条                             | React.ReactNode                          | -        |
| scrollCount         | 滚动阈值，标签数量超过此值时开始横向滚动 | number                                   | 5        |
| type                | 标签样式类型                             | 'inkbar' \| 'card' \| 'pill' \| 'border' | 'inkbar' |
| headerClass         | header 的 `className`                    | string                                   | -        |
| headerStyle         | header 的样式                            | React.CSSProperties                      | -        |
| bodyClass           | body 的 `className`                      | string                                   | -        |
| bodyStyle           | body 的样式                              | React.CSSProperties                      | -        |
| wrapperClass        | wrapper 的 `className`                   | string                                   | -        |
| wrapperStyle        | wrapper 的样式                           | React.CSSProperties                      | -        |
| contentClass        | content 的 `className`                   | string                                   | -        |
| contentStyle        | content 的样式                           | React.CSSProperties                      | -        |
| labelClass          | 标签的 `className`                       | string                                   | -        |
| labelStyle          | 标签的样式                               | React.CSSProperties                      | -        |
| activeLabelStyle    | 选中标签的样式                           | React.CSSProperties                      | -        |
| activeLabelClass    | 选中标签的 `className`                   | string                                   | -        |
| inactiveLabelStyle  | 未选中标签的样式                         | React.CSSProperties                      | -        |
| inactiveLabelClass  | 未选中标签的 `className`                 | string                                   | -        |
| line                | 自定义卡片线条                           | React.ReactNode                          | -        |
| lineWidth           | 卡片线条宽度                             | string \| number                         | -        |
| lineStyle           | 卡片线条样式                             | React.CSSProperties                      | -        |
| lineClass           | 卡片线条类名                             | string                                   | -        |
| scrollWithAnimation | label 滚动时是否使用动画过渡             | boolean                                  | true     |
| sticky              | 是否粘性定位到顶部                       | boolean                                  | false    |
| prepend             | 标签栏前置插槽                           | React.ReactNode                          | -        |
| append              | 标签栏后置插槽                           | React.ReactNode                          | -        |
| animated            | 是否开启面板切换动画                     | boolean                                  | false    |
| scrollspy           | 是否开启滚动监听                         | boolean                                  | false    |
| duration            | 滚动监听滚动的动画时长                   | number                                   | 300      |
| threshold           | 滚动监听节流阈值                         | number                                   | 150      |
| offset              | 滚动监听的偏移量                         | number                                   | 0        |
| vertical            | 垂直标签                                 | boolean                                  | false    |

### TabPaneProps

| 属性       | 描述               | 类型                | 默认值 |
| ---------- | ------------------ | ------------------- | ------ |
| label      | 标签文字           | React.ReactNode     | -      |
| labelClass | 标签的 `className` | string              | -      |
| labelStyle | 标签的样式         | React.CSSProperties | -      |
| key        | 对应 `activeKey`   | number \| string    | -      |
| disabled   | 是否禁用           | boolean             | false  |

## 主题定制

### CSS 变量

%{variables}
