import { Input, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Input showCount maxLength={20} clearable />
      <Input type="textarea" showCount maxLength={100} clearable />
    </Space>
  )
}
