import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Size from './demo/Size'
import Color from './demo/Color'
import Value from './demo/Value'
import DisabledReadOnly from './demo/DisabledReadOnly'
import Loading from './demo/Loading'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="自定义尺寸">
        <Size />
      </Demo>

      <Demo title="自定义颜色">
        <Color />
      </Demo>

      <Demo title="不同状态的值">
        <Value />
      </Demo>

      <Demo title="只读和禁用">
        <DisabledReadOnly />
      </Demo>

      <Demo title="加载状态">
        <Loading />
      </Demo>
    </Page>
  )
}
