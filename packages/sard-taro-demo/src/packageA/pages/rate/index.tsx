import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import AllowHalf from './demo/AllowHalf'
import CustomIcon from './demo/CustomIcon'
import Color from './demo/Color'
import Size from './demo/Size'
import Count from './demo/Count'
import AllowClear from './demo/AllowClear'
import DisableReadOnly from './demo/DisableReadOnly'

export default () => {
  return (
    <Page className="page-rate">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="半星">
        <AllowHalf />
      </Demo>

      <Demo title="自定义图标">
        <CustomIcon />
      </Demo>

      <Demo title="自定义颜色">
        <Color />
      </Demo>

      <Demo title="自定义尺寸和间距">
        <Size />
      </Demo>

      <Demo title="自定义数量">
        <Count />
      </Demo>

      <Demo title="允许清空">
        <AllowClear />
      </Demo>

      <Demo title="只读和禁用">
        <DisableReadOnly />
      </Demo>
    </Page>
  )
}
