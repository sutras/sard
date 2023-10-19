# Dropdown 下拉菜单

### 介绍

可向下/向上弹出菜单列表，或自定义弹出的菜单内容。

### 引入

```ts
import { Dropdown } from 'sard'
```

## 代码演示

### 基础使用

使用 `options` 配置下拉菜单项。

@code('${DEMO_PATH}/dropdown/demo/Basic.tsx')

### 占位符

占位符会在未选中值时显示说明文字。

@code('${DEMO_PATH}/dropdown/demo/Placeholder.tsx')

### 添加 label

相较于占位符， `label` 会一直显示。

@code('${DEMO_PATH}/dropdown/demo/Label.tsx')

### 向上展开

底部空间不足时可以配置向上弹出菜单。

@code('${DEMO_PATH}/dropdown/demo/Direction.tsx')

### 禁用

禁用的菜单项不可点击。

@code('${DEMO_PATH}/dropdown/demo/Disabled.tsx')

### 自定义箭头

配置 `arrow` 属性可以自定义箭头。

@code('${DEMO_PATH}/dropdown/demo/Arrow.tsx')

### 自定义内容

除了显示菜单项，下拉菜单还可以显示任意内容。

@code('${DEMO_PATH}/dropdown/demo/Content.tsx')

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
| separator       | 标签后面分隔符                 | React.ReactNode                 | -      |
| placeholder     | 占位符                         | React.ReactNode                 | -      |

### DropdownOptionProps

| 属性  | 描述         | 类型             | 默认值 |
| ----- | ------------ | ---------------- | ------ |
| label | 定义选项标签 | React.ReactNode  | -      |
| value | 定义选项的值 | number \| string | -      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
