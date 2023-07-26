# Dropdown 下拉菜单

### 介绍

可向下/向上弹出菜单列表，或自定义弹出的菜单内容。

### 引入

```js
import { Dropdown } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
export default () => {
  const options1 = [
    {
      label: '距离优先',
      value: '1',
    },
    {
      label: '速度优先',
      value: '2',
    },
    {
      label: '评分优先',
      value: '3',
    },
  ]
  const options2 = [
    {
      label: '30分钟内',
      value: '1',
    },
    {
      label: '40分钟内',
      value: '2',
    },
    {
      label: '50分钟内',
      value: '3',
    },
  ]

  return (
    <Dropdown>
      <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
      <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
    </Dropdown>
  )
}
```

### 添加 label

```tsx
<Dropdown>
  <Dropdown.Item label="排序" options={options1}></Dropdown.Item>
  <Dropdown.Item
    label="速度"
    options={options2}
    defaultValue="2"
  ></Dropdown.Item>
</Dropdown>
```

### 向上展开

```tsx
<Dropdown direction="up">
  <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
  <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
</Dropdown>
```

### 禁用

```tsx
<Dropdown disabled>
  <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
  <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
</Dropdown>
```

### 自定义图标

```tsx
<Dropdown
  icon={(visible) => {
    return <Icon name={visible ? 'up' : 'down'}></Icon>
  }}
>
  <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
  <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
</Dropdown>
```

### 自定义内容

```tsx
export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <Dropdown>
      <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
      <Dropdown.Item title="筛选" visible={visible} onVisible={setVisible}>
        <Cell.Group inlaid>
          <Cell title="包邮" value={<Switch></Switch>}></Cell>
          <Cell title="团购" value={<Switch></Switch>}></Cell>
          <Cell>
            <Button block onClick={() => setVisible(false)}>
              确认
            </Button>
          </Cell>
        </Cell.Group>
      </Dropdown.Item>
    </Dropdown>
  )
}
```

## API

### DropdownProps

| 属性         | 描述                         | 类型                                                       | 默认值 |
| ------------ | ---------------------------- | ---------------------------------------------------------- | ------ |
| direction    | 菜单弹出方向                 | 'down' \| 'up'                                             | 'down' |
| disabled     | 是否禁用                     | boolean                                                    | false  |
| awayClosable | 是否在点击外部区域后自动隐藏 | boolean                                                    | true   |
| maskClosable | 是否在点击遮罩后自动隐藏     | boolean                                                    | true   |
| icon         | 自定义图标                   | (visible: boolean, direction: 'up' \| 'down') => ReactNode | -      |

### DropdownItemProps

| 属性            | 描述                           | 类型                            | 默认值 |
| --------------- | ------------------------------ | ------------------------------- | ------ |
| title           | 标题，用于自定义菜单项         | React.ReactNode                 | -      |
| label           | 标签说明                       | React.ReactNode                 | -      |
| options         | 菜单选项                       | DropdownOptionProps[]           | []     |
| direction       | 菜单弹出方向                   | 'down' \| 'up'                  | 'down' |
| disabled        | 是否禁用                       | boolean                         | false  |
| value           | 当前菜单项的值                 | any                             | -      |
| defaultValue    | 当前菜单项的默认值             | any                             | -      |
| onChange        | 菜单项值改变时触发             | (value: any) => void            | -      |
| visible         | 弹出框是否可见                 | boolean                         | -      |
| defaultVisible  | 弹出框是否默认可见             | boolean                         | -      |
| onVisible       | 弹出框显隐时触发               | (visible: boolean) => void      | -      |
| onVisibleChange | 弹出框开始显示或完全隐藏时触发 | (visible: boolean) => void      | -      |
| awayClosable    | 是否在点击外部区域后自动隐藏   | boolean                         | true   |
| maskClosable    | 是否在点击遮罩后自动隐藏       | boolean                         | true   |
| icon            | 自定义图标                     | (visible: boolean) => ReactNode | -      |
| onClick         | 点击菜单项时触发               | (event: ITouchEvent) => void    | -      |
| popupProps      | `Popup` 组件的 `props`         | PopupProps                      | -      |

### DropdownOptionProps

| 属性  | 描述         | 类型             | 默认值 |
| ----- | ------------ | ---------------- | ------ |
| label | 定义选项标签 | React.ReactNode  | -      |
| value | 定义选项的值 | number \| string | -      |

## 主题定制

### CSS 变量

%{variables}
