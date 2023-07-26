# Skeleton 骨架屏

### 介绍

在内容加载过程中提供一组占位图形，通常图形会描述内容的概要排版。

### 引入

```js
import { Skeleton } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Skeleton />
```

### 显示标题

```tsx
<Skeleton title />
```

### 显示头像

```tsx
<Skeleton avatar title />
```

### 圆形头像

```tsx
<Skeleton avatar avatarRound title />
```

### 圆角标题和段落

```tsx
<Skeleton avatar title round />
```

### 动画效果

```tsx
<Skeleton avatar title animated />
```

### 包含子组件

```tsx
export default () => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Switch
        defaultChecked={!loading}
        onChange={(check) => setLoading(!check)}
      ></Switch>

      <Skeleton avatar title animated loading={loading}>
        <View style={{ display: 'flex' }}>
          <View style={{ flex: 'none', marginRight: 15 }}>
            <Icon name="person" size={32}></Icon>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 10, fontSize: '1.2em' }}>
              我是一个标题
            </View>
            <View>
              我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落
            </View>
          </View>
        </View>
      </Skeleton>
    </>
  )
}
```

### 自定义

```tsx
<View
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
  }}
>
  {Array(8)
    .fill(0)
    .map((_, i) => (
      <View
        key={i}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Skeleton.Avatar size={48} animated />
        <Skeleton.Block animated />
      </View>
    ))}
</View>

<View style={{ display: 'flex', gap: 10, marginTop: 20 }}>
  <Skeleton.Block style={{ width: 100, height: 80 }} animated />
  <View style={{ flex: 1 }}>
    <Skeleton.Paragraph rows={2} animated />
    <Skeleton.Block
      style={{ width: 60, height: 30, marginLeft: 'auto' }}
      animated
    />
  </View>
</View>
```

## API

### SkeletonProps

| 属性        | 描述                                          | 类型             | 默认值 |
| ----------- | --------------------------------------------- | ---------------- | ------ |
| rows        | 段落行数                                      | number           | 3      |
| title       | 是否显示标题                                  | boolean          | false  |
| avatar      | 是否显示头像                                  | boolean          | false  |
| avatarSize  | 头像尺寸                                      | number \| string | -      |
| avatarRound | 是否显示圆形头像                              | boolean          | true   |
| round       | 是否将标题和段落显示为圆角风格                | boolean          | false  |
| loading     | 是否显示骨架屏，传 `false` 时会展示子组件内容 | boolean          | true   |
| animated    | 是否开启动画                                  | boolean          | false  |

### SkeletonBlockProps

| 属性     | 描述               | 类型    | 默认值 |
| -------- | ------------------ | ------- | ------ |
| animated | 是否开启动画       | boolean | false  |
| round    | 是否显示为圆角风格 | boolean | false  |

### SkeletonAvatarProps

继承 `SkeletonBlockProps` 并有以下额外属性：

| 属性 | 描述     | 类型             | 默认值 |
| ---- | -------- | ---------------- | ------ |
| size | 头像尺寸 | number \| string | -      |

### SkeletonTitleProps

继承 `SkeletonBlockProps` 并有以下额外属性：

| 属性  | 描述     | 类型             | 默认值 |
| ----- | -------- | ---------------- | ------ |
| width | 标题宽度 | number \| string | -      |

### SkeletonParagraphProps

继承 `SkeletonBlockProps` 并有以下额外属性：

| 属性 | 描述     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| rows | 段落行数 | number | 3      |

## 主题定制

### CSS 变量

%{variables}

```

```
