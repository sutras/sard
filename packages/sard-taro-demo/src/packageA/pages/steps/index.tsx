import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Center from './demo/Center'
import Vertical from './demo/Vertical'
import VerticalCenter from './demo/VerticalCenter'
import Icon from './demo/Icon'
import Status from './demo/Status'
import ErrorStatus from './demo/ErrorStatus'
import StepStatus from './demo/StepStatus'
import Clickable from './demo/Clickable'
import Disabled from './demo/Disabled'

export default () => {
  return (
    <Page className="page-steps">
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="居中" full>
        <Center />
      </Demo>

      <Demo title="垂直步骤条" full>
        <Vertical />
      </Demo>

      <Demo title="垂直居中" full>
        <VerticalCenter />
      </Demo>

      <Demo title="自定义图标" full>
        <Icon />
      </Demo>

      <Demo title="当前步骤状态" full>
        <Status />
      </Demo>

      <Demo title="错误步骤" full>
        <ErrorStatus />
      </Demo>

      <Demo title="自定义各步骤状态" full>
        <StepStatus />
      </Demo>

      <Demo title="可点击的" full>
        <Clickable />
      </Demo>

      <Demo title="禁用" full>
        <Disabled />
      </Demo>
    </Page>
  )
}
