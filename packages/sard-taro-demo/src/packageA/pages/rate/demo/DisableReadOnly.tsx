import { Rate, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="large">
      <Rate defaultValue={3} readOnly />
      <Rate defaultValue={3} disabled />
    </Space>
  )
}
