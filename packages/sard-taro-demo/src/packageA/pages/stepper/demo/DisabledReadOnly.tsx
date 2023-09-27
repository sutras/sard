import { Space, Stepper } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Stepper placeholder="数量" defaultValue={5} readOnly />
      <Stepper placeholder="数量" defaultValue={5} disabled />
    </Space>
  )
}
