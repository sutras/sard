import { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Toast } from 'sard-taro'

function App() {
  const [form] = Form.useForm()
  const [checkNick, setCheckNick] = useState(false)

  useEffect(() => {
    form.validate(['nickname']).catch(() => {
      void 0
    })
  }, [checkNick, form])

  const onCheck = async () => {
    try {
      const values = await form.validate()
      Toast.show('success')
      console.log('Success:', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  return (
    <Form form={form}>
      <Form.Field
        name="username"
        label="Name"
        rules={[{ required: true, message: 'Please input your name' }]}
      >
        <Input inlaid placeholder="Please input your name" />
      </Form.Field>
      <Form.Field
        name="nickname"
        label="Nickname"
        rules={[{ required: checkNick, message: 'Please input your nickname' }]}
      >
        <Input inlaid placeholder="Please input your nickname" />
      </Form.Field>
      <Form.Field>
        <Checkbox checked={checkNick} onChange={setCheckNick}>
          Nickname is required
        </Checkbox>
      </Form.Field>

      <Form.Field underline={false}>
        <Button onClick={onCheck}>Check</Button>
      </Form.Field>
    </Form>
  )
}

App.title = '动态校验规则'

export default App
