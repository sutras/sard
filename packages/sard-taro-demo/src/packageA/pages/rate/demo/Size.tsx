import { Rate, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical gap="large">
      <Rate defaultValue={3} size={30} />

      <Rate defaultValue={3} size={30} spacing={20} />
    </Space>
  )
}
