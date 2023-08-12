import { View } from '@tarojs/components'
import { Col, Row } from 'sard-taro'

import '../index.scss'

export default () => {
  return (
    <Row>
      <Col>
        <View className="demo-box">span</View>
      </Col>
      <Col offset={3}>
        <View className="demo-box">offset-3</View>
      </Col>
    </Row>
  )
}
