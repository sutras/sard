import { Button, FooterBar, Form, Icon, Input, Toast } from 'sard'

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
      <Form.List
        name="names"
        rules={[
          {
            validator: (names) => {
              if (!names || names.length < 2) {
                return 'At least 2 passengers'
              }
              return true
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => {
              return (
                <Form.Field
                  key={field.key}
                  name={field.name}
                  validateTrigger={['onChange', 'onBlur']}
                  label={index === 0 ? 'Passengers' : ''}
                  required={index === 0}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input passenger's name or delete this field.",
                    },
                  ]}
                >
                  <Input
                    inlaid
                    placeholder="passenger name"
                    append={
                      fields.length > 0 ? (
                        <Button
                          type="pale-text"
                          size="small"
                          iconProps={{ name: 'close', size: 14 }}
                          onClick={() => remove(field.name)}
                        />
                      ) : null
                    }
                  />
                </Form.Field>
              )
            })}

            <Form.Field label>
              <Button type="mild" size="small" onClick={() => add()}>
                <Icon name="plus" /> Add field
              </Button>
              <Button
                type="mild"
                size="small"
                onClick={() => {
                  add('headding', 0)
                }}
                style={{ marginTop: 10 }}
              >
                <Icon name="plus" /> Add field at head
              </Button>

              <Form.ErrorList errors={errors} />
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

App.title = '动态增减表单项'

export default App
