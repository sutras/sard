# Icon 图标

### 介绍

基于字体的图标集。

### 引入

```ts
import { Icon } from 'sard'
```

## 代码演示

### 基础使用

使用 `name` 属性指定要显示的图标。

@code('${DEMO_PATH}/icon/demo/Basic.tsx')

### 尺寸

设置图标大小。

@code('${DEMO_PATH}/icon/demo/Size.tsx')

### 颜色

设置图标颜色。

@code('${DEMO_PATH}/icon/demo/Color.tsx')

### 图片类型图标

名称里面带有`/`字符会被当作图片处理。

@code('${DEMO_PATH}/icon/demo/Picture.tsx')

### 自定义图标

组件库内置有用于其他组件的必须的少量的图标，在实际的应用中，通常需要引入自定义的特定风格的图标库或第三方图标库。

下面演示如何引入 <a href="https://www.iconfont.cn/" target="_blank">`iconfont`</a> 中的图标库，并兼容到 `H5`、小程序、`RN`。

以此文档案例使用的 `demo-icons` 图标库演示。

1. 进入到 `iconfont` 中的 `demo-icons` 项目并进行以下配置配置：

   - FontClass/Symbol 前缀: `demo-icons-`
   - Font Family: `demo-icons`
   - 字体格式: 只勾选 `TTF`
   - 保存

2. 将图标库下载到本地；
3. 我们只需要得到解压后以下三个文件:

   - `iconfont.json`（`RN` 需要）
   - `iconfont.css`（`H5` 和小程序需要）
   - `iconfont.ttf`（各个端都需要）

4. 将这三个文件复制到 `src/assets/fonts` 目录；
5. 将 `iconfont.css` 更名为 `iconfont.scss`（避免导入 `css` 文件报错）；
6. 在此目录新建一个没有内容的 `iconfont.rn.scss` 文件（用于`RN`端导入）；
7. 在 `app.tsx` 文件导入 `iconfont.scss` 文件:

   ```tsx
   import './assets/fonts/iconfont.scss'
   ```

   至此，在`H5`和小程序端的配置已完成。下面继续配置 `RN` 端图标字体的使用。

8. 使用 `Icon.loadFont`导入字体:

   ```tsx
   import { Icon } from 'sard'

   if (process.env.TARO_ENV === 'rn') {
     Icon.loadFont({
       'demo-icons': {
         glyphs: Icon.parseGlyphs(require('./assets/fonts/iconfont.json')),
         font: require('./assets/fonts/iconfont.ttf'),
       },
     })
   }
   ```

   `Icon.parseGlyphs` 方法会提取 `iconfont.json` 文件中的 `font_class` 和 `unicode_decimal` 字段数据并将其组成对象后返回。
   至此 `RN` 端的配置已完成，下面演示如何使用。

9. 使用 `demo-icons` 图标库中的图标：

@code('${DEMO_PATH}/icon/demo/Custom.tsx')

### 内置图标

组件库内置了一些内部组件使用到的图标，数量不多，开发项目时通常要引入自定义的图标库。

## API

### IconProps

| 属性      | 描述                                                    | 类型               | 默认值       |
| --------- | ------------------------------------------------------- | ------------------ | ------------ |
| name      | 图标名称或图片链接，如果名称带有`/`，会被认为是图片图标 | string             | ''           |
| family    | 字体名称                                                | string             | 'sard-icons' |
| prefix    | 类名前缀，会拼接上 `name` 作为类名，仅用于非 `RN` 端    | string             | 'sari'       |
| size      | 图标大小                                                | number             | -            |
| color     | 图标颜色                                                | string             | -            |
| imageMode | 图片裁剪、缩放的模式                                    | ImageProps['mode'] | 'aspectFill' |
