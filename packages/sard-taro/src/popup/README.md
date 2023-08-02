# Popup 弹出层

### 介绍

所有可弹出组件的底层组件，可自定义弹出方向和内容。

### 引入

```js
import { Popup } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
export default () => {
  const [visible, setVisible] = useState(false)
  const [effect, setEffect] = useState<PopupProps['effect']>('zoom')

  const show = (effect: PopupProps['effect']) => {
    setVisible(true)
    setEffect(effect)
  }

  const handleMaskClick = () => {
    setVisible(false)
  }

  return (
    <Cell.Group card>
      <Cell linkable title="顶部划出" onClick={() => show('slide-top')} />
      <Cell linkable title="右边划出" onClick={() => show('slide-right')} />
      <Cell linkable title="底部划出" onClick={() => show('slide-bottom')} />
      <Cell linkable title="左边划出" onClick={() => show('slide-left')} />
      <Cell linkable title="缩放" onClick={() => show('zoom')} />
      <Cell linkable title="淡入淡出" onClick={() => show('fade')} />
    </Cell.Group>

    <Popup
      visible={visible}
      effect={effect}
      onMaskClick={handleMaskClick}
    >
      Popup
    </Popup>
  )
}
```

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

%{variables}
