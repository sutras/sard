---
title: TextShrink
subtitle: 文本缩放
group: 数据展示
---

## 介绍

在有限的宽度和行数内完整显示一段文本：优先使用基准字号，放不下时自动缩小字号，缩到下限仍然放不下才截断加省略号。

适合卡片标题、列表主标题、数据看板、标签等「容器尺寸固定、文案长度不可控」的场景。

## 代码演示

### 基础用法

优惠券标题由运营配置，长度不可控，卡片宽度却是固定的。普通文本超出后只能省略，`TextShrink` 可以在同一块宽度里把字号调小，把完整标题留下来。

放得下时组件不做任何缩放，与普通文本的表现完全一致，只在放不下时才动字号。默认以根元素的 computed `font-size` 作为基准字号，例中优惠券卡片是 `17px`，字号上界就是 `17px`。

<<< @demo/text-shrink/demo/Basic.vue

### 多行缩放

`max-lines` 控制允许渲染的最大行数。公告栏的文案长度由运营决定，容器高度必须稳定，所以只能限定行数，让字号去让步。

同样的宽度下，给 2 行和给 3 行能用的字号不一样：行数越紧，缩得越多。

<<< @demo/text-shrink/demo/MaxLines.vue

### 指定基准字号

当一个容器里同时有大字和小字时，容器的 `font-size` 往往是为大字设的。会员卡的称号是 `26px`，副标题若继承同一个值会被撑成一样的尺寸，层级就没了。

传 `base-font-size` 可以显式指定字号上界，此时不再读取根元素的 computed `font-size`。

<<< @demo/text-shrink/demo/BaseFontSize.vue

### 容器宽度变化

商品宫格在 2 列和 3 列之间切换时，卡片宽度会骤减。组件通过 `ResizeObserver` 监听根元素尺寸，宽度变化时以固化的基准字号重新搜索，而不是在上次缩小的结果上继续缩。

<<< @demo/text-shrink/demo/Resize.vue

### 文案动态变化

同一个按钮在不同语言下的文案长度可能相差近两倍，而按钮尺寸是设计稿写死的，既不能撑大也不能换行。

`text` 变化会触发重算，右侧按钮会重新适配；左侧普通文本只能省略。

<<< @demo/text-shrink/demo/Dynamic.vue

### 缩放下限与截断

字号缩到下限（默认 `1px`）仍放不下时停在下限：单行用 `text-overflow: ellipsis`，多行用 `line-clamp` 截断，两者都不会撑破容器。

中文在 `1px` 时每个字只占 `1px`，只有当字数超过容器像素宽度才会真正截断。这一档的意义是「不撑破布局」，不是「文字还能看」——如果经常走到这里，说明容器给得太小，应该改布局而不是依赖组件。

<<< @demo/text-shrink/demo/Overflow.vue

### 设置最小可读字号

`min-font-size` 用来划定「缩到多小就不值得再缩」的界限。订单列表的商品名列宽固定、名称长度不可控，同一个组件在两种设置下的差别一目了然：默认会一路缩到塞得下，长名称最后只剩一条几乎看不清的细线；设成 `10` 之后，缩到 `10px` 就停手，改用省略号。

`min-font-size` 处放不下时，组件停留在该字号并截断，**不会**继续往更小的字号缩。因此渲染字号恒大于等于 `min-font-size`（除非 `base-font-size` 本身更小）。

<<< @demo/text-shrink/demo/MinFontSize.vue

## API

### TextShrinkProps

| 属性         | 描述                                                                   | 类型   | 默认值 |
| ------------ | ---------------------------------------------------------------------- | ------ | ------ |
| text         | 要渲染的纯文本，不解析 HTML                                            | string | `''`   |
| maxLines     | 允许渲染的最大行数，值为 `1` 时等价于单行不换行                        | number | `1`    |
| baseFontSize | 字号上界（px）。不传时在首次适配时读取根元素 computed font-size 并固化 | number | -      |
| minFontSize  | 缩放下限（px）。需要等于或小于该字号才放得下时，停在该字号并显示省略号 | number | `1`    |

### TextShrinkExpose

| 属性     | 描述                                     | 类型                       |
| -------- | ---------------------------------------- | -------------------------- |
| fontSize | 当前生效的字号（px），首次适配完成前为空 | `Ref<number \| undefined>` |
| overflow | 是否停在缩放下限仍放不下（已按行数截断） | `Ref<boolean>`             |
| refit    | 手动触发一次重新适配（在下一帧执行）     | `() => void`               |

## 行为说明

### 基准字号固化

`baseFontSize` 未传时，组件在**首次适配**时读取根元素的 computed `font-size`，存入内部变量后固化。

之后所有重算（文本变化、行数变化、容器尺寸变化）都以这个固化值为上界，**不会再次读取 computed font-size**。否则缩小后的字号会被当成新的基准，字号会随着每次重算越缩越小。

首次读到的值不可信（`0`、`NaN`）时回退到 `16`。

### 搜索策略

1. 先测基准字号，放得下就直接使用（绝大多数情况走这条路径，只有一次测量）。
2. 放不下时，在 `(minFontSize, baseFontSize]` 区间搜索「能完整显示的最大字号」，收敛精度 `0.05px`：
   - **单行**：文本宽度随字号近似成正比，先用「可用宽度 / 实测宽度」外推两次把区间夹紧，再二分收尾；
   - **多行**：行数是整数阶梯，没有可用斜率，直接二分。
     外推只决定「下一个试探点」，放不放得下始终由真实测量决定，所以精度不受影响。
3. 结果精度为 `0.1px`：先向下取整，再逐档向上验证，既不会溢出，也不会丢掉 0.1px。
4. 下限处就放不下时，不再继续缩小，直接把字号停在下限并标记溢出，由可见层截断。

判定「放得下」时不允许任何溢出（容差只有 `0.05px`）。单行只要超出可用宽度哪怕半个像素，`text-overflow` 就会把末尾一整个字换成省略号，视觉上等于「根本没放下」。

所有测量都在**隐藏测量层**中完成（`position: absolute` + `visibility: hidden`），它脱离文档流，不会引起可见布局抖动；可见文本层只在最终结果确定后应用一次字号。

测量本身只有一个隐藏节点，用 `Range` 读它的内容几何——单行读 `getBoundingClientRect().width`，多行读 `getClientRects().length`（每行对应一个 rect）。每轮只读一次几何，可用宽度整个搜索过程只读一次。

### 单行与多行

- `maxLines === 1`：测量与渲染都抑制换行（`white-space: nowrap`），按不换行计算文本宽度。
- `maxLines > 1`：允许换行，直接数文本的行盒（`Range.getClientRects()`）判断是否超过 `maxLines`，不依赖 `line-height`（`line-height: normal` 在部分浏览器里拿不到 px 值）。

### 溢出兜底

停在下限后仍超出 `maxLines` 时：

- 单行：`overflow: hidden` + `text-overflow: ellipsis`；
- 多行：`display: -webkit-box` + `-webkit-line-clamp: maxLines`，同时带上省略号。

默认下限是 `1px`，也就是浏览器的可渲染下限。实际项目里建议用 `min-font-size` 把它抬到一个仍有可读性的值（例如 `10`～`12`），否则长文案会被缩成一条看不清的细线。

### 文本层样式

测量层是可见文本层的**子节点**，宽度取文本层的 padding box，因此 `font-family`、`font-weight`、`letter-spacing`、`word-spacing`、`text-transform`、`white-space`、`word-break`、`overflow-wrap` 等所有可继承的排版属性都由继承自动对齐——不需要组件做任何同步，也不会出现「搬运清单漏了一项，测量按旧样式算、渲染按新样式排」的偏差。

所以直接给 `.s-text-shrink__text` 覆写字距或断词规则是安全的：

```css
.my-title .s-text-shrink__text {
  letter-spacing: 0.5px;
  word-break: break-all;
}
```

`font-size` 是唯一的例外：可见层字号完全由组件控制。需要指定字号上界请用 `base-font-size`，不要直接给文本层写 `font-size`，否则会被首次适配覆盖。

由于测量节点在文本层内部，`.s-text-shrink__text` 的 `textContent` 会出现两份文本（一份可见、一份 `aria-hidden` 的测量副本）。读取文案请用 `text` 属性，不要读 DOM 文本。

### 容器宽度

组件依赖根元素有**确定的可用宽度**。

- 根元素默认 `display: block`，作为块级元素会自然撑满父容器，直接使用即可。
- 如果被改成行内元素，需要同时设置 `display: inline-block`（或 `block`）并约束宽度，否则拿不到有效宽度。
- 在 flex / grid 布局中，建议显式设置宽度，或使用 `flex: 1` + `min-width: 0`，避免内容宽度反过来决定容器宽度。

宽度为 `0`（父级 `display: none`、尚未布局等）时组件不会缩放，会等 `ResizeObserver` 拿到有效宽度后再适配。

### 重算时机

- `text`、`maxLines`、`baseFontSize`、`minFontSize` 变化时重算；
- 根元素尺寸变化时通过 `ResizeObserver` 重算（只关心宽度，避免字号变化引起的高度变化触发循环）；
- 同一帧内的多次变更用 `requestAnimationFrame` 合帧；
- 网页字体加载完成后会再适配一次（字体不同，字符宽度会变）；
- 组件卸载时断开 `ResizeObserver`、取消未执行的 `requestAnimationFrame`。

## 注意事项

- `text` 只作为纯文本渲染，不会解析 HTML。
- 文本里的换行符会被 `white-space` 规则折叠（单行 `nowrap`、多行 `normal`），组件不会按 `\n` 分行；需要保留换行请自行拆成多段。
- `min-font-size` 大于 `base-font-size` 时按 `base-font-size` 处理（组件只会缩小字号，不会放大）；传 `0`、负数或非数值时回退到 `1`。
- 容器窄到几像素时组件会停在下限并截断，不会死循环，但此时已无阅读价值，建议用 `min-font-size` 提前止损。
- 字号上界来自根元素的 computed `font-size`，因此如果页面字号会在运行时变化（例如换肤、响应式字号），建议显式传 `base-font-size`，避免固化值与实际样式不一致。
- 首次适配在客户端完成，测量完成前可见层是隐藏的（避免以错误字号闪现）；服务端渲染时输出的是隐藏状态。
- 组件不设置 `line-height`，行高由使用方控制。多行模式下若行高是固定 px 值，字号缩小只会减少行数，不会降低单行高度。
