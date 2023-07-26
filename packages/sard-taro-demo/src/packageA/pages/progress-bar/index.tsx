import Demo from '@/components/demo'
import Page from '@/components/page'
import { ProgressBar } from 'sard-taro'

import './index.scss'

export default () => {
  return (
    <Page className="page-progress-bar">
      <Demo title="基础使用">
        <ProgressBar percent={50} />
      </Demo>

      <Demo title="粗细">
        <ProgressBar percent={50} thickness="20px" />
      </Demo>

      <Demo title="颜色">
        <ProgressBar percent={50} trackColor="fuchsia" color="orange" />
      </Demo>

      <Demo title="条纹进度条">
        <ProgressBar
          percent={50}
          striped
          thickness="10px"
          style={{ marginBottom: 10 }}
        />
        <ProgressBar percent={50} striped thickness="10px" animated />
      </Demo>

      <Demo title="插槽">
        <ProgressBar percent={50} thickness="16px">
          50%
        </ProgressBar>
      </Demo>
    </Page>
  )
}
