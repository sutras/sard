import { Slider, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Slider defaultValue={50} readOnly />
      <Slider defaultValue={50} disabled />
    </Space>
  )
}
