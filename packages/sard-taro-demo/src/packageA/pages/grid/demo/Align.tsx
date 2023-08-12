import { View } from '@tarojs/components'
import { Col, Row, Space } from 'sard-taro'

import '../index.scss'

export default () => {
  return (
    <Space vertical gap="large">
      <Row align="start">
        <Col>
          <View className="demo-box">span-3</View>
        </Col>
        <Col>
          <View className="demo-box demo-box-higher">span-3</View>
        </Col>
      </Row>

      <Row align="center">
        <Col>
          <View className="demo-box">span-3</View>
        </Col>
        <Col>
          <View className="demo-box  demo-box-higher">span-3</View>
        </Col>
      </Row>

      <Row align="end">
        <Col>
          <View className="demo-box">span-3</View>
        </Col>
        <Col>
          <View className="demo-box  demo-box-higher">span-3</View>
        </Col>
      </Row>
    </Space>
  )
}
