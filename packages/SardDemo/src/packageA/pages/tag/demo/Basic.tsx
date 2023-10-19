import { Space, Tag } from 'sard'

export default () => {
  return (
    <Space direction="horizontal" wrap>
      <Tag theme="primary">primary</Tag>
      <Tag theme="secondary">secondary</Tag>
      <Tag theme="success">success</Tag>
      <Tag theme="info">info</Tag>
      <Tag theme="warning">warning</Tag>
      <Tag theme="danger">danger</Tag>
    </Space>
  )
}
