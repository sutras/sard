# Dropdown 下拉菜单

### 介绍

可向下/向上弹出菜单列表，或自定义弹出的菜单内容。

### 引入

```js
import { Dropdown } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Label.tsx",
    "./demo/Direction.tsx",
    "./demo/Disabled.tsx",
    "./demo/Icon.tsx",
    "./demo/Custom.tsx"
  ]
</script>

## API

### DropdownProps

| 属性         | 描述                         | 类型                            | 默认值 |
| ------------ | ---------------------------- | ------------------------------- | ------ |
| direction    | 菜单弹出方向                 | 'down' \| 'up'                  | 'down' |
| disabled     | 是否禁用                     | boolean                         | false  |
| awayClosable | 是否在点击外部区域后自动隐藏 | boolean                         | true   |
| maskClosable | 是否在点击遮罩后自动隐藏     | boolean                         | true   |
| icon         | 自定义图标                   | (visible: boolean) => ReactNode | -      |

### DropdownItemProps

| 属性            | 描述                           | 类型                              | 默认值 |
| --------------- | ------------------------------ | --------------------------------- | ------ |
| title           | 标题，用于自定义菜单项         | React.ReactNode                   | -      |
| label           | 标签说明                       | React.ReactNode                   | -      |
| options         | 菜单选项                       | DropdownOptionProps[]             | []     |
| direction       | 菜单弹出方向                   | 'down' \| 'up'                    | 'down' |
| disabled        | 是否禁用                       | boolean                           | false  |
| value           | 当前菜单项的值                 | any                               | -      |
| defaultValue    | 当前菜单项的默认值             | any                               | -      |
| onChange        | 菜单项值改变时触发             | (value: any) => void              | -      |
| visible         | 弹出框是否可见                 | boolean                           | -      |
| defaultVisible  | 弹出框是否默认可见             | boolean                           | -      |
| onVisible       | 弹出框显隐时触发               | (visible: boolean) => void        | -      |
| onVisibleChange | 弹出框开始显示或完全隐藏时触发 | (visible: boolean) => void        | -      |
| awayClosable    | 是否在点击外部区域后自动隐藏   | boolean                           | true   |
| maskClosable    | 是否在点击遮罩后自动隐藏       | boolean                           | true   |
| icon            | 自定义图标                     | (visible: boolean) => ReactNode   | -      |
| onClick         | 点击菜单项时触发               | (event: React.MouseEvent) => void | -      |
| popupProps      | `Popup` 组件的 `props`         | PopupProps                        | -      |

## 主题定制

### SCSS

```scss

```
