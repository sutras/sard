import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Style from './demo/Style'
import Type from './demo/Type'
import Clearable from './demo/Clearable'
import ShowClearOnlyFocus from './demo/ShowClearOnlyFocus'
import Slot from './demo/Slot'
import Borderless from './demo/Borderless'
import Inlaid from './demo/Inlaid'
import AutoHeight from './demo/AutoHeight'
import ShowCount from './demo/ShowCount'
import DisabledReadOnly from './demo/DisabledReadOnly'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
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

      <Demo title="只读和禁用">
        <DisabledReadOnly />
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
