import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Max from './demo/Max'
import ShowZero from './demo/ShowZero'
import Dot from './demo/Dot'
import Color from './demo/Color'
import OnlyBadge from './demo/OnlyBadge'
import Custom from './demo/Custom'
import UnWrap from './demo/UnWrap'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="最大值">
        <Max />
      </Demo>

      <Demo title="值为0时不隐藏">
        <ShowZero />
      </Demo>

      <Demo title="圆点显示">
        <Dot />
      </Demo>

      <Demo title="自定义颜色">
        <Color />
      </Demo>

      <Demo title="独立展示">
        <OnlyBadge />
      </Demo>

      <Demo title="自定义内容">
        <Custom />
      </Demo>

      <Demo title="不包裹组件">
        <UnWrap />
      </Demo>
    </Page>
  )
}
