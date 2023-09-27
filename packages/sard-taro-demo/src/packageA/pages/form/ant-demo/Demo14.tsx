import { View } from '@tarojs/components'
import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Col,
  Dialog,
  Form,
  Input,
  Row,
  Space,
  Stepper,
  Toast,
} from 'sard-taro'

interface UserType {
  name: string
  age: string
}

interface ModalFormProps {
  visible: boolean
  onVisible: (visible: boolean) => void
  onSuccess: (values) => void
}

const ModalForm: React.FC<ModalFormProps> = ({
  visible,
  onVisible,
  onSuccess,
}) => {
  const [form] = Form.useForm()

  const onConfirm = () => {
    return form.validate().then((state) => {
      form.reset()
      onSuccess(state)
    })
  }

  return (
    <Dialog
      title="Basic Drawer"
      headed
      buttonType="round"
      visible={visible}
      onVisible={onVisible}
      onConfirm={onConfirm}
    >
      <Form form={form} style={{ paddingTop: 10, paddingBottom: 16 }}>
        <Form.Field name="name" label="User Name" rules={[{ required: true }]}>
          <Input inlaid placeholder="请输入" />
        </Form.Field>
        <Form.Field name="age" label="User Age" rules={[{ required: true }]}>
          <Stepper />
        </Form.Field>
      </Form>
    </Dialog>
  )
}

function App() {
  const [visible, setVisible] = useState(false)

  const showUserModal = () => {
    setVisible(true)
  }

  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  const handleModalFormSuccess = (values) => {
    const users = form.getValue('users') || []
    form.setValues({
      users: [...users, values],
    })
  }

  return (
    <>
      <Form
        form={form}
        onSuccess={handleSuccess}
        onFail={handleFail}
        labelWidth={94}
      >
        <Form.Field
          name="group"
          label="Group Name"
          rules={[{ required: true }]}
        >
          <Input inlaid placeholder="请输入" />
        </Form.Field>

        <Form.Field label="User List" watch={['users']}>
          {({ getValue }) => {
            const users: UserType[] = getValue('users') || []
            return users.length ? (
              <Space>
                {users.map((user, index) => (
                  <Space direction="horizontal" key={index} align="center">
                    <Avatar size={32} iconProps={{ size: 16 }} />
                    {user.name} - {user.age}
                  </Space>
                ))}
              </Space>
            ) : (
              <View>No user yet.</View>
            )
          }}
        </Form.Field>

        <Form.Field underline={false}>
          <Row gap={10}>
            <Col>
              <Button formType="submit">Submit</Button>
            </Col>
            <Col>
              <Button type="outline" onClick={showUserModal}>
                Add User
              </Button>
            </Col>
          </Row>
        </Form.Field>
      </Form>

      <ModalForm
        visible={visible}
        onVisible={setVisible}
        onSuccess={handleModalFormSuccess}
      />
    </>
  )
}

App.title = '多表单联动'

export default App
