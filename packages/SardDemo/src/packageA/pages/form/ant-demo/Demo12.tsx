import { View } from '@tarojs/components'
import { Button, Col, FooterBar, Form, Input, Row, Toast } from 'sard'

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      onSuccess={handleSuccess}
      onFail={handleFail}
      labelWidth={80}
    >
      <Form.Field label="Username" required>
        <Row gap={10}>
          <Col>
            <Form.Field
              name="username"
              inlaid
              rules={[{ required: true, message: 'Username is required' }]}
            >
              <Input inlaid placeholder="Please input" />
            </Form.Field>
          </Col>
          <Col>
            <View style={{ color: 'tomato' }}>Need Help?</View>
          </Col>
        </Row>
      </Form.Field>

      <Form.Field label="Address" required>
        <Form.Map name="address">
          <Row gap={10}>
            <Col>
              <Form.Field
                name="province"
                inlaid
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Input inlaid placeholder="Input province" />
              </Form.Field>
            </Col>
            <Col>
              <Form.Field
                name="street"
                inlaid
                rules={[{ required: true, message: 'Street is required' }]}
              >
                <Input inlaid placeholder="Input street" />
              </Form.Field>
            </Col>
          </Row>
        </Form.Map>
      </Form.Field>

      <Form.Field label="BirthDate" required>
        <Row gap={10}>
          <Col>
            <Form.Field name="year" inlaid rules={[{ required: true }]}>
              <Input inlaid placeholder="Input birth year" />
            </Form.Field>
          </Col>
          <Col>
            <Form.Field name="month" inlaid rules={[{ required: true }]}>
              <Input inlaid placeholder="Input birth month" />
            </Form.Field>
          </Col>
        </Row>
      </Form.Field>

      <FooterBar showLine={false}>
        <Button style={{ flexGrow: 1 }} formType="submit">
          Submit
        </Button>
      </FooterBar>
    </Form>
  )
}

App.title = '复杂一点的控件'

export default App
