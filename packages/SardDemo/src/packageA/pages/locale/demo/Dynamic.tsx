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
} from 'sard'

export default () => {
  const { lang, setLang } = useContext(LocaleContext)

  return (
    <List card>
      <List.Item
        title="切换中英文"
        footerStyle={{ flexGrow: 0 }}
        footer={
          <View>
            <Radio.Group value={lang} onChange={setLang}>
              <Space direction="horizontal" gap="medium">
                <Radio value="zh-CN">中文</Radio>
                <Radio value="en-US">英文</Radio>
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
