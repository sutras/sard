import { useState } from 'react'
import {
  Button,
  FooterBar,
  Form,
  FormFieldProps,
  Input,
  Radio,
  Space,
  Toast,
} from 'sard'

function App() {
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
      initialValues={{ layout: formLayout }}
      layout={formLayout}
      onSuccess={handleSuccess}
      onFail={handleFail}
    >
      <Form.Field name="layout" label="Form Layout">
        <Radio.Group value={formLayout} onChange={onFormLayoutChange}>
          <Space direction="horizontal" gap="medium">
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

      <FooterBar showLine={false}>
        <Button style={{ flexGrow: 1 }} formType="submit">
          Submit
        </Button>
      </FooterBar>
    </Form>
  )
}

App.title = '表单布局'

export default App
