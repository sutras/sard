import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Controllable from './demo/Controllable'
import Style from './demo/Style'
import Type from './demo/Type'
import Clearable from './demo/Clearable'
import ShowClearOnlyFocus from './demo/ShowClearOnlyFocus'
import Disabled from './demo/Disabled'
import ReadOnly from './demo/ReadOnly'
import Slot from './demo/Slot'
import Borderless from './demo/Borderless'
import Inlaid from './demo/Inlaid'
import AutoHeight from './demo/AutoHeight'
import ShowCount from './demo/ShowCount'

export default () => {
  return (
    <Page className="page-input">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="受控组件">
        <Controllable />
      </Demo>

      <Demo title="自定义样式">
        <Style />
      </Demo>

      <Demo title="类型">
        <Type />
      </Demo>

      <Demo title="可清除的">
        <Clearable />
      </Demo>

      <Demo title="聚焦时显示清除按钮">
        <ShowClearOnlyFocus />
      </Demo>

      <Demo title="禁用">
        <Disabled />
      </Demo>

      <Demo title="只读">
        <ReadOnly />
      </Demo>

      <Demo title="插槽">
        <Slot />
      </Demo>

      <Demo title="去除边框">
        <Borderless />
      </Demo>

      <Demo title="嵌入的" full>
        <Inlaid />
      </Demo>

      <Demo title="自动高度">
        <AutoHeight />
      </Demo>

      <Demo title="字数提示">
        <ShowCount />
      </Demo>
    </Page>
  )
}
