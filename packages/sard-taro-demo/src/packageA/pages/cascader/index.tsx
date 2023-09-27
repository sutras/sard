import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Async from './demo/Async'
import OptionTop from './demo/OptionTop'
import Disabled from './demo/Disabled'
import Alone from './demo/Alone'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="异步加载" full>
        <Async />
      </Demo>

      <Demo title="自定义面板上方内容" full>
        <OptionTop />
      </Demo>

      <Demo title="禁选选项" full>
        <Disabled />
      </Demo>

      <Demo title="单独使用" full>
        <Alone />
      </Demo>
    </Page>
  )
}
