import Demo from '@/components/demo'
import Page from '@/components/page'
import { Toast } from 'sard-taro'

import Basic from './demo/Basic'
import WithPopout from './demo/WithPopout'
import Type from './demo/Type'
import MinMax from './demo/MinMax'
import MaxDays from './demo/MaxDays'
import DisabledDate from './demo/DisabledDate'
import Color from './demo/Color'
import WeekStartsOn from './demo/WeekStartsOn'
import Formatter from './demo/Formatter'

export default () => {
  return (
    <Page className="page-calendar">
      <Toast.Agent />

      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="配合弹出框使用" full>
        <WithPopout />
      </Demo>

      <Demo title="类型" full>
        <Type />
      </Demo>

      <Demo title="自定义日期范围" full>
        <MinMax />
      </Demo>

      <Demo title="最多选择天数" full>
        <MaxDays />
      </Demo>

      <Demo title="禁用日期" full>
        <DisabledDate />
      </Demo>

      <Demo title="自定义颜色" full>
        <Color />
      </Demo>

      <Demo title="自定义起始周" full>
        <WeekStartsOn />
      </Demo>

      <Demo title="格式化日期" full>
        <Formatter />
      </Demo>
    </Page>
  )
}
