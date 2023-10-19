import Demo from '@/components/demo'
import Page from '@/components/page'

import Dynamic from './demo/Dynamic'

export default () => {
  return (
    <Page>
      <Demo title="动态修改语言">
        <Dynamic />
      </Demo>
    </Page>
  )
}
