import { View } from '@tarojs/components'
import { Col, Row, Space } from 'sard-taro'

import '../index.scss'

export default () => {
  return (
    <Space vertical gap="large">
      <Row justify="start">
        <Col span={3}>
          <View className="demo-box">span-3</View>
        </Col>
        <Col span={3}>
          <View className="demo-box">span-3</View>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={3}>
          <View className="demo-box">span-3</View>
        </Col>
        <Col span={3}>
          <View className="demo-box">span-3</View>
        </Col>
      </Row>

      <Row justify="end">
        <Col span={3}>
          <View className="demo-box">span-3</View>
        </Col>
        <Col span={3}>
          <View className="demo-box">span-3</View>
        </Col>
      </Row>
    </Space>
  )
}
