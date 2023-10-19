import { Space, Tag } from 'sard'

export default () => {
  return (
    <Space direction="horizontal">
      <Tag color="tomato">标签</Tag>
      <Tag color="#ededed" textColor="tomato">
        标签
      </Tag>

      <Tag plain color="tomato">
        标签
      </Tag>
    </Space>
  )
}
