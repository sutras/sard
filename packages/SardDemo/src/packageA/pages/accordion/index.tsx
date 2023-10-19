import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Expand from './demo/Expand'
import MultipleExpand from './demo/MultipleExpand'
import Controllable from './demo/Controllable'
import Disabled from './demo/Disabled'
import Arrow from './demo/Arrow'
import Duration from './demo/Duration'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="默认展开" full>
        <Expand />
      </Demo>

      <Demo title="展开多个" full>
        <MultipleExpand />
      </Demo>

      <Demo title="受控" full>
        <Controllable />
      </Demo>

      <Demo title="禁用" full>
        <Disabled />
      </Demo>

      <Demo title="自定义箭头" full>
        <Arrow />
      </Demo>

      <Demo title="折叠时间" full>
        <Duration />
      </Demo>
    </Page>
  )
}
