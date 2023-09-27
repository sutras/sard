import { View } from '@tarojs/components'
import { useContext } from 'react'
import {
  Calendar,
  List,
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
    setLang?.(langMap[value])
  }

  return (
    <List card>
      <List.Item
        title="切换中英文"
        footerStyle={{ flexGrow: 0 }}
        footer={
          <View>
            <Radio.Group defaultValue="zhCN" onChange={handleChange}>
              <Space direction="horizontal" gap="medium">
                <Radio value="zhCN">中文</Radio>
                <Radio value="enUS">英文</Radio>
              </Space>
            </Radio.Group>
          </View>
        }
      />
      <List.Item>
        <Calendar type="range" />
      </List.Item>
      <List.Item>
        <Empty />
      </List.Item>
      <List.Item>
        <Pagination total={30} type="simple" />
      </List.Item>
    </List>
  )
}
