import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import MinMax from './demo/MinMax'
import Step from './demo/Step'
import Precision from './demo/Precision'
import DisabledReadOnly from './demo/DisabledReadOnly'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
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
