import { Col, Row } from 'sard-taro'

import GridBox from '../GridBox'

export default () => {
  return (
    <Row gap={30}>
      <Col>
        <GridBox>span-3</GridBox>
      </Col>
      <Col>
        <GridBox>span-3</GridBox>
      </Col>
    </Row>
  )
}
