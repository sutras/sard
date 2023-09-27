import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import MinMax from './demo/MinMax'
import Step from './demo/Step'
import Color from './demo/Color'
import Size from './demo/Size'
import Vertical from './demo/Vertical'
import DisabledReadOnly from './demo/DisabledReadOnly'
import Slot from './demo/Slot'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="最大最小值" full>
        <MinMax />
      </Demo>

      <Demo title="步长" full>
        <Step />
      </Demo>

      <Demo title="自定义颜色">
        <Color />
      </Demo>

      <Demo title="自定义尺寸">
        <Size />
      </Demo>

      <Demo title="垂直">
        <Vertical />
      </Demo>

      <Demo title="只读和禁用">
        <DisabledReadOnly />
      </Demo>

      <Demo title="自定义按钮插槽">
        <Slot />
      </Demo>
    </Page>
  )
}
