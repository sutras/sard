import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Offset from './demo/Offset'
import Justify from './demo/Justify'
import Align from './demo/Align'
import Gap from './demo/Gap'
import Order from './demo/Order'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="列偏移">
        <Offset />
      </Demo>

      <Demo title="水平对齐">
        <Justify />
      </Demo>

      <Demo title="垂直对齐">
        <Align />
      </Demo>

      <Demo title="列间距">
        <Gap />
      </Demo>

      <Demo title="列顺序">
        <Order />
      </Demo>
    </Page>
  )
}
