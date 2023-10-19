import { Col, Row, Space } from 'sard'

import GridBox from '../GridBox'

export default () => {
  return (
    <Space gap="large">
      <Row>
        <Col>
          <GridBox>span</GridBox>
        </Col>
        <Col>
          <GridBox>span</GridBox>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <GridBox>span-4</GridBox>
        </Col>
        <Col span={8}>
          <GridBox>span-8</GridBox>
        </Col>
      </Row>

      <Row>
        <Col span={3}>
          <GridBox>span-3</GridBox>
        </Col>
        <Col>
          <GridBox>span</GridBox>
        </Col>
        <Col span="auto">
          <GridBox>auto</GridBox>
        </Col>
      </Row>
    </Space>
  )
}
