import { Search, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Search placeholder="禁用" disabled />

      <Search placeholder="只读" readOnly />
    </Space>
  )
}
