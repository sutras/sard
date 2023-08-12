import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'

export default () => {
  return (
    <Page className="page-popup">
      <Demo title="基础使用" full>
        <Basic />
      </Demo>
    </Page>
  )
}
