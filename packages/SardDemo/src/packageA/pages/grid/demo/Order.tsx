import { Col, Row, Space } from 'sard'

import GridBox from '../GridBox'

export default () => {
  return (
    <Space gap="large">
      <Row>
        <Col>
          <GridBox>col1</GridBox>
        </Col>
        <Col order={-1}>
          <GridBox>col2 order:-1</GridBox>
        </Col>
      </Row>

      <Row>
        <Col order={2}>
          <GridBox>col1 order:2</GridBox>
        </Col>
        <Col order={1}>
          <GridBox>col2 order:1</GridBox>
        </Col>
        <Col>
          <GridBox>col3</GridBox>
        </Col>
      </Row>
    </Space>
  )
}
