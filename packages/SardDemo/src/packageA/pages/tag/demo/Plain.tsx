import { Space, Tag } from 'sard'

export default () => {
  return (
    <Space direction="horizontal" wrap>
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
    </Space>
  )
}
