# Cell 单元格

### 介绍

表示列表中单个展示项，结合单元格组常用于个人中心、设置等页面列表。

### 引入

```js
import { Cell } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Cell.Group>
  <Cell title="标题" />
  <Cell title="标题" value="值" />
  <Cell title="标题" value="值" label="标签" />
  <Cell
    title="很长的标题标题标题标题标题标题标题标题标题标题标题标题"
    value="值值"
  />
  <Cell
    title="标题"
    value="很长的值值值值值值值值值值值值值值值值值值值值值值值值"
  />
  <Cell
    title="很长的标题标题标题标题标题标题标题标题"
    value="很长的值值值值值值值值值值值值值值值值"
    label="很长的标签标签标签标签标签标签标签标签"
  />
</Cell.Group>
```

### 自定义内容

```tsx
<Cell.Group>
  <Cell title="无线局域网" value={<Switch defaultChecked></Switch>} />
  <Cell
    title="音量"
    bodyStyle={{ maxWidth: 40 }}
    footer={<Slider style={{ width: '100%' }} defaultValue={50}></Slider>}
  />
  <Cell>
    <View style={{ padding: 20 }}>
      <View style={{ textAlign: 'center' }}>
        <Image src={logo} style={{ width: 48 }}></Image>
        <View style={{ fontSize: 20 }}>这是一句简洁</View>
      </View>
      <View
        style={{
          fontSize: 14,
          marginTop: 10,
          color: 'var(--sar-secondary-color)',
        }}
      >
        这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述...
      </View>
    </View>
  </Cell>
  <Cell
    bodyStyle={{ maxWidth: 80 }}
    title="用户名"
    footer={<Input inlaid placeholder="请输入用户名" />}
  />
  <Cell
    bodyStyle={{ maxWidth: 80 }}
    title="密码"
    footer={<Input inlaid type="password" placeholder="请输入密码" />}
  />
</Cell.Group>
```

### 可点击的

```tsx
<Cell.Group>
  <Cell isLink title="标题" />
  <Cell isLink title="标题" value="值" arrowDirection="down" />
</Cell.Group>
```

### 图标

```tsx
<Cell.Group>
  <Cell
    title="下载"
    isLink
    icon={
      <Icon
        size={24}
        prefix="demo-icon"
        name="arrow-down-square-fill"
        color="#4994EC"
      />
    }
  />
  <Cell
    title="订阅"
    isLink
    icon={<Icon size={24} prefix="demo-icon" name="rss-fill" color="#E78A3D" />}
  />
  <Cell
    title="视频"
    isLink
    icon={
      <Icon
        size={24}
        prefix="demo-icon"
        name="caret-left-square-fill"
        color="#C24F4A"
      />
    }
  />
</Cell.Group>
```

### 内嵌的图标

在 `Cell` 或者 `CellGroup` 上添加 `inset` 属性让图标看起来位于单元格主体里面。

```tsx
<Cell.Group inset>
  <Cell
    title="下载"
    isLink
    icon={
      <Icon
        size={20}
        prefix="demo-icon"
        name="arrow-down-square-fill"
        color="#4994EC"
      />
    }
  />
  <Cell
    title="订阅"
    isLink
    icon={<Icon size={20} prefix="demo-icon" name="rss-fill" color="#E78A3D" />}
  />
  <Cell
    title="视频"
    isLink
    icon={
      <Icon
        size={20}
        prefix="demo-icon"
        name="caret-left-square-fill"
        color="#C24F4A"
      />
    }
  />
</Cell.Group>
```

### 分组

```tsx
<Cell.Group title="分组标题" label="分组标签">
  <Cell title="标题" value="值" />
  <Cell title="标题" value="值" />
</Cell.Group>
```

### 卡片风格

```tsx
<Cell.Group title="分组标题" label="分组标签" card>
  <Cell title="标题" value="值" />
  <Cell title="标题" value="值" />
</Cell.Group>
```

## API

### CellProps

| 属性           | 描述                                               | 类型                         | 默认值  |
| -------------- | -------------------------------------------------- | ---------------------------- | ------- |
| title          | 左侧标题                                           | React.ReactNode              | -       |
| label          | 标题下方的描述信息                                 | React.ReactNode              | -       |
| value          | 右侧值                                             | React.ReactNode              | -       |
| footer         | 自定义 `footer`，会覆盖 `value`、`label` 和`arrow` | React.ReactNode              | -       |
| isLink         | 是否展示右侧箭头并开启点击反馈                     | boolean                      | false   |
| arrowDirection | 箭头方向                                           | 'up' \| 'right' \| 'down'    | 'right' |
| arrow          | 自定义箭头                                         | React.ReactNode              | -       |
| icon           | 左侧图标                                           | React.ReactNode              | -       |
| inset          | 内嵌图标                                           | boolean                      | false   |
| bodyStyle      | `body` 样式                                        | CSSProperties                | -       |
| bodyClass      | `body` 类名                                        | string                       | -       |
| footerStyle    | `footer` 样式                                      | CSSProperties                | -       |
| footerClass    | `footer` 类名                                      | string                       | -       |
| onClick        | 点击单元格时触发                                   | (event: ITouchEvent) => void | -       |

### CellGroupProps

| 属性        | 描述                    | 类型            | 默认值 |
| ----------- | ----------------------- | --------------- | ------ |
| title       | 单元格组标题            | React.ReactNode | -      |
| label       | 单元格组底部描述信息    | React.ReactNode | -      |
| card        | 卡片风格                | boolean         | false  |
| inlaid      | 嵌入式状态              | boolean         | false  |
| inset       | 内嵌图标                | boolean         | false  |
| bodyStyle   | `Cell` 的 `body` 样式   | CSSProperties   | -      |
| bodyClass   | `Cell` 的 `body` 类名   | string          | -      |
| footerStyle | `Cell` 的 `footer` 样式 | CSSProperties   | -      |
| footerClass | `Cell` 的 `footer` 类名 | string          | -      |

## 主题定制

### CSS 变量

%{variables}
