import { Input, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Input showCount maxLength={20} clearable placeholder="请输入" />
      <Input
        type="textarea"
        showCount
        maxLength={100}
        clearable
        placeholder="请输入"
      />
    </Space>
  )
}
