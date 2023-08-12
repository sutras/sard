# Dropdown 下拉菜单

### 介绍

可向下/向上弹出菜单列表，或自定义弹出的菜单内容。

### 引入

```js
import { Dropdown } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/dropdown/demo/Basic.tsx)

### 占位符

%(${DEMO_PATH}/dropdown/demo/Placeholder.tsx)

### 添加 label

%(${DEMO_PATH}/dropdown/demo/Label.tsx)

### 向上展开

%(${DEMO_PATH}/dropdown/demo/Direction.tsx)

### 禁用

%(${DEMO_PATH}/dropdown/demo/Disabled.tsx)

### 自定义箭头

%(${DEMO_PATH}/dropdown/demo/Arrow.tsx)

### 自定义内容

%(${DEMO_PATH}/dropdown/demo/Content.tsx)

## API

### DropdownProps

| 属性         | 描述                         | 类型                                                       | 默认值 |
| ------------ | ---------------------------- | ---------------------------------------------------------- | ------ |
| direction    | 菜单弹出方向                 | 'down' \| 'up'                                             | 'down' |
| disabled     | 是否禁用                     | boolean                                                    | false  |
| awayClosable | 是否在点击外部区域后自动隐藏 | boolean                                                    | true   |
| maskClosable | 是否在点击遮罩后自动隐藏     | boolean                                                    | true   |
| arrow        | 自定义箭头                   | (visible: boolean, direction: 'up' \| 'down') => ReactNode | -      |

### DropdownItemProps

| 属性            | 描述                           | 类型                            | 默认值 |
| --------------- | ------------------------------ | ------------------------------- | ------ |
| title           | 标题，用于自定义菜单项         | React.ReactNode                 | -      |
| label           | 标签说明                       | React.ReactNode                 | -      |
| separator       | 标签后面分隔符                 | React.ReactNode                 | -      |
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
| arrow           | 自定义箭头                     | (visible: boolean) => ReactNode | -      |
| onClick         | 点击菜单项时触发               | (event: ITouchEvent) => void    | -      |
| popupProps      | `Popup` 组件的 `props`         | PopupProps                      | -      |
| placeholder     | 占位符                         | React.ReactNode                 | -      |

### DropdownOptionProps

| 属性  | 描述         | 类型             | 默认值 |
| ----- | ------------ | ---------------- | ------ |
| label | 定义选项标签 | React.ReactNode  | -      |
| value | 定义选项的值 | number \| string | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
