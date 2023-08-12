import { Space, Tag } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Tag style={{ background: '#ffeed0', color: 'orange' }}>标签</Tag>
      <Tag plain style={{ color: 'orange' }}>
        标签
      </Tag>
    </Space>
  )
}
