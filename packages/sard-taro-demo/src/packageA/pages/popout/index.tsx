import Demo from '@/components/demo'
import Page from '@/components/page'
import { Toast } from 'sard-taro'

import Basic from './demo/Basic'
import Compact from './demo/Compact'
import WithCalendar from './demo/WithCalendar'
import Controllable from './demo/Controllable'
import Fast from './demo/Fast'
import WithCell from './demo/WithCell'

export default () => {
  return (
    <Page className="page-popout">
      <Toast.Agent />

      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="紧凑类型" full>
        <Compact />
      </Demo>

      <Demo title="结合日期组件" full>
        <WithCalendar />
      </Demo>

      <Demo title="受控的弹出框" full>
        <Controllable />
      </Demo>

      <Demo title="快捷确认" full>
        <Fast />
      </Demo>

      <Demo title="结合 Cell 组件使用" full>
        <WithCell />
      </Demo>
    </Page>
  )
}
