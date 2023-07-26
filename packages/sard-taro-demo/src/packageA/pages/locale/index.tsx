import Demo from '@/components/demo'
import Page from '@/components/page'
import {
  Calendar,
  Cell,
  Empty,
  LocaleContext,
  Pagination,
  Radio,
} from 'sard-taro'

import './index.scss'
import { View } from '@tarojs/components'
import { useContext } from 'react'
import zhCN from 'sard-taro/src/locale/lang/zh-CN'
import enUS from 'sard-taro/src/locale/lang/en-US'

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
    <Page className="page-locale">
      <Demo title="动态修改语言" full>
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
