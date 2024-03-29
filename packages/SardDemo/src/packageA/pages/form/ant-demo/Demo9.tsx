import { Button, Col, FooterBar, Form, Icon, Input, Row, Toast } from 'sard'

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form onSuccess={handleSuccess} onFail={handleFail}>
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
                        inlaid
                        rules={[
                          { required: true, message: 'Missing first name' },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Field>
                    </Col>

                    <Col>
                      <Form.Field
                        name="last"
                        inlaid
                        rules={[
                          { required: true, message: 'Missing last name' },
                        ]}
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
              <Button type="mild" onClick={() => add()}>
                <Icon name="plus" />
                Add field
              </Button>
            </Form.Field>
          </>
        )}
      </Form.List>

      <FooterBar showLine={false}>
        <Button style={{ flexGrow: 1 }} formType="submit">
          Submit
        </Button>
      </FooterBar>
    </Form>
  )
}

App.title = '动态增减嵌套字段'

export default App
