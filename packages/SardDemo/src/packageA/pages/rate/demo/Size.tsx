import { Rate, Space } from 'sard'

export default () => {
  return (
    <Space gap="large">
      <Rate defaultValue={3} size={30} />

      <Rate defaultValue={3} size={30} gap={20} />
    </Space>
  )
}
