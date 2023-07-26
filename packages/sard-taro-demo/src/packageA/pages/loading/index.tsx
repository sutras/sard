import Demo from '@/components/demo'
import Page from '@/components/page'
import { Loading } from 'sard-taro'

import './index.scss'

export default () => {
  return (
    <Page className="page-loading">
      <Demo title="加载类型">
        <Loading />
        <Loading type="clock" />
      </Demo>

      <Demo title="加载尺寸">
        <Loading size="24px" />
        <Loading size="24px" type="clock" />
      </Demo>

      <Demo title="加载文案">
        <Loading>加载中...</Loading>
      </Demo>

      <Demo title="垂直排布">
        <Loading vertical>加载中...</Loading>
      </Demo>

      <Demo title="自定义颜色">
        <Loading
          color="var(--sar-primary)"
          textColor="var(--sar-primary)"
          text="加载中"
        />
        <Loading
          color="var(--sar-primary)"
          textColor="var(--sar-primary)"
          text="加载中"
          type="clock"
        />
      </Demo>
    </Page>
  )
}
