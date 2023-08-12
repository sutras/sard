import Demo from '@/components/demo'
import Page from '@/components/page'
import { Toast } from 'sard-taro'

import Basic from './demo/Basic'
import MultipleRow from './demo/MultipleRow'
import Description from './demo/Description'
import Picture from './demo/Picture'
import Disabled from './demo/Disabled'
import Manual from './demo/Manual'

export default () => {
  return (
    <Page className="page-share-sheet">
      <Toast.Agent />

      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="多行" full>
        <MultipleRow />
      </Demo>

      <Demo title="描述" full>
        <Description />
      </Demo>

      <Demo title="图片类型图标" full>
        <Picture />
      </Demo>

      <Demo title="禁用" full>
        <Disabled />
      </Demo>

      <Demo title="手动声明项目组件" full>
        <Manual />
      </Demo>
    </Page>
  )
}
