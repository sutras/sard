---
title: Danmaku
subtitle: 弹幕
group: 活动组件
---

## 介绍

弹幕组件，用于实现类似视频网站中实时滚动的弹幕效果。弹幕会从容器一侧进入，以固定速度穿过屏幕，并支持多轨道、循环播放、暂停与继续等能力。

组件是泛型的，`list` 项的类型由你决定；通过 `item` 插槽自行渲染每条弹幕（当项为字符串或数字时会直接展示）。

- **方向**：跟随文档 `dir` 自动判断 RTL；
- **自动暂停**：页面隐藏、组件滚出视口时会自动暂停（`autoPause`），恢复后自动继续；
- **性能**：可配合 `maxItems` 限制同时在飞数量。

## 代码演示

### 基础使用

通过 `list` 传入弹幕数据，设置 `loop` 循环播放。

<<< @demo/danmaku/demo/Basic.vue

### 自定义内容

通过 `item` 插槽可以自定义弹幕内容，例如头像加昵称加文本的组合。

<<< @demo/danmaku/demo/Custom.vue

### 动态发送与播放控制

通过 `Expose` 中的 `send` 方法动态发送弹幕，也可以通过 `pause`、`resume` 控制播放。

<<< @demo/danmaku/demo/Interact.vue

### RTL 方向

跟随文档 `dir` 自动判断方向；当容器处于 `dir="rtl"` 时，弹幕会从左侧进入、向右滚动。

<<< @demo/danmaku/demo/Rtl.vue

## API

### DanmakuProps

| 属性       | 描述                           | 类型             | 默认值   |
| ---------- | ------------------------------ | ---------------- | -------- |
| list       | 弹幕列表                       | T[]              | -        |
| rows       | 轨道数量                       | number           | 3        |
| speed      | 滚动速度 (px/s)                | number           | 100      |
| speedRange | 速度浮动范围 (px/s)            | number           | 0        |
| gap        | 同轨道相邻弹幕的间距 (px)      | number           | 40       |
| easing     | 动画缓动函数                   | string           | 'linear' |
| autoPlay   | 是否自动播放                   | boolean          | true     |
| loop       | 是否循环播放                   | boolean          | false    |
| autoPause  | 页面隐藏/滚出视口自动暂停      | boolean          | true     |
| maxItems   | 同时在飞弹幕数量上限（0 不限） | number           | 0        |
| rowHeight  | 轨道高度（数字视为 px）        | number \| string | 34       |

> 开启 `speedRange` 后，同一轨道内各弹幕速度略有不同，观感更自然；代价是较快的弹幕可能追上较慢的弹幕而形成轻微重叠（`speedRange` 越大越明显）。默认 `0` 表示所有弹幕同速、严格不重叠。

### DanmakuSlots

| 插槽 | 描述           | 属性                       |
| ---- | -------------- | -------------------------- |
| item | 自定义弹幕内容 | { item: T; index: number } |

### DanmakuEmits

| 事件   | 描述                             | 类型       |
| ------ | -------------------------------- | ---------- |
| play   | 开始播放时触发                   | () => void |
| pause  | 暂停时触发                       | () => void |
| finish | 全部弹幕播放完成时触发（非循环） | () => void |

### DanmakuExpose

| 属性   | 描述           | 类型              |
| ------ | -------------- | ----------------- |
| play   | 开始播放       | () => void        |
| pause  | 暂停播放       | () => void        |
| resume | 继续播放       | () => void        |
| stop   | 停止并清空弹幕 | () => void        |
| send   | 发送一条弹幕   | (item: T) => void |
