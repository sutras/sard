import { View } from '@tarojs/components'
import { Skeleton, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <View
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}
      >
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <View
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Skeleton.Avatar size={48} animated />
              <Skeleton.Block animated />
            </View>
          ))}
      </View>
      <View style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Skeleton.Block style={{ width: 100, height: 80 }} animated />
        <View style={{ flex: 1 }}>
          <Skeleton.Paragraph rows={2} animated />
          <Skeleton.Block
            style={{ width: 60, height: 30, marginLeft: 'auto' }}
            animated
          />
        </View>
      </View>
    </Space>
  )
}
