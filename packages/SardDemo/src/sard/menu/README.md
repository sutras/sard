# Menu 菜单

### 介绍

气泡弹出框的中的菜单。

### 引入

```ts
import { Menu } from 'sard'
```

## API

### MenuProps

| 属性      | 描述           | 类型                         | 默认值     |
| --------- | -------------- | ---------------------------- | ---------- |
| options   | 菜单选项       | MenuOption[]                 | []         |
| direction | 菜单排列方向   | 'vertical' \| 'horizontal'   | 'vertical' |
| theme     | 菜单主题色     | 'dark' \| 'light'            | 'light'    |
| onSelect  | 选择菜单时触发 | (option: MenuOption) => void | -          |

### MenuItemProps

| 属性      | 描述                  | 类型                       | 默认值     |
| --------- | --------------------- | -------------------------- | ---------- |
| text      | 菜单项文案            | React.ReactNode            | -          |
| disabled  | 禁用菜单项            | boolean                    | false      |
| iconProps | `Icon` 组件的 `props` | IconProps                  | -          |
| direction | 菜单排列方向          | 'vertical' \| 'horizontal' | 'vertical' |
| theme     | 菜单主题色            | 'dark' \| 'light'          | 'light'    |
| onClick   | 菜单项点击时触发      | () => void                 | -          |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
