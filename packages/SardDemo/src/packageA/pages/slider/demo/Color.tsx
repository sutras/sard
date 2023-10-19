import { Slider, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Slider defaultValue={50} pieceColor="tomato" thumbColor="tomato" />

      <Slider
        range
        defaultValue={[20, 80]}
        pieceColor="tomato"
        thumbColor="tomato"
      />
    </Space>
  )
}
