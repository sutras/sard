import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Imperative from './demo/Imperative'
import Type from './demo/Type'
import Color from './demo/Color'
import Duration from './demo/Duration'
import Placement from './demo/Placement'

export default () => {
  return (
    <Page className="page-notify">
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="命令式" full>
        <Imperative />
      </Demo>

      <Demo title="类型" full>
        <Type />
      </Demo>

      <Demo title="自定义颜色" full>
        <Color />
      </Demo>

      <Demo title="自定义时长" full>
        <Duration />
      </Demo>

      <Demo title="自定义位置" full>
        <Placement />
      </Demo>
    </Page>
  )
}
