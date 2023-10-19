import { Button, FooterBar, Form, Input, Radio, Space, Toast } from 'sard'

function App() {
  const [form] = Form.useForm()

  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFill = () => {
    form.setValues({
      note: 'Hello world!',
      gender: 'other',
      customizeGender: 'customizeGender',
    })
  }
  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setValues({ note: 'Hi, man!' })
        break
      case 'female':
        form.setValues({ note: 'Hi, lady!' })
        break
      case 'other':
        form.setValues({ note: 'Hi there!' })
        break
      default:
    }
  }

  return (
    <Form
      form={form}
      onSuccess={handleSuccess}
      onFail={handleFail}
      labelWidth={80}
    >
      <Form.Field name="note" label="Note" rules={[{ required: true }]}>
        <Input inlaid placeholder="Note" />
      </Form.Field>

      <Form.Field name="gender" label="Gender" rules={[{ required: true }]}>
        <Radio.Group onChange={onGenderChange}>
          <Space direction="horizontal" gap="medium" wrap>
            <Radio value="male">male</Radio>
            <Radio value="female">female</Radio>
            <Radio value="other">other</Radio>
          </Space>
        </Radio.Group>
      </Form.Field>

      <Form.Field watch={['gender']} unstyled>
        {({ getValue }) => {
          return getValue('gender') === 'other' ? (
            <Form.Field
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input inlaid placeholder="Customize Gender" />
            </Form.Field>
          ) : null
        }}
      </Form.Field>

      <FooterBar showLine={false}>
        <Button style={{ flexGrow: 1 }} formType="submit">
          Submit
        </Button>
        <Button style={{ flexGrow: 1 }} formType="reset">
          Reset
        </Button>
        <Button style={{ flexGrow: 1 }} onClick={onFill}>
          Fill form
        </Button>
      </FooterBar>
    </Form>
  )
}

App.title = '表单方法调用'

export default App
