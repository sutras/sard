import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'
import { Button, Icon, Result } from 'sard-taro'

export default () => {
  return (
    <Page className="page-result">
      <Demo title="基础使用">
        <Result
          status="success"
          title="成功"
          description="请根据提示进行操作"
        />
        <Result status="info" title="信息" description="请根据提示进行操作" />
        <Result
          status="warning"
          title="警告"
          description="请根据提示进行操作"
        />
        <Result status="error" title="错误" description="请根据提示进行操作" />
        <Result
          status="question"
          title="疑惑"
          description="请根据提示进行操作"
        />
      </Demo>

      <Demo title="额外内容">
        <Result status="success" title="成功" description="请根据提示进行操作">
          <Button>返回首页</Button>
        </Result>
      </Demo>

      <Demo title="自定义图标">
        <Result
          icon={
            <Icon
              prefix="demo-icon"
              name="emoji-smile"
              color="var(--sar-tertiary-color)"
            ></Icon>
          }
          title="笑一笑"
          description="请根据提示进行操作"
        ></Result>
      </Demo>
    </Page>
  )
}
