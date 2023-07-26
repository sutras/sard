# Cascader 级联选择

### 介绍

用于在多层级数据中进行选择，常用于省市区、组织架构选择。

### 引入

```js
import { Cascader } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
const handleChange = (value, otpions) => {
  Toast.show(otpions.map((item) => item.name).join('/'))
  console.log(value, otpions)
}
```

```tsx
<Cascader
  options={area}
  value={440111}
  fieldNames={{ label: 'name', value: 'code' }}
  onChange={handleChange}
/>
```

### 配合弹出框使用

```tsx
<Popout title="请选择省市区">
  <Popout.Outlet>
    {({ value, triggerArgs: [, options = []], setVisible }) => (
      <Cell
        isLink
        title="请选择省市区"
        value={(value && options.map((option) => option.name).join('/')) || ''}
        onClick={() => setVisible(true)}
      />
    )}
  </Popout.Outlet>
  <Popout.Target>
    <Cascader
      options={area}
      fieldNames={{ label: 'name', value: 'code' }}
      onChange={(...args) => console.log('change', ...args)}
      onSelect={(...args) => console.log('select', ...args)}
    />
  </Popout.Target>
</Popout>
```

### 异步加载

通过监听 `onSelect` 事件，获取当前选中的选项，将异步获取的数据作为 `children` 属性值， 再把组件的 `options` 更新一下，使组件重新渲染。如果选项的 `children` 是需要用户点击时再通过接口获取的， 此选项的 `children` 需初始化为空数组。

```tsx
const [options, setOptions] = useState(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        label: 'label' + i,
        value: i,
        children: [],
      }
    }),
)

const handleSelect = (option, columnIndex) => {
  if (columnIndex < 2 && option.children.length === 0) {
    Toast.loading('加载中')

    setTimeout(() => {
      option.children = Array(10)
        .fill(0)
        .map((_, i) => {
          return {
            label: option.label + '-label' + i,
            value: option.value + '-' + i,
            children: columnIndex < 1 ? [] : null,
          }
        })

      setOptions(options.slice())
      Toast.hide()
    }, 500)
  }
}
```

```tsx
<Cascader options={options} onSelect={handleSelect} />
```

### 自定义选项上方内容

```tsx
<Cascader
  options={area}
  fieldNames={{ label: 'name', value: 'code' }}
  optionTop={(columnIndex) => (
    <View
      style={{
        padding: '8px var(--sar-cascader-option-padding-x)',
        backgroundColor: 'rgba(var(--sar-warning-rgb), 0.1)',
        color: 'var(--sar-warning-text)',
      }}
    >
      当前为第{columnIndex + 1}级
    </View>
  )}
/>
```

### 禁选选项

```tsx
const options = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      label: `label${i}`,
      value: `${i}`,
      disabled: i < 3,
      children: Array(10)
        .fill(0)
        .map((_, j) => {
          return {
            label: `label${i}-label${j}`,
            value: `${i}-${j}`,
            disabled: j < 3,
          }
        }),
    }
  })
```

```tsx
<Cascader
  options={options}
  onChange={(...args) => console.log('change', ...args)}
  onSelect={(...args) => console.log('select', ...args)}
/>
```

## API

### CascaderProps

| 属性         | 描述                                                    | 类型                                                           | 默认值            |
| ------------ | ------------------------------------------------------- | -------------------------------------------------------------- | ----------------- |
| value        | 指定选中项                                              | any[]                                                          | -                 |
| defaultValue | 默认的选中项                                            | any[]                                                          | -                 |
| options      | 可选项数据源                                            | CascaderOption[]                                               | []                |
| fieldNames   | 自定义 `options` 中 `label`, `value`, `children` 等字段 | CascaderFieldNames                                             | defaultFieldNames |
| placeholder  | 未选中时的提示文案                                      | React.ReactNode                                                | '请选择'          |
| onChange     | 选择完成后时触发                                        | (value: any[], selectedOptions: CascaderOption[]) => void      | -                 |
| onSelect     | 选择后时触发                                            | (option: CascaderOption, columnIndex: number) => void          | -                 |
| labelRender  | 自定义可选项渲染                                        | (option: CascaderOption, selected: boolean) => React.ReactNode | -                 |

### CascaderOption

```ts
export interface CascaderOption {
  label?: React.ReactNode
  value?: any
  disabled?: boolean
  children?: CascaderOption[]
}
```

### CascaderFieldNames

```ts
interface CascaderFieldNames {
  label?: string
  value?: string
  disabled?: string
  children?: string
}
```

### defaultFieldNames

```ts
const defaultFieldNames: CascaderFieldNames = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
}
```

## 主题定制

### CSS 变量

%{variables}
