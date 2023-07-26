# Locale 国际化

### 介绍

默认采用中文作为默认语言，允许切换不同语言。

## 代码演示

### 初始化语言配置

初始化语言是通过 [`ConfigProvider`](./#/components/config-provider) 组件完成的。

### 动态修改语言

后续的语言修改除了借助 `ConfigProvider` 组件，还可以通过 `LocaleContext` 提供的 `setLang` 函数进行修改。

```tsx
import {
  Calendar,
  Cell,
  Empty,
  LocaleContext,
  Pagination,
  Radio,
} from 'sard-taro'
import zhCN from 'sard-taro/src/locale/lang/zh-CN'
import enUS from 'sard-taro/src/locale/lang/en-US'

const langMap = {
  zhCN,
  enUS,
}
```

```tsx
export default () => {
  const { setLang } = useContext(LocaleContext)

  const handleChange = (value) => {
    setLang(langMap[value])
  }

  return (
    <Page className="page-locale">
      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell
            title="切换中英文"
            footer={
              <View>
                <Radio.Group defaultValue="zhCN" onChange={handleChange}>
                  <Radio value="zhCN">中文</Radio>
                  <Radio value="enUS">英文</Radio>
                </Radio.Group>
              </View>
            }
          ></Cell>
          <Cell>
            <Calendar />
          </Cell>
          <Cell>
            <Empty />
          </Cell>
          <Cell>
            <Pagination total={30} type="simple" />
          </Cell>
        </Cell.Group>
      </Demo>
    </Page>
  )
}
```

## API

### LocaleContextValue

```tsx
interface LocaleContextValue {
  lang: LocaleLang
  setLang: (lang: LocaleLang) => void
}
```

### LocaleLang

```tsx
typeof zhCN
```
