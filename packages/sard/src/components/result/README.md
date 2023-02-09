# Result 结果

### 介绍

用于反馈用户的操作结果。

### 引入

```js
import { Result } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Extra.tsx",
    "./demo/Icon.tsx"
  ]
</script>

## API

### ResultProps

| 名称        | 描述         | 类型                                                      | 默认值 |
| ----------- | ------------ | --------------------------------------------------------- | ------ |
| status      | 结果的状态   | 'success' \| 'info' \| 'warning' \| 'error' \| 'question' | 'info' |
| icon        | 自定义图标   | React.ReactNode                                           | -      |
| title       | 标题         | React.ReactNode                                           | -      |
| description | 描述         | React.ReactNode                                           | -      |
| children    | 定义额外内容 | React.ReactNode                                           | -      |

## 主题定制

### SCSS

```scss

```
