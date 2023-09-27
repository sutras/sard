import { Radio, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="large">
      <Radio.Group defaultValue="option1" type="circle">
        <Space gap="medium">
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Space>
      </Radio.Group>

      <Radio.Group defaultValue="option1" type="square">
        <Space gap="medium">
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Space>
      </Radio.Group>
    </Space>
  )
}
