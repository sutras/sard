# ShareSheet 分享面板

### 介绍

从底部向上弹出分享菜单。

### 引入

```ts
import { ShareSheet } from 'sard'
```

## 代码演示

### 基础使用

使用 `itemList` 属性配置分享选项。

@code('${DEMO_PATH}/share-sheet/demo/Basic.tsx')

### 多行

`itemList` 属性值可以是二维数组以便渲染多行。

@code('${DEMO_PATH}/share-sheet/demo/MultipleRow.tsx')

### 标题和描述

使用 `title` 和 `description` 配置标题和描述。

@code('${DEMO_PATH}/share-sheet/demo/TitleDescription.tsx')

### 图片类型图标

`icon` 属性可以是图片路径。

@code('${DEMO_PATH}/share-sheet/demo/Picture.tsx')

### 禁用

禁用的选项不可点击。

@code('${DEMO_PATH}/share-sheet/demo/Disabled.tsx')

### 手动声明项目组件

除了使用 `itemList` 属性，还可以使用 `ShareSheet.Row` 和 `ShareSheet.Item` 组件显式声明组件。

@code('${DEMO_PATH}/share-sheet/demo/Manual.tsx')

## API

### ShareSheetProps

`ShareSheetProps` 继承 `PopupProps` 并拥有以下属性：

| 属性           | 描述                               | 类型                                                     | 默认值 |
| -------------- | ---------------------------------- | -------------------------------------------------------- | ------ |
| itemList       | 面板选项列表                       | ShareSheetItemProps[] \| ShareSheetItemProps[][]         | []     |
| title          | 面板标题                           | React.ReactNode                                          | -      |
| description    | 面板描述                           | React.ReactNode                                          | -      |
| cancel         | 取消按钮内容                       | React.ReactNode                                          | -      |
| onSelect       | 点击选项时触发，禁用状态下不会触发 | (itemProps: ShareSheetItemProps) => void \| Promise<any> | -      |
| onCancel       | 点击取消按钮时触发                 | () => void \| Promise<any>                               | -      |
| onClose        | 点击遮罩时触发                     | () => void \| Promise<any>                               | -      |
| maskClosable   | 点击遮罩后是否关闭                 | boolean                                                  | true   |
| visible        | 面板是否可见                       | boolean                                                  | -      |
| defaultVisible | 面板是否默认可见                   | boolean                                                  | -      |
| onVisible      | 面板显隐时触发                     | (visible: boolean) => void                               | -      |

### ShareSheetRowProps

| 属性     | 描述         | 类型                  | 默认值 |
| -------- | ------------ | --------------------- | ------ |
| itemList | 面板选项列表 | ShareSheetItemProps[] | []     |

### ShareSheetItemProps

| 属性       | 描述                                                   | 类型                         | 默认值 |
| ---------- | ------------------------------------------------------ | ---------------------------- | ------ |
| name       | 名称                                                   | React.ReactNode              | -      |
| label      | 标签                                                   | React.ReactNode              | -      |
| color      | 字体颜色                                               | string                       | -      |
| background | 背景颜色                                               | string                       | -      |
| icon       | 自定义图标，可以时图片路径，或者 `Icon` 组件的 `props` | IconProps \| string          | -      |
| disabled   | 禁用状态                                               | boolean                      | false  |
| onClick    | 点击时调用                                             | (event: ITouchEvent) => void | -      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
