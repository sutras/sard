import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'

import Basic from './demo/Basic'
import Expand from './demo/Expand'
import MultipleExpand from './demo/MultipleExpand'
import Controllable from './demo/Controllable'
import Disabled from './demo/Disabled'
import Slot from './demo/Slot'
import Duration from './demo/Duration'

export default () => {
  return (
    <Page className="page-accordion">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="默认展开">
        <Expand />
      </Demo>

      <Demo title="展开多个">
        <MultipleExpand />
      </Demo>

      <Demo title="受控">
        <Controllable />
      </Demo>

      <Demo title="禁用">
        <Disabled />
      </Demo>

      <Demo title="插槽">
        <Slot />
      </Demo>

      <Demo title="折叠时间">
        <Duration />
      </Demo>
    </Page>
  )
}
