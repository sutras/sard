import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Disabled from './demo/Disabled'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="禁用">
        <Disabled />
      </Demo>
    </Page>
  )
}
