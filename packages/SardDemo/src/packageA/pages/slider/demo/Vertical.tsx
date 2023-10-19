import { Slider, Space } from 'sard'

export default () => {
  return (
    <Space direction="horizontal" style={{ height: 200 }} gap="large">
      <Slider defaultValue={50} vertical />
      <Slider range defaultValue={[20, 80]} vertical />
    </Space>
  )
}
