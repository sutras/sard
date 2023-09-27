import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Horizontal from './demo/Horizontal'
import Gap from './demo/Gap'
import Align from './demo/Align'
import Justify from './demo/Justify'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="水平排列">
        <Horizontal />
      </Demo>

      <Demo title="间距">
        <Gap />
      </Demo>

      <Demo title="垂直对齐">
        <Align />
      </Demo>

      <Demo title="水平对齐">
        <Justify />
      </Demo>
    </Page>
  )
}
