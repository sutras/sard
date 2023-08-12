import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Controllable from './demo/Controllable'
import MinMax from './demo/MinMax'
import Step from './demo/Step'
import Precision from './demo/Precision'
import DisabledReadOnly from './demo/DisabledReadOnly'

export default () => {
  return (
    <Page className="page-stepper">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="受控">
        <Controllable />
      </Demo>

      <Demo title="最大最小值">
        <MinMax />
      </Demo>

      <Demo title="步长">
        <Step />
      </Demo>

      <Demo title="精度">
        <Precision />
      </Demo>

      <Demo title="只读和禁用">
        <DisabledReadOnly />
      </Demo>
    </Page>
  )
}
