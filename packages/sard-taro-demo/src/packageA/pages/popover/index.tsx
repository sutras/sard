import Demo from '@/components/demo'
import Page from '@/components/page'
import { Toast } from 'sard-taro'

import Dark from './demo/Dark'
import Basic from './demo/Basic'
import Icon from './demo/Icon'
import Disabled from './demo/Disabled'
import Horizontal from './demo/Horizontal'
import Custom from './demo/Custom'
import Placement from './demo/Placement'

export default () => {
  return (
    <Page className="page-popover">
      <Toast.Agent />

      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="暗黑模式">
        <Dark />
      </Demo>

      <Demo title="展示图标">
        <Icon />
      </Demo>

      <Demo title="禁用选项">
        <Disabled />
      </Demo>

      <Demo title="水平排列">
        <Horizontal />
      </Demo>

      <Demo title="自定义内容">
        <Custom />
      </Demo>

      <Demo title="弹出位置">
        <Placement />
      </Demo>
    </Page>
  )
}
