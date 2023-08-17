import { useState } from 'react'
import { Cell, Dialog, Form, Input, Toast } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)

  const handleConfirm = () => {
    return form.validate().then((state) => {
      Toast.show(JSON.stringify(state))
      form.reset()
    })
  }

  const [form] = Form.useForm()

  return (
    <>
      <Cell.Group card>
        <Cell linkable title="登录表单" onClick={() => setVisible(true)} />
      </Cell.Group>

      <Dialog
        visible={visible}
        onVisible={setVisible}
        headed
        title="登录"
        showCancel
        buttonType="round"
        onConfirm={handleConfirm}
      >
        <Form form={form} style={{ paddingTop: 10, paddingBottom: 24 }}>
          <Form.Field name="name" label="用户名" rules={[{ required: true }]}>
            <Input inlaid placeholder="请输入" />
          </Form.Field>
          <Form.Field name="password" label="密码" rules={[{ required: true }]}>
            <Input type="password" inlaid placeholder="请输入" />
          </Form.Field>
        </Form>
      </Dialog>
    </>
  )
}
