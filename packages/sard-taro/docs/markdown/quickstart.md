# 快速上手

## 安装

### 通过 npm 安装

```bash
npm install sard-taro
```

## 引入

### 全局样式引入

导入 `CSS` 文件：

```scss
@import 'sard-taro/dist/index.css';
```

如果需要修改默认 `SCSS` 变量，也可以导入 `SCSS` 文件：

```scss
@import 'sard-taro/dist/index.scss';
```

## 使用组件

### Button 组件示例

```tsx
import { Button } from 'sard-taro'

export default () => {
  return <Button>按钮</Button>
}
```
