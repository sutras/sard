import { Space, Stepper } from 'sard-taro'

export default () => {
  return (
    <Space vertical align="start">
      <Stepper placeholder="数量" defaultValue={5} disabled />

      <Stepper placeholder="数量" defaultValue={5} readOnly />
    </Space>
  )
}
