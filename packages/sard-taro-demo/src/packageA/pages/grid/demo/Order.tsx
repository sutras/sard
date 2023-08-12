import { View } from '@tarojs/components'
import { Col, Row, Space } from 'sard-taro'

import '../index.scss'

export default () => {
  return (
    <Space vertical gap="large">
      <Row>
        <Col>
          <View className="demo-box">col1</View>
        </Col>
        <Col order={-1}>
          <View className="demo-box">col2 order:-1</View>
        </Col>
      </Row>

      <Row>
        <Col order={2}>
          <View className="demo-box">col1 order:2</View>
        </Col>
        <Col order={1}>
          <View className="demo-box">col2 order:1</View>
        </Col>
        <Col>
          <View className="demo-box">col3</View>
        </Col>
      </Row>
    </Space>
  )
}
