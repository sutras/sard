import { View } from '@tarojs/components'
import { useContext } from 'react'
import {
  Calendar,
  Cell,
  Empty,
  LocaleContext,
  Pagination,
  Radio,
  Space,
} from 'sard-taro'

import zhCN from 'sard-taro/dist/locale/lang/zh-CN'
import enUS from 'sard-taro/dist/locale/lang/en-US'

const langMap = {
  zhCN,
  enUS,
}

export default () => {
  const { setLang } = useContext(LocaleContext)

  const handleChange = (value) => {
    setLang(langMap[value])
  }

  return (
    <Cell.Group card>
      <Cell
        title="切换中英文"
        footer={
          <View>
            <Radio.Group defaultValue="zhCN" onChange={handleChange}>
              <Space gap="medium">
                <Radio value="zhCN">中文</Radio>
                <Radio value="enUS">英文</Radio>
              </Space>
            </Radio.Group>
          </View>
        }
      ></Cell>
      <Cell>
        <Calendar type="range" />
      </Cell>
      <Cell>
        <Empty />
      </Cell>
      <Cell>
        <Pagination total={30} type="simple" />
      </Cell>
    </Cell.Group>
  )
}
