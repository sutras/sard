import { Button, Col, Form, Icon, Input, Row, Toast } from 'sard-taro'

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
    <Form form={form} onSuccess={handleSuccess} onFail={handleFail}>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Form.Map name={name} key={key}>
                <Form.Field>
                  <Row gap={10} align="start">
                    <Col>
                      <Form.Field
                        name="first"
                        rules={[
                          { required: true, message: 'Missing first name' },
                        ]}
                        inlaid
                      >
                        <Input placeholder="First Name" />
                      </Form.Field>
                    </Col>

                    <Col>
                      <Form.Field
                        name="last"
                        rules={[
                          { required: true, message: 'Missing last name' },
                        ]}
                        inlaid
                      >
                        <Input placeholder="Last Name" />
                      </Form.Field>
                    </Col>

                    <Button type="pale-text">
                      <Icon
                        name="close"
                        size={16}
                        onClick={() => remove(name)}
                      />
                    </Button>
                  </Row>
                </Form.Field>
              </Form.Map>
            ))}
            <Form.Field>
              <Button type="mild" onClick={() => add()} block>
                <Icon name="plus" />
                Add field
              </Button>
            </Form.Field>
          </>
        )}
      </Form.List>

      <Form.Field underline={false}>
        <Button block formType="submit">
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

App.title = '动态增减嵌套字段'

export default App
