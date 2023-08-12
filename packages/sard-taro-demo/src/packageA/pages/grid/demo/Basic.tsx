import { View } from '@tarojs/components'
import { Col, Row, Space } from 'sard-taro'

import '../index.scss'

export default () => {
  return (
    <Space vertical gap="large">
      <Row>
        <Col>
          <View className="demo-box">span</View>
        </Col>
        <Col>
          <View className="demo-box">span</View>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <View className="demo-box">span-4</View>
        </Col>
        <Col span={8}>
          <View className="demo-box">span-8</View>
        </Col>
      </Row>

      <Row>
        <Col span={3}>
          <View className="demo-box">span-3</View>
        </Col>
        <Col>
          <View className="demo-box">span</View>
        </Col>
        <Col span="auto">
          <View className="demo-box">auto</View>
        </Col>
      </Row>
    </Space>
  )
}
