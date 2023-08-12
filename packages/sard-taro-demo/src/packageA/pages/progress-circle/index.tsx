import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Thickness from './demo/Thickness'
import Color from './demo/Color'
import Size from './demo/Size'

export default () => {
  return (
    <Page className="page-progress-circle">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="粗细">
        <Thickness />
      </Demo>

      <Demo title="颜色">
        <Color />
      </Demo>

      <Demo title="尺寸">
        <Size />
      </Demo>
    </Page>
  )
}
