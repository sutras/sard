import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Scrollable from './demo/Scrollable'
import UnScrollable from './demo/UnScrollable'
import Wrap from './demo/Wrap'
import LeftIcon from './demo/LeftIcon'
import Closable from './demo/Closable'
import Linkable from './demo/Linkable'
import RightIcon from './demo/RightIcon'
import Style from './demo/Style'
import Vertical from './demo/Vertical'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="强制滚动" full>
        <Scrollable />
      </Demo>

      <Demo title="强制不滚动" full>
        <UnScrollable />
      </Demo>

      <Demo title="多行展示" full>
        <Wrap />
      </Demo>

      <Demo title="自定义左边图标" full>
        <LeftIcon />
      </Demo>

      <Demo title="可关闭的" full>
        <Closable />
      </Demo>

      <Demo title="可点击的" full>
        <Linkable />
      </Demo>

      <Demo title="自定义右边图标" full>
        <RightIcon />
      </Demo>

      <Demo title="自定义样式" full>
        <Style />
      </Demo>

      <Demo title="垂直滚动" full>
        <Vertical />
      </Demo>
    </Page>
  )
}
