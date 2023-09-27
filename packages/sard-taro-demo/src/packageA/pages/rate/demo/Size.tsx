import { Rate, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="large">
      <Rate defaultValue={3} size={30} />

      <Rate defaultValue={3} size={30} gap={20} />
    </Space>
  )
}
