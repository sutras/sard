import Demo from '@/components/demo'
import Page from '@/components/page'

import { Toast } from 'sard-taro'
import Basic from './demo/Basic'
import Manual from './demo/Manual'
import Cancel from './demo/Cancel'
import Status from './demo/Status'
import TitleDesc from './demo/TitleDesc'

export default () => {
  return (
    <Page className="page-action-sheet">
      <Toast.Agent />

      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="手动声明项目组件" full>
        <Manual />
      </Demo>

      <Demo title="取消按钮" full>
        <Cancel />
      </Demo>

      <Demo title="状态" full>
        <Status />
      </Demo>

      <Demo title="标题&描述" full>
        <TitleDesc />
      </Demo>
    </Page>
  )
}
