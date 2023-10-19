import { View } from '@tarojs/components'
import { Slider, Space } from 'sard'

export default () => {
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 24,
    borderRadius: 4,
    color: '#fff',
    backgroundColor: 'tomato',
  }

  const startButton = (value) => <View style={buttonStyle}>{value}</View>
  const endButton = (value) => <View style={buttonStyle}>{value}</View>

  return (
    <Space>
      <Slider defaultValue={50} thumb={endButton} />
      <Slider
        range
        defaultValue={[20, 80]}
        startThumb={startButton}
        endThumb={endButton}
      />
    </Space>
  )
}
