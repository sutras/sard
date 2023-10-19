import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Title from './demo/Title'
import Avatar from './demo/Avatar'
import RoundAvatar from './demo/RoundAvatar'
import RoundTitle from './demo/RoundTitle'
import Animated from './demo/Animated'
import Contain from './demo/Contain'
import Custom from './demo/Custom'

export default () => {
  return (
    <Page emphasis>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="显示标题">
        <Title />
      </Demo>

      <Demo title="显示头像">
        <Avatar />
      </Demo>

      <Demo title="圆形头像">
        <RoundAvatar />
      </Demo>

      <Demo title="圆角标题和段落">
        <RoundTitle />
      </Demo>

      <Demo title="动画效果">
        <Animated />
      </Demo>

      <Demo title="包含子组件">
        <Contain />
      </Demo>

      <Demo title="自定义">
        <Custom />
      </Demo>
    </Page>
  )
}
