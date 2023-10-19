import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Compact from './demo/Compact'
import WithCalendar from './demo/WithCalendar'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="紧凑类型">
        <Compact />
      </Demo>

      <Demo title="结合日期组件">
        <WithCalendar />
      </Demo>
    </Page>
  )
}
