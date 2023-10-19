import { Col, Row, Space } from 'sard'

import GridBox from '../GridBox'

export default () => {
  return (
    <Space gap="large">
      <Row justify="start">
        <Col span={3}>
          <GridBox>span-3</GridBox>
        </Col>
        <Col span={3}>
          <GridBox>span-3</GridBox>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={3}>
          <GridBox>span-3</GridBox>
        </Col>
        <Col span={3}>
          <GridBox>span-3</GridBox>
        </Col>
      </Row>

      <Row justify="end">
        <Col span={3}>
          <GridBox>span-3</GridBox>
        </Col>
        <Col span={3}>
          <GridBox>span-3</GridBox>
        </Col>
      </Row>
    </Space>
  )
}
