# ShareSheet 分享面板

### 介绍

从底部向上弹出分享菜单。

### 引入

```js
import { ShareSheet } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/share-sheet/demo/Basic.tsx)

### 多行

%(${DEMO_PATH}/share-sheet/demo/MultipleRow.tsx)

### 描述

%(${DEMO_PATH}/share-sheet/demo/Description.tsx)

### 图片类型图标

%(${DEMO_PATH}/share-sheet/demo/Picture.tsx)

### 禁用

%(${DEMO_PATH}/share-sheet/demo/Disabled.tsx)

### 手动声明项目组件

%(${DEMO_PATH}/share-sheet/demo/Manual.tsx)

## API

### ShareSheetProps

| 属性           | 描述                                             | 类型                                                    | 默认值 |
| -------------- | ------------------------------------------------ | ------------------------------------------------------- | ------ |
| itemList       | 面板选项列表                                     | ShareSheetItemList                                      | []     |
| visible        | 面板是否可见                                     | boolean                                                 | false  |
| title          | 面板标题                                         | React.ReactNode                                         | -      |
| description    | 面板描述                                         | React.ReactNode                                         | -      |
| cancel         | 取消按钮内容                                     | React.ReactNode                                         | -      |
| maskClosable   | 点击遮罩后是否关闭                               | boolean                                                 | true   |
| actionClosable | 点击选项后是否关闭                               | boolean                                                 | false  |
| onSelect       | 点击选项时触发，禁用状态下不会触发               | (itemProps: ShareSheetItemProps, index: number) => void | -      |
| onCancel       | 点击取消按钮时触发                               | (visible: false) => void                                | -      |
| onClose        | 点击取消或遮罩或选项时触发，遮罩和选项需允许关闭 | (visible: false) => void                                | -      |

### ShareSheetItemProps

| 属性       | 描述       | 类型                         | 默认值 |
| ---------- | ---------- | ---------------------------- | ------ |
| className  | 类名       | string                       | -      |
| style      | 样式       | CSSProperties                | -      |
| name       | 名称       | React.ReactNode              | -      |
| label      | 标签       | React.ReactNode              | -      |
| color      | 字体颜色   | string                       | -      |
| background | 背景颜色   | string                       | -      |
| disabled   | 禁用状态   | boolean                      | false  |
| onClick    | 点击时调用 | (event: ITouchEvent) => void | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
