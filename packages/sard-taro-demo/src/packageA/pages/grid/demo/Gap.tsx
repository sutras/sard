import { View } from '@tarojs/components'
import { Col, Row } from 'sard-taro'

import '../index.scss'

export default () => {
  return (
    <Row gap={30}>
      <Col>
        <View className="demo-box">span-3</View>
      </Col>
      <Col>
        <View className="demo-box">span-3</View>
      </Col>
    </Row>
  )
}
