# Skeleton 骨架屏

### 介绍

在内容加载过程中提供一组占位图形，通常图形会描述内容的概要排版。

### 引入

```ts
import { Skeleton } from 'sard'
```

## 代码演示

### 基础使用

默认展示三行占位元素。

@code('${DEMO_PATH}/skeleton/demo/Basic.tsx')

### 显示标题

设置 `title` 属性显示标题占位元素。

@code('${DEMO_PATH}/skeleton/demo/Title.tsx')

### 显示头像

设置 `avatar` 属性显示头像占位元素。

@code('${DEMO_PATH}/skeleton/demo/Avatar.tsx')

### 圆形头像

设置 `avatarRound` 属性显示头圆形像占位元素。

@code('${DEMO_PATH}/skeleton/demo/RoundAvatar.tsx')

### 圆角标题和段落

设置 `round` 属性显示圆角标题和段落。

@code('${DEMO_PATH}/skeleton/demo/RoundTitle.tsx')

### 动画效果

设置 `animated` 属性显示动画效果。

@code('${DEMO_PATH}/skeleton/demo/Animated.tsx')

### 包含子组件

将 `loading` 属性设置成 `false` 表示内容加载完成，此时会隐藏占位图。

@code('${DEMO_PATH}/skeleton/demo/Contain.tsx')

### 自定义

可以通过 `Skeleton.Avatar`、`Skeleton.Block`、`Skeleton.Title`、`Skeleton.Paragraph` 自由组合使用。

@code('${DEMO_PATH}/skeleton/demo/Custom.tsx')

## API

### SkeletonProps

| 属性        | 描述                                          | 类型             | 默认值 |
| ----------- | --------------------------------------------- | ---------------- | ------ |
| rows        | 段落行数                                      | number           | 3      |
| title       | 是否显示标题                                  | boolean          | false  |
| avatar      | 是否显示头像                                  | boolean          | false  |
| avatarSize  | 头像尺寸                                      | number \| string | -      |
| avatarRound | 是否显示圆形头像                              | boolean          | true   |
| round       | 是否将标题和段落显示为圆角风格                | boolean          | false  |
| loading     | 是否显示骨架屏，传 `false` 时会展示子组件内容 | boolean          | true   |
| animated    | 是否开启动画                                  | boolean          | false  |

### SkeletonBlockProps

| 属性     | 描述               | 类型    | 默认值 |
| -------- | ------------------ | ------- | ------ |
| animated | 是否开启动画       | boolean | false  |
| round    | 是否显示为圆角风格 | boolean | false  |

### SkeletonAvatarProps

继承 `SkeletonBlockProps` 并有以下额外属性：

| 属性 | 描述     | 类型             | 默认值 |
| ---- | -------- | ---------------- | ------ |
| size | 头像尺寸 | number \| string | -      |

### SkeletonTitleProps

继承 `SkeletonBlockProps` 并有以下额外属性：

| 属性  | 描述     | 类型             | 默认值 |
| ----- | -------- | ---------------- | ------ |
| width | 标题宽度 | number \| string | -      |

### SkeletonParagraphProps

继承 `SkeletonBlockProps` 并有以下额外属性：

| 属性 | 描述     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| rows | 段落行数 | number | 3      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
