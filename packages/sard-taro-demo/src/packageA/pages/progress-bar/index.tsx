import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Thickness from './demo/Thickness'
import Color from './demo/Color'
import Slot from './demo/Slot'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="粗细">
        <Thickness />
      </Demo>

      <Demo title="颜色">
        <Color />
      </Demo>

      <Demo title="插槽">
        <Slot />
      </Demo>
    </Page>
  )
}
