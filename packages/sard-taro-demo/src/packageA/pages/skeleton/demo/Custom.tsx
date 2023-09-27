import { View } from '@tarojs/components'
import { Col, Row, Skeleton, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="large">
      <Row gap={20}>
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Col key={i} span={3}>
              <Space>
                <Skeleton.Avatar size={48} animated />
                <Skeleton.Block animated />
              </Space>
            </Col>
          ))}
      </Row>

      <Space direction="horizontal">
        <Skeleton.Block style={{ width: 100, height: 80 }} animated />
        <View style={{ flex: 1 }}>
          <Skeleton.Paragraph rows={2} animated />
          <Skeleton.Block
            style={{ width: 60, height: 30, marginLeft: 'auto' }}
            animated
          />
        </View>
      </Space>
    </Space>
  )
}
