import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Extra from './demo/Extra'
import OnlyBody from './demo/OnlyBody'
import Footer from './demo/Footer'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="额外内容">
        <Extra />
      </Demo>

      <Demo title="只有主体">
        <OnlyBody />
      </Demo>

      <Demo title="底部">
        <Footer />
      </Demo>
    </Page>
  )
}
