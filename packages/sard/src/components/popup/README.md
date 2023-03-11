# Popup 弹出层

### 介绍

所有可弹出组件的底层组件，可自定义弹出方向和内容。

### 引入

```js
import { Popup } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx"
  ]
</script>

## API

### PopupProps

| 属性        | 描述                                                                | 类型                                                                | 默认值        |
| ----------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------- |
| visible     | 是否可见                                                            | boolean                                                             | false         |
| zIndex      | 弹出层的层级                                                        | number                                                              | -             |
| lockScroll  | 是否锁定背景滚动                                                    | boolean                                                             | true          |
| duration    | 动画时长，单位 ms                                                   | number                                                              | 300           |
| placement   | 弹出位置；`center` 表示从中间缩放，`center-fade` 表示从中间淡入淡出 | 'top' \| 'right' \| 'bottom' \| 'left' \| 'center' \| 'center-fade' | 'center'      |
| mask        | 是否显示遮罩                                                        | boolean                                                             | -             |
| maskClass   | 遮罩类名                                                            | string                                                              | -             |
| maskStyle   | 遮罩样式                                                            | string                                                              | -             |
| container   | 弹出层被渲染到的目标节点                                            | Element                                                             | document.body |
| onMaskClick | 点击遮罩时触发                                                      | (event: React.MouseEvent) => void                                   | -             |
| onEnter     | 准备显示弹出层时触发                                                | () => void                                                          | -             |
| onEntering  | 开始显示弹出层时触发                                                | () => void                                                          | -             |
| onEntered   | 完全显示弹出层时触发                                                | () => void                                                          | -             |
| onExit      | 准备隐藏弹出层时触发                                                | () => void                                                          | -             |
| onExiting   | 开始隐藏弹出层时触发                                                | () => void                                                          | -             |
| onExited    | 完全隐藏弹出层时触发                                                | () => void                                                          | -             |

## 主题定制

### CSS 变量

%{variables}
