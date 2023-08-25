import Demo from '@/components/demo'
import Page from '@/components/page'
import Theme from './demo/Theme'
import Gray from './demo/Gray'
import Rounded from './demo/Rounded'
import FontSize from './demo/FontSize'
import Shadow from './demo/Shadow'
import Mask from './demo/Mask'
import Leading from './demo/Leading'

export default () => {
  return (
    <Page className="page-style">
      <Demo title="主题色">
        <Theme />
      </Demo>

      <Demo title="灰度值">
        <Gray />
      </Demo>

      <Demo title="圆角">
        <Rounded />
      </Demo>

      <Demo title="字号">
        <FontSize />
      </Demo>

      <Demo title="行高">
        <Leading />
      </Demo>

      <Demo title="阴影">
        <Shadow />
      </Demo>

      <Demo title="遮罩">
        <Mask />
      </Demo>
    </Page>
  )
}
