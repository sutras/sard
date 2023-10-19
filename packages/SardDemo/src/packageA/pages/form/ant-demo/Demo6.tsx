import { useState, useEffect } from 'react'
import { Button, FooterBar, Form, FormStore, Input, Toast } from 'sard'

const SubmitButton = ({ form }: { form: FormStore }) => {
  const [submittable, setSubmittable] = useState(false)

  // Watch all values
  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validate({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      },
    )
  }, [values])

  return (
    <Button style={{ flexGrow: 1 }} formType="submit" disabled={!submittable}>
      Submit
    </Button>
  )
}

function App() {
  const [form] = Form.useForm()

  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form form={form} onSuccess={handleSuccess} onFail={handleFail}>
      <Form.Field name="name" label="Name" rules={[{ required: true }]}>
        <Input inlaid placeholder="请输入" />
      </Form.Field>
      <Form.Field name="age" label="Age" rules={[{ required: true }]}>
        <Input inlaid placeholder="请输入" />
      </Form.Field>

      <FooterBar showLine={false}>
        <SubmitButton form={form} />
        <Button style={{ flexGrow: 1 }} formType="reset">
          Reset
        </Button>
      </FooterBar>
    </Form>
  )
}

App.title = '仅校验'

export default App
