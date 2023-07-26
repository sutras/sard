# Navbar 头部导航

### 介绍

在页面顶部的导航栏。

### 引入

```js
import { Navbar } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Navbar title="标题" />
```

### 导航项

可以在 `left/right` 插槽中放置导航项。

```tsx
<Navbar
  title="标题"
  left={
    <Navbar.Item onClick={() => console.log('返回')}>
      <Icon name="left" size={16}></Icon>
      <View>返回</View>
    </Navbar.Item>
  }
  right={
    <Navbar.Item onClick={() => console.log('查看信息')}>
      <Icon name="list-task" size={20}></Icon>
    </Navbar.Item>
  }
/>
```

### 流动导航

默认标题居中， `left/right` 绝对定位于左右两侧；可以使用 `flow` 使其变为流动布局。

```tsx
<Navbar
  flow
  left={
    <Navbar.Item>
      <Icon prefix="demo-icon" name="list-task" size={18}></Icon>
    </Navbar.Item>
  }
  title={<View style={{ textAlign: 'left' }}>发现</View>}
  right={
    <>
      <Navbar.Item>
        <Icon prefix="demo-icon" name="share" size={16}></Icon>
      </Navbar.Item>
      <Navbar.Item>
        <Icon prefix="demo-icon" name="star" size={18}></Icon>
      </Navbar.Item>
      <Navbar.Item>
        <Icon prefix="demo-icon" name="heart" size={16}></Icon>
      </Navbar.Item>
    </>
  }
></Navbar>
```

### 自定义 content

```tsx
<Navbar
  flow
  left={
    <Navbar.Item>
      <View style={{ marginRight: 2 }}>城市</View>
      <Icon name="down" size={16}></Icon>
    </Navbar.Item>
  }
  right={<Navbar.Item>搜索</Navbar.Item>}
>
  <Input placeholder="请输入关键词" />
</Navbar>
```

### 固定在顶部

```tsx
export default () => {
  const [fixed, setFixed] = useState(false)

  return (
    <>
      <Checkbox onChange={setFixed} style={{ margin: 20 }}>
        固定定位
      </Checkbox>

      <Navbar title="顶部的标题" fixed={fixed} zIndex="1000" />
    </>
  )
}
```

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Item.tsx",
    "./demo/Content.tsx",
    "./demo/Flow.tsx",
    "./demo/Fixed.tsx"
  ]
</script>

## API

### NavbarProps

| 属性     | 描述                                                                               | 类型             | 默认值 |
| -------- | ---------------------------------------------------------------------------------- | ---------------- | ------ |
| children | 自定义内容                                                                         | React.ReactNode  | -      |
| title    | 自定义标题                                                                         | React.ReactNode  | -      |
| left     | 自定义左侧区域内容                                                                 | React.ReactNode  | -      |
| right    | 自定义右侧区域内容                                                                 | React.ReactNode  | -      |
| flow     | 默认 `left/right` 绝对定位于左右两侧，标题居中；可以使用 `flow` 使其变为流动布局。 | boolean          | false  |
| fixed    | 固定到顶部                                                                         | boolean          | false  |
| zIndex   | 固定定位时的层级                                                                   | string \| number | 1      |

### NavbarItemProps

| 属性    | 描述       | 类型                         | 默认值 |
| ------- | ---------- | ---------------------------- | ------ |
| onClick | 点击时触发 | (event: ITouchEvent) => void | -      |

## 主题定制

### CSS 变量

%{variables}
