# Result 结果

### 介绍

用于反馈用户的操作结果。

### 引入

```js
import { Result } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Result
  status="success"
  title="成功"
  description="请根据提示进行操作"
/>
<Result status="info" title="信息" description="请根据提示进行操作" />
<Result
  status="warning"
  title="警告"
  description="请根据提示进行操作"
/>
<Result status="error" title="错误" description="请根据提示进行操作" />
<Result
  status="question"
  title="疑惑"
  description="请根据提示进行操作"
/>
```

### 额外内容

```tsx
<Result status="success" title="成功" description="请根据提示进行操作">
  <Button>返回首页</Button>
</Result>
```

### 自定义图标

```tsx
<Result
  icon={
    <Icon
      prefix="demo-icon"
      name="emoji-smile"
      color="var(--sar-tertiary-color)"
    ></Icon>
  }
  title="笑一笑"
  description="请根据提示进行操作"
></Result>
```

## API

### ResultProps

| 属性        | 描述         | 类型                                                      | 默认值 |
| ----------- | ------------ | --------------------------------------------------------- | ------ |
| status      | 结果的状态   | 'success' \| 'info' \| 'warning' \| 'error' \| 'question' | 'info' |
| icon        | 自定义图标   | React.ReactNode                                           | -      |
| title       | 标题         | React.ReactNode                                           | -      |
| description | 描述         | React.ReactNode                                           | -      |
| children    | 定义额外内容 | React.ReactNode                                           | -      |

## 主题定制

### CSS 变量

%{variables}
