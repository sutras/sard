import Demo from '@/components/demo'
import Page from '@/components/page'
import { Button, Empty } from 'sard-taro'

import './index.scss'
import empty from '@/static/empty.svg'

export default () => {
  return (
    <Page className="page-template">
      <Demo title="基础使用">
        <Empty />
      </Demo>

      <Demo title="自定义描述信息">
        <Empty description="自定义描述内容" />
      </Demo>

      <Demo title="自定义图标大小">
        <Empty iconProps={{ size: 32 }} />
      </Demo>

      <Demo title="图片类型图标">
        <Empty iconProps={{ name: empty }} />
      </Demo>

      <Demo title="额外内容">
        <Empty>
          <Button>重新请求</Button>
        </Empty>
      </Demo>
    </Page>
  )
}
