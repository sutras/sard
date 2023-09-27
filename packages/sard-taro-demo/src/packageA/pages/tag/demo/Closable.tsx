import { Space, Tag } from 'sard-taro'

export default () => {
  return (
    <Space direction="horizontal">
      <Tag theme="primary" closable onClose={() => console.log('close')}>
        标签
      </Tag>
    </Space>
  )
}
