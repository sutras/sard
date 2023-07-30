import { View } from '@tarojs/components'
import Demo from '@/components/demo'
import Page from '@/components/page'
import { Col, Row } from 'sard-taro'
import './index.scss'

export default () => {
  return (
    <Page className="page-grid">
      <Demo title="基础使用">
        <Row className="demo-row">
          <Col>
            <View className="demo-box">span</View>
          </Col>
          <Col>
            <View className="demo-box">span</View>
          </Col>
        </Row>

        <Row className="demo-row">
          <Col span={4}>
            <View className="demo-box">span-4</View>
          </Col>
          <Col span={8}>
            <View className="demo-box">span-8</View>
          </Col>
        </Row>

        <Row className="demo-row">
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
      </Demo>

      <Demo title="列偏移">
        <Row className="demo-row">
          <Col>
            <View className="demo-box">span</View>
          </Col>
          <Col offset={3}>
            <View className="demo-box">offset-3</View>
          </Col>
        </Row>
      </Demo>

      <Demo title="水平对齐">
        <Row justify="start" className="demo-row">
          <Col span={3}>
            <View className="demo-box">span-3</View>
          </Col>
          <Col span={3}>
            <View className="demo-box">span-3</View>
          </Col>
        </Row>

        <Row justify="center" className="demo-row">
          <Col span={3}>
            <View className="demo-box">span-3</View>
          </Col>
          <Col span={3}>
            <View className="demo-box">span-3</View>
          </Col>
        </Row>

        <Row justify="end" className="demo-row">
          <Col span={3}>
            <View className="demo-box">span-3</View>
          </Col>
          <Col span={3}>
            <View className="demo-box">span-3</View>
          </Col>
        </Row>
      </Demo>

      <Demo title="垂直对齐">
        <View className="grid-align">
          <Row align="start" className="demo-row">
            <Col>
              <View className="demo-box">span-3</View>
            </Col>
            <Col>
              <View className="demo-box demo-box-higher">span-3</View>
            </Col>
          </Row>

          <Row align="center" className="demo-row">
            <Col>
              <View className="demo-box">span-3</View>
            </Col>
            <Col>
              <View className="demo-box  demo-box-higher">span-3</View>
            </Col>
          </Row>

          <Row align="end" className="demo-row">
            <Col>
              <View className="demo-box">span-3</View>
            </Col>
            <Col>
              <View className="demo-box  demo-box-higher">span-3</View>
            </Col>
          </Row>
        </View>
      </Demo>

      <Demo title="列间距">
        <Row gap={30} className="demo-row">
          <Col>
            <View className="demo-box">span-3</View>
          </Col>
          <Col>
            <View className="demo-box">span-3</View>
          </Col>
        </Row>
      </Demo>

      <Demo title="列顺序">
        <Row className="demo-row">
          <Col>
            <View className="demo-box">col1</View>
          </Col>
          <Col order={-1}>
            <View className="demo-box">col2 order:-1</View>
          </Col>
        </Row>

        <Row className="demo-row">
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
      </Demo>
    </Page>
  )
}
