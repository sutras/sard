import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Controllable from './demo/Controllable'
import Disabled from './demo/Disabled'
import Size from './demo/Size'
import Color from './demo/Color'
import Type from './demo/Type'
import CustomIcon from './demo/CustomIcon'
import Custom from './demo/Custom'
import CustomFully from './demo/CustomFully'

export default () => {
  return (
    <Page className="page-radio">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="受控">
        <Controllable />
      </Demo>

      <Demo title="禁用状态">
        <Disabled />
      </Demo>

      <Demo title="图标大小">
        <Size />
      </Demo>

      <Demo title="颜色">
        <Color />
      </Demo>

      <Demo title="图标类型">
        <Type />
      </Demo>

      <Demo title="自定义图标">
        <CustomIcon />
      </Demo>

      <Demo title="自定义组件" full>
        <Custom />
      </Demo>

      <Demo title="完全自定义组件" full>
        <CustomFully />
      </Demo>
    </Page>
  )
}
