import { Input, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Input placeholder="禁用的" disabled />
      <Input placeholder="只读的" readOnly />
    </Space>
  )
}
