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
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="多行">
        <MultipleRow />
      </Demo>

      <Demo title="标题和描述">
        <TitleDescription />
      </Demo>

      <Demo title="图片类型图标">
        <Picture />
      </Demo>

      <Demo title="禁用">
        <Disabled />
      </Demo>

      <Demo title="手动声明项目组件">
        <Manual />
      </Demo>
    </Page>
  )
}
