import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Disabled from './demo/Disabled'
import Group from './demo/Group'
import Size from './demo/Size'
import Color from './demo/Color'
import Type from './demo/Type'
import Icon from './demo/Icon'
import Custom from './demo/Custom'
import CustomFully from './demo/CustomFully'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="禁用">
        <Disabled />
      </Demo>

      <Demo title="图标大小">
        <Size />
      </Demo>

      <Demo title="自定义颜色">
        <Color />
      </Demo>

      <Demo title="图标类型">
        <Type />
      </Demo>

      <Demo title="自定义图标">
        <Icon />
      </Demo>

      <Demo title="复选框组">
        <Group />
      </Demo>

      <Demo title="自定义组件">
        <Custom />
      </Demo>

      <Demo title="完全自定义组件">
        <CustomFully />
      </Demo>
    </Page>
  )
}
