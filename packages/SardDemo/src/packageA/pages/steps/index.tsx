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
import Color from './demo/Color'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="居中">
        <Center />
      </Demo>

      <Demo title="垂直步骤条">
        <Vertical />
      </Demo>

      <Demo title="垂直居中">
        <VerticalCenter />
      </Demo>

      <Demo title="自定义图标">
        <Icon />
      </Demo>

      <Demo title="自定义颜色">
        <Color />
      </Demo>

      <Demo title="当前步骤状态">
        <Status />
      </Demo>

      <Demo title="错误步骤">
        <ErrorStatus />
      </Demo>

      <Demo title="自定义各步骤状态">
        <StepStatus />
      </Demo>

      <Demo title="可点击的">
        <Clickable />
      </Demo>

      <Demo title="禁用">
        <Disabled />
      </Demo>
    </Page>
  )
}
