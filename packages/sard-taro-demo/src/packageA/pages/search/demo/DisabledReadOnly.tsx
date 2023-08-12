import { Search, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Search placeholder="请输入关键词" disabled />

      <Search placeholder="请输入关键词" readOnly />
    </Space>
  )
}
