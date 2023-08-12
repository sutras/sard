import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'

import Basic from './demo/Basic'
import Controllable from './demo/Controllable'
import Vertical from './demo/Vertical'
import AutoPlay from './demo/AutoPlay'
import Circular from './demo/Circular'

export default () => {
  return (
    <Page className="page-swiper">
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="受控" full>
        <Controllable />
      </Demo>

      <Demo title="垂直" full>
        <Vertical />
      </Demo>

      <Demo title="自动播放" full>
        <AutoPlay />
      </Demo>

      <Demo title="循环滑动" full>
        <Circular />
      </Demo>
    </Page>
  )
}
