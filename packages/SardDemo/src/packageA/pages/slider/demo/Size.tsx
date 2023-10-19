import { Slider, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Slider defaultValue={50} thumbSize={15} trackSize={5} />

      <Slider range defaultValue={[20, 80]} thumbSize={15} trackSize={5} />
    </Space>
  )
}
