# Popup 弹出层

### 介绍

所有可弹出组件的底层组件，可自定义弹出方向和内容。

### 引入

```js
import { Popup } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/popup/demo/Basic.tsx)

## API

### PopupProps

| 属性        | 描述                 | 类型                                                                               | 默认值 |
| ----------- | -------------------- | ---------------------------------------------------------------------------------- | ------ |
| visible     | 是否可见             | boolean                                                                            | false  |
| timeout     | 动画时长，单位 ms    | number                                                                             | 300    |
| effect      | 显隐效果             | 'slide-top' \| 'slide-right' \| 'slide-bottom' \| 'slide-left' \| 'zoom' \| 'fade' | -      |
| zIndex      | 弹出层的层级         | number                                                                             | -      |
| mask        | 是否显示遮罩         | boolean                                                                            | true   |
| transparent | 透明遮罩             | boolean                                                                            | false  |
| maskClass   | 遮罩类名             | string                                                                             | -      |
| maskStyle   | 遮罩样式             | string                                                                             | -      |
| onMaskClick | 点击遮罩时触发       | (event: ITouchEvent) => void                                                       | -      |
| onEnter     | 准备显示弹出层时触发 | () => void                                                                         | -      |
| onEntering  | 开始显示弹出层时触发 | () => void                                                                         | -      |
| onEntered   | 完全显示弹出层时触发 | () => void                                                                         | -      |
| onExit      | 准备隐藏弹出层时触发 | () => void                                                                         | -      |
| onExiting   | 开始隐藏弹出层时触发 | () => void                                                                         | -      |
| onExited    | 完全隐藏弹出层时触发 | () => void                                                                         | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
