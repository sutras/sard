# NumberKeyboard 数字键盘

### 介绍

虚拟数字键盘，用于输入支付密码等场景。

### 引入

```js
import { NumberKeyboard } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Point.tsx",
    "./demo/Card.tsx",
    "./demo/Title.tsx",
    "./demo/Random.tsx",
    "./demo/TwoWay.tsx",
    "./demo/Simple.tsx"
  ]
</script>

## API

### NumberKeyboardProps

| 属性           | 描述                                                      | 类型                       | 默认值                  |
| -------------- | --------------------------------------------------------- | -------------------------- | ----------------------- |
| value          | 键盘输入值                                                | string                     | -                       |
| defaultValue   | 键盘默认输入值                                            | string                     | -                       |
| title          | 键盘标题                                                  | React.ReactNode            | -                       |
| cancelText     | 取消按钮内容                                              | React.ReactNode            | '取消'                  |
| cancelProps    | 取消按钮 props                                            | ButtonProps                | -                       |
| confirmText    | 确定按钮内容                                              | React.ReactNode            | '完成'                  |
| confirmProps   | 确定按钮 props                                            | ButtonProps                | -                       |
| onKeyClick     | 按键点击时触发                                            | (key: string) => void      | -                       |
| onChange       | 键盘输入值改变时触发                                      | (value: string) => void    | -                       |
| onDelete       | 点击删除按钮时触发                                        | () => void                 | -                       |
| visible        | 键盘是否显示                                              | boolean                    | false                   |
| defaultVisible | 键盘默认是否显示                                          | boolean                    | false                   |
| onVisible      | 键盘显隐时触发                                            | (visible: boolean) => void | false                   |
| onClose        | 键盘隐藏时触发                                            | (visible: false) => void   | false                   |
| onCancel       | 点击取消按钮时触发                                        | (visible: false) => void   | false                   |
| onConfirm      | 点击确定按钮时触发                                        | (visible: false) => void   | false                   |
| extraKey       | 自定义额外键的值                                          | string                     | -                       |
| random         | 是否打乱按键                                              | boolean                    | false                   |
| maxLength      | 最大输入长度                                              | number                     | Number.MAX_SAFE_INTEGER |
| popupProps     | `Popup` 组件的 `props`                                    | PopupProps                 | -                       |
| hideType       | 文档接受的事件类型以隐藏键盘                              | string                     | 'click'                 |
| triggerProp    | 包含的唯一子元素的 props 回调函数名，调用此函数会显示键盘 | string                     | 'onClick'               |
| focusedProp    | 包含的唯一子元素在键盘显示时添加的 props                  | string                     | -                       |

## 主题定制

### CSS 变量

%{variables}
