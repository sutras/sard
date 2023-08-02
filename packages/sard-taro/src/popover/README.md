# Popover 气泡弹出框

### 介绍

弹出式的气泡菜单。

### 引入

```js
import { Popover } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Popover
  options={[
    {
      text: '选项1',
    },
    {
      text: '选项2',
    },
    {
      text: '选项3',
    },
  ]}
  reference={<Button>基础使用</Button>}
  onSelect={({ text }) => Toast.show(text)}
/>
```

### 暗黑模式

```tsx
<Popover
  theme="dark"
  options={[
    {
      text: '选项1',
    },
    {
      text: '选项2',
    },
    {
      text: '选项3',
    },
  ]}
  reference={<Button>自定义颜色</Button>}
  onSelect={({ text }) => Toast.show(text)}
/>
```

### 展示图标

```tsx
<Popover
  options={[
    {
      text: '选项1',
      iconProps: {
        prefix: 'demo-icon',
        name: 'upc-scan',
      },
    },
    {
      text: '选项2',
      iconProps: {
        prefix: 'demo-icon',
        name: 'camera',
      },
    },
    {
      text: '选项3',
      iconProps: {
        prefix: 'demo-icon',
        name: 'bell',
      },
    },
  ]}
  reference={<Button>展示图标</Button>}
  onSelect={({ text }) => Toast.show(text)}
/>
```

### 禁用选项

```tsx
<Popover
  options={[
    {
      text: '选项1',
      disabled: true,
    },
    {
      text: '选项2',
      disabled: true,
    },
    {
      text: '选项3',
    },
  ]}
  reference={<Button>禁用选项</Button>}
  onSelect={({ text }) => Toast.show(text)}
/>
```

### 水平排列

```tsx
<Popover
  direction="horizontal"
  options={[
    {
      text: '选项1',
      iconProps: {
        prefix: 'demo-icon',
        name: 'upc-scan',
      },
    },
    {
      text: '选项2',
    },
    {
      text: '选项3',
    },
  ]}
  reference={<Button>水平排列</Button>}
  onSelect={({ text }) => Toast.show(text)}
/>
```

### 自定义内容

```tsx
<Popover
  visible={customVisible}
  onVisible={setCustomVisible}
  direction="horizontal"
  reference={<Button>自定义内容</Button>}
>
  <Mesh clickable style={{ width: 280 }}>
    {Array(8)
      .fill(0)
      .map((_, index) => (
        <Mesh.Item
          key={index}
          text={`选项${index + 1}`}
          iconProps={{ name: 'image' }}
          onClick={() => {
            Toast.show(`选项${index + 1}`)
            setCustomVisible(false)
          }}
        ></Mesh.Item>
      ))}
  </Mesh>
</Popover>
```

### 弹出位置

```tsx
const [currentPlacement, setPlacement] = useState<PopoverPlacement>('bottom')

const [visible, setVisible] = useState(false)

const handlePlacement = (placement: PopoverPlacement) => {
  setPlacement(placement)
  setVisible(true)
}

const renderPlacementButton = (placement: PopoverPlacement) => {
  return (
    <Mesh.Item
      onClick={() => handlePlacement(placement)}
      style={{
        fontWeight: placement === currentPlacement ? 'bold' : '',
      }}
    >
      {placement
        .split('-')
        .map((word) => word.slice(0, 1).toUpperCase())
        .join('')}
    </Mesh.Item>
  )
}
```

```tsx
<Popover
  visible={visible}
  onVisible={setVisible}
  placement={currentPlacement}
  options={[
    {
      text: '选项1',
    },
    {
      text: '选项2',
    },
    {
      text: '选项3',
    },
  ]}
  reference={
    <View
      style={{
        width: 50,
        height: 50,
        margin: '100px auto',
        background: 'var(--sar-primary)',
      }}
    ></View>
  }
></Popover>

<View style={{ marginLeft: 60, marginRight: 60 }}>
  <Mesh columns={3} clickable>
    {renderPlacementButton('top-start')}
    {renderPlacementButton('top')}
    {renderPlacementButton('top-end')}
  </Mesh>
</View>

<View
  style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }}
>
  <Mesh columns={1} clickable style={{ width: 60 }}>
    {renderPlacementButton('left-start')}
    {renderPlacementButton('left')}
    {renderPlacementButton('left-end')}
  </Mesh>

  <Mesh columns={1} clickable style={{ width: 60 }}>
    {renderPlacementButton('right-start')}
    {renderPlacementButton('right')}
    {renderPlacementButton('right-end')}
  </Mesh>
</View>

<View style={{ marginLeft: 60, marginRight: 60 }}>
  <Mesh columns={3} clickable>
    {renderPlacementButton('bottom-start')}
    {renderPlacementButton('bottom')}
    {renderPlacementButton('bottom-end')}
  </Mesh>
</View>
```

## API

### PopoverProps

| 属性           | 描述                              | 类型                            | 默认值     |
| -------------- | --------------------------------- | ------------------------------- | ---------- |
| options        | 菜单选项列表                      | PopoverOption[]                 | []         |
| reference      | 触发气泡弹出框显示的元素          | React.ReactElement              | -          |
| refGap         | 气泡弹出框与`reference`元素的间距 | number                          | -          |
| viewportGap    | 气泡弹出框距与视窗的间距          | number                          | -          |
| placement      | 弹出位置                          | PopoverPlacement                | -          |
| direction      | 菜单选项排列方向                  | 'vertical' \| 'horizontal'      | 'vertical' |
| theme          | 主题风格                          | 'dark' \| 'light'               | 'light'    |
| onSelect       | 点击选项时触发                    | (option: PopoverOption) => void | -          |
| visible        | 是否显示气泡弹出框                | boolean                         | -          |
| defaultVisible | 默认是否显示气泡弹出框            | boolean                         | -          |
| onVisible      | 气泡弹出框显隐时触发              | (visible: boolean) => void      | -          |

### PopoverOption

| 属性      | 描述           | 类型            | 默认值 |
| --------- | -------------- | --------------- | ------ |
| text      | 选项文本       | React.ReactNode | -      |
| disabled  | 是否禁用选项   | boolean         | -      |
| iconProps | 选项左侧的图标 | IconProps       | -      |

### PopoverPlacement

```tsx
type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
```

## 主题定制

### CSS 变量

%{variables}
