import { useEffect } from 'react'
import { Button, Card, Col, Form, Input, Row, Toast } from 'sard'

import DemoScrollView from '../DemoScrollView'

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  const values = Form.useWatch([], form)

  useEffect(() => {
    console.clear()
    console.log(JSON.stringify(values, null, 2))
  }, [values])

  return (
    <Form
      form={form}
      onSuccess={handleSuccess}
      onFail={handleFail}
      labelWidth={50}
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <DemoScrollView
            footer={
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  type="outline"
                  onClick={() => add()}
                >
                  + Add Item
                </Button>
                <Button style={{ flexGrow: 1 }} onClick={() => form.submit()}>
                  Submit
                </Button>
              </>
            }
          >
            {fields.map((field) => (
              <Card
                key={field.key}
                title={`Item ${field.name + 1}`}
                extra={
                  <Button
                    type="pale-text"
                    size="mini"
                    iconProps={{ name: 'close', size: 16 }}
                    onClick={() => remove(field.name)}
                  />
                }
                bodyStyle={{ padding: 0 }}
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#e3e3e3',
                  marginLeft: 16,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <Form.Map name={field.name}>
                  <Form.Field
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Missing  Name' }]}
                  >
                    <Input inlaid placeholder="请输入" />
                  </Form.Field>

                  <Form.List name="list">
                    {(subFields, subOpt) => (
                      <>
                        {subFields.map((subField, index) => (
                          <Form.Map key={subField.key} name={subField.name}>
                            <Form.Field
                              label={index === 0 ? 'List' : ''}
                              required={index === 0}
                            >
                              <Row gap={10} align="start">
                                <Col>
                                  <Form.Field
                                    inlaid
                                    name="first"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing First',
                                      },
                                    ]}
                                  >
                                    <Input placeholder="first" inlaid />
                                  </Form.Field>
                                </Col>

                                <Col>
                                  <Form.Field
                                    inlaid
                                    name="second"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing Second',
                                      },
                                    ]}
                                  >
                                    <Input placeholder="second" inlaid />
                                  </Form.Field>
                                </Col>

                                <Button
                                  type="pale"
                                  size="mini"
                                  round
                                  style={{ marginTop: 5 }}
                                  iconProps={{ name: 'minus', size: 14 }}
                                  onClick={() => subOpt.remove(subField.name)}
                                />
                              </Row>
                            </Form.Field>
                          </Form.Map>
                        ))}

                        <Form.Field label underline={false}>
                          <Button
                            type="outline"
                            size="small"
                            onClick={() => subOpt.add()}
                          >
                            + Add Sub Item
                          </Button>
                        </Form.Field>
                      </>
                    )}
                  </Form.List>
                </Form.Map>
              </Card>
            ))}
          </DemoScrollView>
        )}
      </Form.List>
    </Form>
  )
}

App.title = '复杂的动态增减表单项'

export default App
