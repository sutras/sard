import Demo from '@/components/demo'
import Page from '@/components/page'

import Color from './demo/Color'
import Rounded from './demo/Rounded'
import FontSize from './demo/FontSize'

export default () => {
  return (
    <Page>
      <Demo title="颜色">
        <Color />
      </Demo>

      <Demo title="圆角">
        <Rounded />
      </Demo>

      <Demo title="字号">
        <FontSize />
      </Demo>
    </Page>
  )
}
