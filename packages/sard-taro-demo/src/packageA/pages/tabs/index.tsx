import Demo from '@/components/demo'
import Page from '@/components/page'
import { Toast } from 'sard-taro'

import './index.scss'

import Basic from './demo/Basic'
import Scrollable from './demo/Scrollable'
import Disabled from './demo/Disabled'
import Controllable from './demo/Controllable'
import Swiper from './demo/Swiper'
import CustomTab from './demo/CustomTab'
import Line from './demo/Line'

export default () => {
  return (
    <Page className="page-tabs">
      <Toast.Agent />

      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="可滚动标签栏">
        <Scrollable />
      </Demo>

      <Demo title="禁用标签">
        <Disabled />
      </Demo>

      <Demo title="受控的标签">
        <Controllable />
      </Demo>

      <Demo title="自定义线条">
        <Line />
      </Demo>

      <Demo title="自定义标签">
        <CustomTab />
      </Demo>

      <Demo title="搭配 Swiper 使用">
        <Swiper />
      </Demo>
    </Page>
  )
}
