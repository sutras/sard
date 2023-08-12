import Demo from '@/components/demo'
import Page from '@/components/page'
import { Toast } from 'sard-taro'

import Basic from './demo/Basic'
import WithPopout from './demo/WithPopout'
import Async from './demo/Async'
import OptionTop from './demo/OptionTop'
import Disabled from './demo/Disabled'

export default () => {
  return (
    <Page className="page-cascader">
      <Toast.Agent />

      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="配合弹出框使用" full>
        <WithPopout />
      </Demo>

      <Demo title="异步加载" full>
        <Async />
      </Demo>

      <Demo title="自定义选项上方内容" full>
        <OptionTop />
      </Demo>

      <Demo title="禁选选项" full>
        <Disabled />
      </Demo>
    </Page>
  )
}
