import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Format from './demo/Format'
import Interval from './demo/Interval'
import Style from './demo/Style'
import Control from './demo/Control'

export default () => {
  return (
    <Page className="page-count-down">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="自定义格式">
        <Format />
      </Demo>

      <Demo title="毫秒级别的渲染">
        <Interval />
      </Demo>

      <Demo title="自定义样式">
        <Style />
      </Demo>

      <Demo title="手动控制">
        <Control />
      </Demo>
    </Page>
  )
}
