# IndexBar 索引栏

### 介绍

用于列表分类展示和索引定位。

### 引入

```js
import { IndexBar } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
export default () => {
  const indexList = [
    {
      anchor: 'A',
      provinces: ['安徽省', '澳门特别行政区'],
    },
    {
      anchor: 'B',
      provinces: ['北京市'],
    },
    {
      anchor: 'C',
      provinces: ['重庆市'],
    },
    {
      anchor: 'F',
      provinces: ['福建省'],
    },
    {
      anchor: 'G',
      provinces: ['甘肃省', '广东省', '广西壮族自治区', '贵州省'],
    },
    {
      anchor: 'H',
      provinces: ['海南省', '河北省', '河南省', '黑龙江省', '湖北省', '湖南省'],
    },
    {
      anchor: 'J',
      provinces: ['吉林省', '江苏省', '江西省'],
    },
    {
      anchor: 'L',
      provinces: ['辽宁省'],
    },
    {
      anchor: 'N',
      provinces: ['内蒙古自治区', '宁夏回族自治区'],
    },
    {
      anchor: 'Q',
      provinces: ['青海省'],
    },
    {
      anchor: 'S',
      provinces: ['山东省', '山西省', '陕西省', '上海市', '四川省'],
    },
    {
      anchor: 'T',
      provinces: ['台湾省', '天津市'],
    },
    {
      anchor: 'X',
      provinces: ['西藏自治区', '香港特别行政区', '新疆维吾尔自治区'],
    },
    {
      anchor: 'Y',
      provinces: ['云南省'],
    },
    {
      anchor: 'Z',
      provinces: ['浙江省'],
    },
  ]

  const indexBarRef = useRef<IndexBarRef>(null)

  const handleChange = (activeKey) => {
    console.log('activeKey: ', activeKey)
  }

  return (
    <IndexBar offset={0} onChange={handleChange} ref={indexBarRef}>
      {indexList.map((item) => (
        <IndexBar.Item key={item.anchor} title={item.anchor}>
          <Cell.Group>
            {item.provinces.map((province) => (
              <Cell key={province} title={province}></Cell>
            ))}
          </Cell.Group>
        </IndexBar.Item>
      ))}
    </IndexBar>

    <Button onClick={() => indexBarRef.current?.scrollTo('G')}>
      scrollTo G
    </Button>
  )
}
```

## API

### IndexBarProps

| 属性             | 描述                             | 类型                            | 默认值 |
| ---------------- | -------------------------------- | ------------------------------- | ------ |
| defaultActiveKey | 初始化时当前索引项的 `key`       | number \| string                | -      |
| onChange         | 当前索引项变化时触发             | (key: number \| string) => void | -      |
| offset           | 索引项粘性定位时距离顶部的偏移量 | number                          | 0      |
| initialScroll    | 是否在初始化时定位当前索引项     | boolean                         | false  |
| anchorClass      | 索引项锚点元素的类名             | string                          | -      |
| anchorStyle      | 索引项锚点元素的样式             | React.CSSProperties             | -      |
| threshold        | 滚动监听节流阈值                 | number                          | 150    |

### IndexBarRef

| 属性     | 描述                      | 类型                            |
| -------- | ------------------------- | ------------------------------- |
| scrollTo | 定位到指定 `key` 的索引项 | (key: number \| string) => void |

### IndexBarItemProps

| 属性        | 描述                 | 类型                | 默认值 |
| ----------- | -------------------- | ------------------- | ------ |
| title       | 索引项的标题         | React.ReactNode     | -      |
| key         | 对应 `activeKey`     | number \| string    | -      |
| anchorClass | 索引项锚点元素的类名 | string              | -      |
| anchorStyle | 索引项锚点元素的样式 | React.CSSProperties | -      |

## 主题定制

### CSS 变量

%{variables}
