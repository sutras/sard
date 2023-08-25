import { useState } from 'react'
import {
  Button,
  Form,
  FormFieldProps,
  Input,
  Radio,
  Space,
  Toast,
} from 'sard-taro'

function App() {
  const [form] = Form.useForm()

  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [formLayout, setFormLayout] =
    useState<FormFieldProps['layout']>('horizontal')

  const onFormLayoutChange = (layout) => {
    setFormLayout(layout)
  }

  return (
    <Form
      form={form}
      initialValues={{ layout: formLayout }}
      layout={formLayout}
      onSuccess={handleSuccess}
      onFail={handleFail}
    >
      <Form.Field name="layout" label="Form Layout">
        <Radio.Group value={formLayout} onChange={onFormLayoutChange}>
          <Space gap="medium">
            <Radio value="horizontal">Horizontal</Radio>
            <Radio value="vertical">Vertical</Radio>
          </Space>
        </Radio.Group>
      </Form.Field>

      <Form.Field label="Field A" name="fieldA" rules={[{ required: true }]}>
        <Input placeholder="input placeholder" inlaid />
      </Form.Field>

      <Form.Field label="Field B" name="fieldB" rules={[{ required: true }]}>
        <Input placeholder="input placeholder" inlaid />
      </Form.Field>

      <Form.Field underline={false}>
        <Button block formType="submit">
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

App.title = '表单布局'

export default App
