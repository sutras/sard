import { Radio, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical gap="large">
      <Radio.Group defaultValue="option1" type="circle">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </Radio.Group>

      <Radio.Group defaultValue="option1" type="square">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </Radio.Group>
    </Space>
  )
}
