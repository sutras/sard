# Style 样式

### 介绍

`sard-taro` 为了避免视觉传达差异，各组件用到的一些公用的颜色值、字号、圆角等统一在 Style 组件进行定义，并将变量值添加到根元素以便引用和自定义样式覆盖。

可以通过 `CSS` 变量 来组织样式，通过覆盖这些 `CSS` 变量，可以实现定制主题、动态切换主题等效果。

## 修改默认变量

### 修改 CSS 变量

在导入`sard-taro`组件样式之后，在其后定义全局 `CSS` 变量进行覆盖。

在 `:root, page` 选择器上的声明可以兼容小程序和 H5。

```scss
@use 'sard-taro/dist/index.css';

:root,
page {
  --sar-primary: #6f42c1;
}
```

### 修改 SCSS 变量

组件绝大多数情况下都使用 CSS 变量定义样式，通常情况下只需要覆盖 CSS 变量。如果需要定义`BEM`格式或其他情况下，可以通过以下情况覆盖 SCSS 变量。

```scss
@use 'sard-taro/dist/style/variables' with (
  $sar-namespace: 'custom',
  $sar-modifier-separator: '--'
);

@use 'sard-taro/dist/index.scss';
```

完整的`scss`变量可以滚到页面底部查看。

## 代码演示

### 主题色

%(${DEMO_PATH}/style/demo/Theme.tsx)

### 灰度值

%(${DEMO_PATH}/style/demo/Gray.tsx)

### 圆角

%(${DEMO_PATH}/style/demo/Rounded.tsx)

### 字号

%(${DEMO_PATH}/style/demo/FontSize.tsx)

### 行高

%(${DEMO_PATH}/style/demo/Leading.tsx)

### 阴影

%(${DEMO_PATH}/style/demo/Shadow.tsx)

### 遮罩

%(${DEMO_PATH}/style/demo/Mask.tsx)

## 主题定制

### SCSS 变量

%(./variables.scss)

### CSS 变量

%(./index.scss#variables)
