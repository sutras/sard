# Accordion 手风琴

### 介绍

通过折叠收纳内容，允许同时展开一个或多个。

### 引入

```js
import { Accordion } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/DefaultActiveName.tsx",
    "./demo/Multiple.tsx",
    "./demo/Controlled.tsx",
    "./demo/Disabled.tsx",
    "./demo/Slot.tsx",
    "./demo/Duration.tsx"
  ]
</script>

## API

### AccordionProps

| 属性             | 描述                    | 类型                                                          | 默认值 |
| ---------------- | ----------------------- | ------------------------------------------------------------- | ------ |
| duration         | 展开折叠缓动时间        | number                                                        | -      |
| multiple         | 是否可同时展开多个      | boolean                                                       | false  |
| defaultActiveKey | 默认选中面板的 key      | string \| number \| (string \| number)[]                      | -      |
| activeKey        | 当前激活 tab 面板的 key | string \| number \| (string \| number)[]                      | -      |
| onChange         | 切换面板时触发          | (activeKey: string \| number \| (string \| number)[]) => void | -      |

### AccordionItemProps

| 属性     | 描述             | 类型                                                      | 默认值 |
| -------- | ---------------- | --------------------------------------------------------- | ------ |
| title    | 面板标题         | React.ReactNode                                           | -      |
| icon     | 面板右侧图标     | React.ReactNode \| ((active: boolean) => React.ReactNode) | -      |
| key      | 对应 `activeKey` | string \| number                                          | -      |
| disabled | 禁用面板         | boolean                                                   | -      |
| duration | 展开折叠缓动时间 | number                                                    | 300    |
| onClick  | 点击面板头部触发 | (event: MouseEvent) => void                               | -      |

## 主题定制

### SCSS

```scss
$s-accordion-border-color: $s-border-color !default;
$s-accordion-border-radius: $s-border-radius !default;

$s-accordion-item-header-padding: 10px 15px !default;
$s-accordion-item-title-font-size: $s-font-size !default;
$s-accordion-item-arrow-transition-duration: 300ms !default;
$s-accordion-item-content-padding: 10px 15px 15px !default;
```
