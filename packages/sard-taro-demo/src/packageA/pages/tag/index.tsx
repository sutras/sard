import Demo from '@/components/demo'
import Page from '@/components/page'
import { Tag } from 'sard-taro'

import './index.scss'

export default () => {
  return (
    <Page className="page-tag">
      <Demo title="基础使用">
        <Tag>标签</Tag>
      </Demo>

      <Demo title="主题色">
        <Tag theme="primary">primary</Tag>
        <Tag theme="secondary">secondary</Tag>
        <Tag theme="success">success</Tag>
        <Tag theme="info">info</Tag>
        <Tag theme="warning">warning</Tag>
        <Tag theme="danger">danger</Tag>
      </Demo>

      <Demo title="镂空">
        <Tag plain theme="primary">
          primary
        </Tag>
        <Tag plain theme="secondary">
          secondary
        </Tag>
        <Tag plain theme="success">
          success
        </Tag>
        <Tag plain theme="info">
          info
        </Tag>
        <Tag plain theme="warning">
          warning
        </Tag>
        <Tag plain theme="danger">
          danger
        </Tag>
      </Demo>

      <Demo title="圆角">
        <Tag round>标签</Tag>
      </Demo>

      <Demo title="标记样式（半圆角）">
        <Tag mark>标签</Tag>
      </Demo>

      <Demo title="尺寸">
        <Tag size="small">标签</Tag>
        <Tag>标签</Tag>
        <Tag size="large">标签</Tag>
      </Demo>

      <Demo title="自定义样式">
        <Tag style={{ background: '#ffeed0', color: 'orange' }}>标签</Tag>
        <Tag plain style={{ color: 'orange' }}>
          标签
        </Tag>
      </Demo>

      <Demo title="可关闭的">
        <Tag closable onClose={() => console.log('close')}>
          标签
        </Tag>
      </Demo>
    </Page>
  )
}
