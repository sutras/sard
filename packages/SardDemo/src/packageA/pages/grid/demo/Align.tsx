import { Col, Row, Space } from 'sard'

import GridBox from '../GridBox'

export default () => {
  return (
    <Space gap="large">
      <Row align="start">
        <Col>
          <GridBox>span</GridBox>
        </Col>
        <Col>
          <GridBox higher>span</GridBox>
        </Col>
      </Row>

      <Row align="center">
        <Col>
          <GridBox>span</GridBox>
        </Col>
        <Col>
          <GridBox higher>span</GridBox>
        </Col>
      </Row>

      <Row align="end">
        <Col>
          <GridBox>span</GridBox>
        </Col>
        <Col>
          <GridBox higher>span</GridBox>
        </Col>
      </Row>
    </Space>
  )
}
