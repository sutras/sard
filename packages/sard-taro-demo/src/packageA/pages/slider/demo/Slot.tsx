import { View } from '@tarojs/components'
import { Slider, Space } from 'sard-taro'

export default () => {
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '24px',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor: 'var(--sar-pink)',
  }

  const startButton = (value) => <View style={buttonStyle}>{value}</View>
  const endButton = (value) => <View style={buttonStyle}>{value}</View>

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
