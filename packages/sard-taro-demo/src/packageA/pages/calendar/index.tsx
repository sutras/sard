import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Type from './demo/Type'
import MinMax from './demo/MinMax'
import MaxDays from './demo/MaxDays'
import DisabledDate from './demo/DisabledDate'
import WeekStartsOn from './demo/WeekStartsOn'
import Formatter from './demo/Formatter'
import Alone from './demo/Alone'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
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

      <Demo title="自定义起始周" full>
        <WeekStartsOn />
      </Demo>

      <Demo title="格式化日期" full>
        <Formatter />
      </Demo>

      <Demo title="单独使用" full>
        <Alone />
      </Demo>
    </Page>
  )
}
