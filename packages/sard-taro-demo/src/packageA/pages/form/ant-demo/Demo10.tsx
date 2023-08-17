import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Picker,
  PopoutInput,
  Radio,
  Row,
  Toast,
} from 'sard-taro'

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
}

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  const handleChange = () => {
    form.setValues({ sights: [] })
  }

  return (
    <Form
      form={form}
      onSuccess={handleSuccess}
      onFail={handleFail}
      labelWidth={50}
    >
      <Form.Field
        name="area"
        label="Area"
        rules={[{ required: true, message: 'Missing area' }]}
      >
        <Radio.Group onChange={handleChange}>
          {areas.map((area) => {
            return (
              <Radio value={area.value} key={area.value}>
                {area.label}
              </Radio>
            )
          })}
        </Radio.Group>
      </Form.Field>

      <Form.List name="sights">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Form.Map name={name} key={key}>
                <Form.Field>
                  <Row gap={10} align="start">
                    <Col>
                      <Form.Field watch={['area']} unstyled>
                        {({ getValue }) => {
                          return (
                            <Form.Field
                              name="sight"
                              label="Sight"
                              disabled={!getValue('area')}
                              rules={[
                                { required: true, message: 'Missing sight' },
                              ]}
                              inlaid
                            >
                              <PopoutInput
                                inputProps={{
                                  placeholder: '请选择',
                                }}
                              >
                                <Picker
                                  columns={sights[form.getValue('area')]}
                                />
                              </PopoutInput>
                            </Form.Field>
                          )
                        }}
                      </Form.Field>
                    </Col>

                    <Col>
                      <Form.Field
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Missing price' }]}
                        inlaid
                      >
                        <Input inlaid placeholder="请输入" />
                      </Form.Field>
                    </Col>

                    <Button type="pale-text" size="small">
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
                Add sights
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

App.title = '复杂的动态增减表单项'

export default App
