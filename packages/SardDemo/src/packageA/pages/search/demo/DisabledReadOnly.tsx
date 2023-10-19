import { Search, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Search placeholder="只读" readOnly />
      <Search placeholder="禁用" disabled />
    </Space>
  )
}
