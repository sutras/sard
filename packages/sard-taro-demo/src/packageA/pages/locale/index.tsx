import Demo from '@/components/demo'
import Page from '@/components/page'

import Dynamic from './demo/Dynamic'

export default () => {
  return (
    <Page className="page-locale">
      <Demo title="动态修改语言" full>
        <Dynamic />
      </Demo>
    </Page>
  )
}
