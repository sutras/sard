import { Slider, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Slider
        defaultValue={50}
        pieceColor="orange"
        trackColor="fuchsia"
        thumbColor="pink"
      />

      <Slider
        range
        defaultValue={[20, 80]}
        pieceColor="orange"
        trackColor="fuchsia"
        thumbColor="pink"
      />
    </Space>
  )
}
