# Input 输入框

### 介绍

接收用户输入的文本信息。

### 引入

```js
import { Input } from 'sard-taro'
```

## 代码演示

### 非受控组件

```tsx
<Input placeholder="请输入" defaultValue="基础使用" />
```

### 受控组件

```tsx
export default () => {
  const [value, setValue] = useState('受控组件')

  return (
    <Input placeholder="请输入" value={value} onChange={setValue} />
    <View>{value}</View>
  )
}
```

### 自定义样式

```tsx
<Input
  placeholder="请输入"
  style={{
    color: 'orange',
    borderColor: 'orange',
    textAlign: 'center',
    borderRadius: '9999px',
    background: 'rgba(0,0,0,.05)',
  }}
/>
```

### 类型

```tsx
<Input placeholder="文本" type="text" />
<Input placeholder="数字" type="number" />
<Input placeholder="身份证" type="idcard" />
<Input placeholder="带小数点数字" type="digit" />
<Input placeholder="密码" type="password" />
<Input placeholder="文本域" type="textarea" style={{ height: 100 }} />

```

### 可清除的

```tsx
<Input defaultValue="可清除的" placeholder="可清除的" clearable />
```

### 聚焦时显示清除按钮

```tsx
<Input
  defaultValue="可清除的"
  placeholder="可清除的"
  clearable
  showClearOnlyFocus
/>
```

### 禁用

```tsx
<Input placeholder="禁用的" disabled />
```

### 只读

```tsx
<Input placeholder="只读的" readOnly />
```

### 插槽

```tsx
<Input
  placeholder="请输入"
  prepend={<Icon name="search" color="var(--sar-tertiary-color)" />}
/>
<Input
  placeholder="请输入"
  append={
    <Button size="small" onClick={(event) => event.stopPropagation()}>
      发送验证码
    </Button>
  }
  style={{ marginTop: 10 }}
  clearable
/>
```

### 去除边框

```tsx
<Input borderless placeholder="去除边框" />
```

### 嵌入的

`inlaid` 用于清除边框和内边距，以便可以嵌入到其他组件内

```tsx
<Cell.Group card bodyStyle={{ maxWidth: 80 }}>
  <Cell title="用户名" footer={<Input inlaid placeholder="嵌入的" />}></Cell>
  <Cell
    title="密码"
    footer={<Input inlaid type="password" placeholder="嵌入的" />}
  ></Cell>
</Cell.Group>
```

### 自动高度

```tsx
<Input type="textarea" autoHeight placeholder="autoHeight" />
<Input
  type="textarea"
  autoHeight
  style={{ maxHeight: 100 }}
  placeholder="{ maxHeight: 100 }"
/>
<Input
  type="textarea"
  autoHeight
  style={{ minHeight: 100, maxHeight: 200 }}
  placeholder="{ minHeight: 100, maxHeight: 200 }"
/>
```

### 字数提示

```tsx
<Input showCount maxLength={20} clearable />
<Input
  type="textarea"
  showCount
  maxLength={100}
  style={{ height: 80 }}
  clearable
/>
```

## API

### InputProps

| 属性         | 描述                                               | 类型                                                                                        | 默认值 |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------ |
| value        | 输入框内容                                         | string                                                                                      | -      |
| defaultValue | 输入框默认内容                                     | string                                                                                      | -      |
| onChange     | 输入框值变化时触发                                 | (value: string) => void                                                                     | -      |
| placeholder  | 输入框占位符内容                                   | string                                                                                      | -      |
| type         | 输入框类型                                         | 'text' \| 'password' \| 'textarea' \| 'number' \| 'tel' \| 'url' \| 'search'                | 'text' |
| prepend      | 输入框前面插槽                                     | React.ReactNode                                                                             | -      |
| append       | 输入框后面插槽                                     | React.ReactNode                                                                             | -      |
| autoFocus    | 自动获取焦点                                       | boolean                                                                                     | false  |
| autoHeight   | 文本域自动高度                                     | boolean \| { minHeight: number; maxHeight: number } \| { minRows: number; maxRows: number } | false  |
| disabled     | 禁用状态                                           | boolean                                                                                     | false  |
| readOnly     | 只读状态                                           | boolean                                                                                     | false  |
| borderless   | 是否显示边框                                       | boolean                                                                                     | false  |
| inlaid       | 嵌入式状态                                         | boolean                                                                                     | false  |
| maxLength    | 最大输入长度，设置为 -1 的时候不限制最大长度       | number                                                                                      | 140    |
| showCount    | 是否展示字数                                       | boolean                                                                                     | false  |
| onFocus      | 输入框获取焦点时触发                               | (event: React.FocusEvent) => void                                                           | -      |
| onBlur       | 输入框失去焦点时触发                               | (event: React.FocusEvent) => void                                                           | -      |
| onClick      | 点击输入框时触发                                   | (event: ITouchEvent) => void                                                                | -      |
| clear        | 自定义清空按钮                                     | React.ReactNode                                                                             | -      |
| clearable    | 是否显示清空按钮                                   | boolean                                                                                     | false  |
| onClear      | 点击清空按钮时触发                                 | (value: '') => void                                                                         | -      |
| focused      | 是否获取焦点，用于结合自定义键盘使用时显示高亮效果 | boolean                                                                                     | false  |

## 主题定制

### CSS 变量

%{variables}
