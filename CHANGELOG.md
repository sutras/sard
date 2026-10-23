## <small>1.2.1 (2026-10-23)</small>

- Bug Fixes: 修复低版本系统可能出现的闪烁问题 ([3b0dce9](https://github.com/sutras/sard/commit/3b0dce9))

## 1.2.0 (2026-10-22)

- Code Refactoring: compactNumber 入参兼容 null/undefined ([bcb4d1f](https://github.com/sutras/sard/commit/bcb4d1f))
- Code Refactoring: createImperativeComponent 去 vdom，isConfigObject 移除 isVNode ([f294828](https://github.com/sutras/sard/commit/f294828))
- Code Refactoring: dnd-item 去掉 OnlyChild，删除 utils/vnode ([3202a39](https://github.com/sutras/sard/commit/3202a39))
- Code Refactoring: motion 类型的 barrel 导入改走直接路径 ([e628ba8](https://github.com/sutras/sard/commit/e628ba8))
- Code Refactoring: popover/descriptions 去除 VNode 依赖，为 Vapor 做准备 ([2548739](https://github.com/sutras/sard/commit/2548739))
- Code Refactoring: swiper/picker-view 去除 VNode 依赖并改写为 SFC ([321329c](https://github.com/sutras/sard/commit/321329c))
- Code Refactoring: 抽离 getExclude，类型生成预先排除 _.vapor._ ([0913227](https://github.com/sutras/sard/commit/0913227))
- Code Refactoring: 测量层三合一，探测改为同步写入 ([fbc8019](https://github.com/sutras/sard/commit/fbc8019))
- Features: 新增 TextShrink 文本自适应缩放组件 ([c8bc48a](https://github.com/sutras/sard/commit/c8bc48a))
- Bug Fixes: dnd 嵌套示例表单项补 flex-1 撑满剩余宽度 ([d711233](https://github.com/sutras/sard/commit/d711233))
- Bug Fixes: 修正 vapor 下用组件实例定位列下标导致级联回弹 ([b52e1c5](https://github.com/sutras/sard/commit/b52e1c5))
- Bug Fixes: 蒙层显式接收透传属性，修复 vapor 下 class/style 丢失 ([230f9d2](https://github.com/sutras/sard/commit/230f9d2))

## 1.1.0 (2026-10-10)

- Features: 新增 danmaku 组件 ([5c9c54b](https://github.com/sutras/sard/commit/5c9c54b))

## <small>1.0.29 (2026-09-14)</small>

- Bug Fixes: 修复翻转在部分iOS系统不可见问题 ([4db678f](https://github.com/sutras/sard/commit/4db678f))

## <small>1.0.28 (2026-09-12)</small>

- Code Refactoring: 提取motion样式变量, popover 允许隐藏箭头 ([561f816](https://github.com/sutras/sard/commit/561f816))

## <small>1.0.23 (2026-09-09)</small>

- Features: 新增number工具函数 ([c771eff](https://github.com/sutras/sard/commit/c771eff))

## <small>1.0.22 (2026-09-08)</small>

- Code Refactoring: 移除lwa ([e0baa94](https://github.com/sutras/sard/commit/e0baa94))

## <small>1.0.21 (2026-09-07)</small>

- Features: 添加工具函数 ([c2ae50c](https://github.com/sutras/sard/commit/c2ae50c))

## <small>1.0.20 (2026-09-07)</small>

- Features: 新增波斯语 ([56552ab](https://github.com/sutras/sard/commit/56552ab))

## <small>1.0.19 (2026-09-07)</small>

- Code Refactoring: space 改为 flex 组件 ([6ac5433](https://github.com/sutras/sard/commit/6ac5433))
- Code Refactoring: 使用status-bar高度使用css变量代替js ([ad1d29a](https://github.com/sutras/sard/commit/ad1d29a))

## <small>1.0.18 (2026-09-02)</small>

- Bug Fixes: 表单自动终止验证 ([7fab3f7](https://github.com/sutras/sard/commit/7fab3f7))

## <small>1.0.17 (2026-09-02)</small>

- Bug Fixes: 表单验证允许取消 ([66a32a4](https://github.com/sutras/sard/commit/66a32a4))

## <small>1.0.16 (2026-09-02)</small>

- Bug Fixes: inputmode 不设置默认值 ([dd5a913](https://github.com/sutras/sard/commit/dd5a913))

## <small>1.0.15 (2026-09-02)</small>

- Features: load-more组件新增 invisible 属性 ([31abf9e](https://github.com/sutras/sard/commit/31abf9e))

## <small>1.0.14 (2026-09-01)</small>

- Code Refactoring: 重构加载更多组件 ([c2dd61b](https://github.com/sutras/sard/commit/c2dd61b))

## <small>1.0.13 (2026-08-31)</small>

- Features: 提供弹框对返回键的支持 ([c3b2636](https://github.com/sutras/sard/commit/c3b2636))

## <small>1.0.12 (2026-08-31)</small>

- Bug Fixes: 统一属性名称 ([5082b4c](https://github.com/sutras/sard/commit/5082b4c))

## <small>1.0.11 (2026-08-30)</small>

## <small>1.0.10 (2026-08-27)</small>

## <small>1.0.9 (2026-08-26)</small>

- Code Refactoring: 重构infinite-list,pull-down-refresh组件 ([0b5c0a2](https://github.com/sutras/sard/commit/0b5c0a2))

## <small>1.0.8 (2026-08-26)</small>

- Features: 透传confirm参数 ([de6e472](https://github.com/sutras/sard/commit/de6e472))

## <small>1.0.7 (2026-08-26)</small>

- Features: 暴露picker-popout参数 ([d0fc91e](https://github.com/sutras/sard/commit/d0fc91e))

## <small>1.0.6 (2026-08-26)</small>

- Bug Fixes: 优化 infinite-list 布局 ([a586bee](https://github.com/sutras/sard/commit/a586bee))

## <small>1.0.5 (2026-08-22)</small>

- Bug Fixes: 修复picker-view 溢出问题 ([a3e9f05](https://github.com/sutras/sard/commit/a3e9f05))

## <small>1.0.4 (2026-08-15)</small>

- Code Refactoring: 重构 swipe-action ([51e349a](https://github.com/sutras/sard/commit/51e349a))
- Bug Fixes: 修复sticky计算时机问题 ([22a867b](https://github.com/sutras/sard/commit/22a867b))

## <small>1.0.3 (2026-08-14)</small>

- Bug Fixes: 修复swiper loop,初始化snap问题,添加测试用例 ([556fba3](https://github.com/sutras/sard/commit/556fba3))

## <small>1.0.2 (2026-08-14)</small>

- Bug Fixes: 修复tree shaking问题 ([07733f6](https://github.com/sutras/sard/commit/07733f6))
