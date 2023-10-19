# Style 样式

### 介绍

`sard` 为了避免视觉传达差异，各组件用到的一些公用的颜色值、字号、圆角等统一在 Style 组件进行定义，并将变量值添加到根元素以便引用和自定义样式覆盖。

可以通过 `CSS` 变量 来组织样式，通过覆盖这些 `CSS` 变量，可以实现定制主题、动态切换主题等效果。

## 修改默认变量

### 修改 SCSS 变量

在导入`sard`组件样式文件之前定义全局 `SCSS` 变量。

```scss
$sar-primary: blue;
@import 'sard/dist/index.scss';
```

滚到当前页面底部查看完整的`scss`变量。

## 暗黑模式

### 使用

@warning
目前只有 H5 和小程序支持暗黑模式，`react-native` 的暗黑模式还在调研中。
@endwarning

暗黑模式通过 `CSS` 的 `prefers-color-scheme` 媒体查询实现，并通过 `$sar-darkmode` 变量控制开关。
默认不开启暗黑模式，可以在导入 `Sard` 样式文件之前设置 `$sar-darkmode: true;` 来开启暗黑模式，
此时组件的样式会随着浏览器或系统的外观模式进行切换。

```scss
$sar-darkmode: true;
@import 'sard/dist/index.scss';
```

## 主题定制

### SCSS 变量

@code('./variables.scss')
