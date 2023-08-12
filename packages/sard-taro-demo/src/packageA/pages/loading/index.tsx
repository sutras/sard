import Demo from '@/components/demo'
import Page from '@/components/page'

import Type from './demo/Type'
import Size from './demo/Size'
import Text from './demo/Text'
import Vertical from './demo/Vertical'
import Color from './demo/Color'

export default () => {
  return (
    <Page className="page-loading">
      <Demo title="加载类型">
        <Type />
      </Demo>

      <Demo title="加载尺寸">
        <Size />
      </Demo>

      <Demo title="加载文案">
        <Text />
      </Demo>

      <Demo title="垂直排布">
        <Vertical />
      </Demo>

      <Demo title="自定义颜色">
        <Color />
      </Demo>
    </Page>
  )
}
