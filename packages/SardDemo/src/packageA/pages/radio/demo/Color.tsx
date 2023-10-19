import { Radio, Space } from 'sard'

export default () => {
  return (
    <Radio.Group defaultValue="option1" checkedColor="tomato">
      <Space gap="medium">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </Space>
    </Radio.Group>
  )
}
