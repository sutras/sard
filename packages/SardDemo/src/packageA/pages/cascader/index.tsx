import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Async from './demo/Async'
import OptionTop from './demo/OptionTop'
import Disabled from './demo/Disabled'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="异步加载">
        <Async />
      </Demo>

      <Demo title="自定义面板上方内容">
        <OptionTop />
      </Demo>

      <Demo title="禁选选项">
        <Disabled />
      </Demo>
    </Page>
  )
}
