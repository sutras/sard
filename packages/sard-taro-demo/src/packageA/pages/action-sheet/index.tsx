import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import NoAgent from './demo/NoAgent'
import Explicit from './demo/Explicit'
import Cancel from './demo/Cancel'
import Status from './demo/Status'
import Description from './demo/Description'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="不使用代理" full>
        <NoAgent />
      </Demo>

      <Demo title="显式声明动作项组件" full>
        <Explicit />
      </Demo>

      <Demo title="取消按钮" full>
        <Cancel />
      </Demo>

      <Demo title="自定义操作状态" full>
        <Status />
      </Demo>

      <Demo title="描述" full>
        <Description />
      </Demo>
    </Page>
  )
}
