# NumberKeyboard 数字键盘

### 介绍

虚拟数字键盘，用于输入支付密码等场景。

### 引入

```js
import { NumberKeyboard } from 'sard-taro'
```

## 代码演示

### 基础使用

默认键盘

```tsx
const [visible, setVisible] = useState(true)
```

```tsx
<NumberKeyboard
  onInput={Toast.show}
  onDelete={() => Toast.show('Delete')}
  visible={visible}
  onVisible={setVisible}
/>
```

小数点键盘

```tsx
<NumberKeyboard extraKey="." />
```

身份证键盘

```tsx
<NumberKeyboard extraKey="X" />
```

随机数字键盘

```tsx
<NumberKeyboard random />
```

双向绑定

```tsx
const [visible, setVisible] = useState(false)
const [value, setValue] = useState('')
```

```tsx
<Cell
  linkable
  title="双向绑定"
  value={value}
  onClick={() => setVisible(true)}
/>

<NumberKeyboard
  onInput={(key) => setValue((value) => value + key)}
  onDelete={() => setValue((value) => value.slice(0, -1))}
  visible={visible}
  onVisible={setVisible}
/>
```

## API

### NumberKeyboardProps

| 属性           | 描述                         | 类型                       | 默认值 |
| -------------- | ---------------------------- | -------------------------- | ------ |
| visible        | 键盘是否显示                 | boolean                    | false  |
| defaultVisible | 键盘默认是否显示             | boolean                    | false  |
| onVisible      | 键盘显隐时触发               | (visible: boolean) => void | false  |
| onInput        | 可输入按键点击时触发         | (key: string) => void      | -      |
| onDelete       | 点击删除按钮时触发           | () => void                 | -      |
| extraKey       | 自定义额外键的值             | string                     | -      |
| random         | 是否打乱按键                 | boolean                    | false  |
| every          | 是否每次显示键盘时都打乱按键 | boolean                    | false  |

## 主题定制

### CSS 变量

%{variables}
