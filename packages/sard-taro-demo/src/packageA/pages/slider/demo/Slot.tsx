import { View } from '@tarojs/components'
import { Slider, Space } from 'sard-taro'

export default () => {
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '20px',
    borderRadius: '4px',
    color: '#fff',
  }
  const startStyle = {
    ...buttonStyle,
    backgroundColor: 'orange',
  }
  const endStyle = {
    ...buttonStyle,
    backgroundColor: 'fuchsia',
  }
  const startButton = (value) => <View style={startStyle}>{value}</View>
  const endButton = (value) => <View style={endStyle}>{value}</View>

  return (
    <Space vertical>
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
