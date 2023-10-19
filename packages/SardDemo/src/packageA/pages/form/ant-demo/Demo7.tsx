import { Form, Input, Button, Toast, FooterBar } from 'sard'

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
      <Form.Map name="user">
        <Form.Map name="name">
          <Form.Field
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input inlaid placeholder="请输入" />
          </Form.Field>
          <Form.Field
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input inlaid placeholder="请输入" />
          </Form.Field>
        </Form.Map>

        <Form.Field name="age" label="Age">
          <Input inlaid placeholder="请输入" />
        </Form.Field>
      </Form.Map>

      <FooterBar showLine={false}>
        <Button style={{ flexGrow: 1 }} formType="submit">
          Submit
        </Button>
      </FooterBar>
    </Form>
  )
}

App.title = '字段路径前缀'

export default App
