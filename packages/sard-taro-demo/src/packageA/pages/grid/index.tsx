import { View } from '@tarojs/components'
import Demo from '@/components/demo'
import Page from '@/components/page'
import { Col, Row } from 'sard-taro'
import './index.scss'

export default () => {
  return (
    <Page className="page-grid">
      <Demo title="基础使用">
        <Row>
          <Col>
            <View className="grid-box">span</View>
          </Col>
          <Col>
            <View className="grid-box">span</View>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <View className="grid-box">span-4</View>
          </Col>
          <Col span={8}>
            <View className="grid-box">span-8</View>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <View className="grid-box">span-3</View>
          </Col>
          <Col>
            <View className="grid-box">span</View>
          </Col>
          <Col span="auto">
            <View className="grid-box">auto</View>
          </Col>
        </Row>
      </Demo>

      <Demo title="列偏移">
        <Row>
          <Col>
            <View className="grid-box">span</View>
          </Col>
          <Col offset={3}>
            <View className="grid-box">offset-3</View>
          </Col>
        </Row>
      </Demo>

      <Demo title="水平对齐">
        <Row justify="start">
          <Col span={3}>
            <View className="grid-box">span-3</View>
          </Col>
          <Col span={3}>
            <View className="grid-box">span-3</View>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={3}>
            <View className="grid-box">span-3</View>
          </Col>
          <Col span={3}>
            <View className="grid-box">span-3</View>
          </Col>
        </Row>
        <Row justify="end">
          <Col span={3}>
            <View className="grid-box">span-3</View>
          </Col>
          <Col span={3}>
            <View className="grid-box">span-3</View>
          </Col>
        </Row>
      </Demo>

      <Demo title="垂直对齐">
        <View className="grid-align">
          <Row align="start">
            <Col>
              <View className="grid-box">span-3</View>
            </Col>
            <Col>
              <View className="grid-box">span-3</View>
            </Col>
          </Row>
          <Row align="center">
            <Col>
              <View className="grid-box">span-3</View>
            </Col>
            <Col>
              <View className="grid-box">span-3</View>
            </Col>
          </Row>
          <Row align="end">
            <Col>
              <View className="grid-box">span-3</View>
            </Col>
            <Col>
              <View className="grid-box">span-3</View>
            </Col>
          </Row>
        </View>
      </Demo>

      <Demo title="列间距">
        <Row gutter={30}>
          <Col>
            <View className="grid-box">span-3</View>
          </Col>
          <Col>
            <View className="grid-box">span-3</View>
          </Col>
        </Row>
      </Demo>

      <Demo title="列顺序">
        <Row>
          <Col>
            <View className="grid-box">col1</View>
          </Col>
          <Col order={-1}>
            <View className="grid-box">col2 order:-1</View>
          </Col>
        </Row>
        <Row>
          <Col order={2}>
            <View className="grid-box">col1 order:2</View>
          </Col>
          <Col order={1}>
            <View className="grid-box">col2 order:1</View>
          </Col>
          <Col>
            <View className="grid-box">col3</View>
          </Col>
        </Row>
      </Demo>
    </Page>
  )
}
