import { Radio } from 'sard-taro'

export default () => {
  return (
    <Radio.Group defaultValue="option1" disabled>
      <Radio value="option1">选项1</Radio>
      <Radio value="option2">选项2</Radio>
    </Radio.Group>
  )
}
