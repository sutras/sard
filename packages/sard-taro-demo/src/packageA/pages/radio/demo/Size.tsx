import { Radio, Space } from 'sard-taro'

export default () => {
  return (
    <Radio.Group defaultValue="option1" size={28}>
      <Space gap="medium">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </Space>
    </Radio.Group>
  )
}
