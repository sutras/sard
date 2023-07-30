# Picker 选择器

### 介绍

一个或多个可滚动列表选择器。

### 引入

```js
import { Picker } from 'sard-taro'
```

## 代码演示

### 普通选择器

```tsx
const array = ['北京市', '天津市', '河北省', '山东省']

const handleChange = (value, selectedOptions, selectedIndex) => {
  console.log(value, selectedOptions, selectedIndex)
  Toast.show(JSON.stringify(value))
}
```

```tsx
<Cell.Group card>
  <Cell
    linkable
    title="设置为: 天津市"
    onClick={() => setArrayValue(['天津市'])}
  />
  <Cell>
    <Picker
      value={arrayValue}
      columns={array}
      onChange={(value, ...restArgs) => {
        setArrayValue(value)
        handleChange(value, ...restArgs)
      }}
    />
  </Cell>
</Cell.Group>
```

### 对象类型数组

```tsx
const objectArray = [
  {
    code: 110000,
    name: '北京市',
  },
  {
    code: 120000,
    name: '天津市',
  },
  {
    code: 130000,
    name: '河北省',
  },
  {
    code: 140000,
    name: '山东省',
  },
]
```

```tsx
<Cell.Group card>
  <Cell
    linkable
    title="设置为: 天津市"
    onClick={() => setObjectArrayValue([120000])}
  />
  <Cell>
    <Picker
      value={objectArrayValue}
      columns={objectArray}
      optionKeys={{ label: 'name', value: 'code' }}
      onChange={(value, ...restArgs) => {
        setObjectArrayValue(value)
        handleChange(value, ...restArgs)
      }}
    />
  </Cell>
</Cell.Group>
```

### 多列

```tsx
const multiArray = [
  Array(10)
    .fill(0)
    .map((_, index) => 2000 + index + '年'),
  Array(12)
    .fill(0)
    .map((_, index) => 1 + index + '月'),
]
```

```tsx
<Cell.Group card>
  <Cell
    linkable
    title="设置为: 2003年10月"
    onClick={() => setMultiArrayValue(['2003年', '10月'])}
  />
  <Cell>
    <Picker
      value={multiArrayValue}
      columns={multiArray}
      onChange={(value, ...restArgs) => {
        setMultiArrayValue(value)
        handleChange(value, ...restArgs)
      }}
    />
  </Cell>
</Cell.Group>
```

### 对象类型多列

```tsx
const objectMultiArray = [
  Array(10)
    .fill(0)
    .map((_, index) => ({
      value: 2000 + index,
      label: 2000 + index + '年',
    })),
  Array(12)
    .fill(0)
    .map((_, index) => ({
      value: 1 + index,
      label: 1 + index + '月',
    })),
]
```

```tsx
<Cell.Group card>
  <Cell
    linkable
    title="设置为: 2003年10月"
    onClick={() => setObjectMultiArrayValue([2003, 10])}
  />
  <Cell>
    <Picker
      value={objectMultiArrayValue}
      columns={objectMultiArray}
      onChange={(value, ...restArgs) => {
        setObjectMultiArrayValue(value)
        handleChange(value, ...restArgs)
      }}
    />
  </Cell>
</Cell.Group>
```

### 级联选择

```tsx
import { getRegionData } from 'region-data'

const regionData = getRegionData()
```

```tsx
const [cascaderValue, setCascaderValue] = useState<number[]>()
```

```tsx
<Cell.Group card>
  <Cell
    linkable
    title="设置为: 广东省/广州市/天河区"
    onClick={() => setCascaderValue([440000, 440100, 440106])}
  />
  <Cell>
    <Picker
      value={cascaderValue}
      columns={regionData}
      optionKeys={{ label: 'name', value: 'code' }}
      onChange={(value, ...restArgs) => {
        setCascaderValue(value)
        handleChange(value, ...restArgs)
      }}
    />
  </Cell>
</Cell.Group>
```

### 配合弹出框

```tsx
<Cell.Group card>
  <Cell
    linkable
    title="广东省/广州市/天河区"
    onClick={() => setPopoutCascaderValue([440000, 440100, 440106])}
  />
  <Popout title="请选择省市区">
    <Popout.Outlet>
      {({ value, triggerArgs: [, options = []], setVisible }) => (
        <Cell
          linkable
          title="请选择省市区"
          value={
            (value && options.map((option) => option.name).join('/')) || ''
          }
          onClick={() => setVisible(true)}
        />
      )}
    </Popout.Outlet>
    <Popout.Target>
      <Picker
        value={popoutCascaderValue}
        columns={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
      />
    </Popout.Target>
  </Popout>
</Cell.Group>
```

## API

### PickerProps

| 属性         | 描述                          | 类型                                                                           | 默认值                                                   |
| ------------ | ----------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| columns      | 配置每一列的数据              | PickerOption[] \| PickerOption[][]                                             | []                                                       |
| optionKeys   | 自定义 `columns` 结构中的字段 | PickerOptionKeys                                                               | { label: 'label', value: 'value', children: 'children' } |
| value        | 选中项的值                    | any[]                                                                          | -                                                        |
| defaultValue | 默认选中项的值                | any[]                                                                          | -                                                        |
| onChange     | 选中项改变时触发              | (value: any[],selectedOptions: PickerOption[],selectedIndex: number[]) => void | -                                                        |

### PickerOption

```tsx
type PickerOption =
  | {
      label?: any
      value?: any
      children?: PickerOption[]
      [key: PropertyKey]: any
    }
  | number
  | string
```

### PickerOptionKeys

```tsx
interface PickerOptionKeys {
  label?: string
  value?: string
  children?: string
}
```

## 主题定制

### CSS 变量

%{variables}

## 原生 picker-view 缺点

- 隐藏状态下无法让其滚动到指定位置
- H5 和 RN 没有 immediateChange 属性
- 无法让其立即停止并滚动到指定位置
