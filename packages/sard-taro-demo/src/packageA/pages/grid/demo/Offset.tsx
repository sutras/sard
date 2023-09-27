import { Col, Row } from 'sard-taro'

import GridBox from '../GridBox'

export default () => {
  return (
    <Row>
      <Col>
        <GridBox>span</GridBox>
      </Col>
      <Col offset={3}>
        <GridBox>offset-3</GridBox>
      </Col>
    </Row>
  )
}
