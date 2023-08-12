# ActionSheet 动作面板

### 介绍

从底部向上弹出操作菜单。

### 引入

```js
import { ActionSheet } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/action-sheet/demo/Basic.tsx)

### 手动声明项目组件

%(${DEMO_PATH}/action-sheet/demo/Manual.tsx)

### 取消按钮

%(${DEMO_PATH}/action-sheet/demo/Cancel.tsx)

### 状态

%(${DEMO_PATH}/action-sheet/demo/Status.tsx)

### 标题&描述

%(${DEMO_PATH}/action-sheet/demo/TitleDesc.tsx)

## API

### ActionSheetProps

| 属性           | 描述                                             | 类型                                                     | 默认值 |
| -------------- | ------------------------------------------------ | -------------------------------------------------------- | ------ |
| visible        | 是否显示动作面板                                 | boolean                                                  | false  |
| itemList       | 面板选项列表                                     | ActionSheetItemProps[]                                   | []     |
| maskClosable   | 点击遮罩后是否关闭                               | boolean                                                  | true   |
| actionClosable | 点击选项后是否关闭                               | boolean                                                  | false  |
| title          | 动作面板标题                                     | React.ReactNode                                          | -      |
| description    | 动作面板描述信息                                 | React.ReactNode                                          | -      |
| cancel         | 取消按钮文字                                     | React.ReactNode                                          | -      |
| onSelect       | 点击选项时触发，禁用或加载状态下不会触发         | (itemProps: ActionSheetItemProps, index: number) => void | -      |
| onCancel       | 点击取消按钮时触发                               | (visible: false) => void                                 | -      |
| onClose        | 点击取消或遮罩或选项时触发，遮罩和选项需允许关闭 | (visible: false) => void                                 | -      |

### ActionSheetItemProps

| 属性      | 描述       | 类型                         | 默认值 |
| --------- | ---------- | ---------------------------- | ------ |
| className | 类名       | string                       | -      |
| style     | 样式       | CSSProperties                | -      |
| title     | 标题       | React.ReactNode              | -      |
| label     | 标签       | React.ReactNode              | -      |
| color     | 字体颜色   | string                       | -      |
| disabled  | 禁用状态   | boolean                      | false  |
| onClick   | 点击时调用 | (event: ITouchEvent) => void | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
