import { Space, Tag } from 'sard'

export default () => {
  return (
    <Space direction="horizontal">
      <Tag theme="primary" size="small">
        标签
      </Tag>
      <Tag theme="primary">标签</Tag>
      <Tag theme="primary" size="large">
        标签
      </Tag>
    </Space>
  )
}
