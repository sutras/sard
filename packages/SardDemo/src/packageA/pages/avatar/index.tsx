import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Shape from './demo/Shape'
import IconSize from './demo/IconSize'
import Size from './demo/Size'
import Picture from './demo/Picture'
import Children from './demo/Children'
import Style from './demo/Style'
import Extra from './demo/Extra'
import Group from './demo/Group'
import Gap from './demo/Gap'
import Direction from './demo/Direction'
import MaxCount from './demo/MaxCount'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="形状">
        <Shape />
      </Demo>

      <Demo title="图标大小">
        <IconSize />
      </Demo>

      <Demo title="头像尺寸">
        <Size />
      </Demo>

      <Demo title="图片类型">
        <Picture />
      </Demo>

      <Demo title="自定义内容">
        <Children />
      </Demo>

      <Demo title="自定义样式">
        <Style />
      </Demo>

      <Demo title="额外内容">
        <Extra />
      </Demo>

      <Demo title="头像组">
        <Group />
      </Demo>

      <Demo title="间距">
        <Gap />
      </Demo>

      <Demo title="方向">
        <Direction />
      </Demo>

      <Demo title="最大头像个数">
        <MaxCount />
      </Demo>
    </Page>
  )
}
