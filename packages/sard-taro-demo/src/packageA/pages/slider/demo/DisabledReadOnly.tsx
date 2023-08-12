import { Slider, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Slider defaultValue={50} disabled />

      <Slider defaultValue={50} readOnly />
    </Space>
  )
}
