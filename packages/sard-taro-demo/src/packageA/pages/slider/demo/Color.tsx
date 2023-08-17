import { Slider, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Slider
        defaultValue={50}
        pieceColor="var(--sar-pink)"
        thumbColor="var(--sar-pink)"
      />

      <Slider
        range
        defaultValue={[20, 80]}
        pieceColor="var(--sar-pink)"
        thumbColor="var(--sar-pink)"
      />
    </Space>
  )
}
