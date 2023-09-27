import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import MultipleRow from './demo/MultipleRow'
import TitleDescription from './demo/TitleDescription'
import Picture from './demo/Picture'
import Disabled from './demo/Disabled'
import Manual from './demo/Manual'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="多行" full>
        <MultipleRow />
      </Demo>

      <Demo title="标题和描述" full>
        <TitleDescription />
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
