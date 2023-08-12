import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'

import Basic from './demo/Basic'
import Pill from './demo/Pill'
import Border from './demo/Border'
import Vertical from './demo/Vertical'
import Style from './demo/Style'
import Label from './demo/Label'
import Disabled from './demo/Disabled'
import NameMatch from './demo/NameMatch'
import Controllable from './demo/Controllable'
import Scrollable from './demo/Scrollable'
import Slot from './demo/Slot'
import Animated from './demo/Animated'
import Swiper from './demo/Swiper'
import Sticky from './demo/Sticky'
import Scrollspy from './demo/Scrollspy'
import ScrollspyVertical from './demo/ScrollspyVertical'

export default () => {
  return (
    <Page className="page-tabs">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="胶囊标签">
        <Pill />
      </Demo>

      <Demo title="边框标签">
        <Border />
      </Demo>

      <Demo title="垂直">
        <Vertical />
      </Demo>

      <Demo title="自定义样式">
        <Style />
      </Demo>

      <Demo title="自定义标签">
        <Label />
      </Demo>

      <Demo title="禁用标签">
        <Disabled />
      </Demo>

      <Demo title="名称匹配">
        <NameMatch />
      </Demo>

      <Demo title="受控组件">
        <Controllable />
      </Demo>

      <Demo title="可滚动的标签栏">
        <Scrollable />
      </Demo>

      <Demo title="插槽">
        <Slot />
      </Demo>

      <Demo title="切换动画">
        <Animated />
      </Demo>

      <Demo title="滑动切换">
        <Swiper />
      </Demo>

      <Demo title="粘性定位" full>
        <Sticky />
      </Demo>

      <Demo title="滚动监听" full>
        <Scrollspy />
      </Demo>

      <Demo title="垂直滚动监听" full>
        <ScrollspyVertical />
      </Demo>
    </Page>
  )
}
