import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Size from './demo/Size'
import Color from './demo/Color'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="加载尺寸">
        <Size />
      </Demo>

      <Demo title="自定义颜色">
        <Color />
      </Demo>
    </Page>
  )
}
