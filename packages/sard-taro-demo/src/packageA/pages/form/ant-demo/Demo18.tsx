import { View } from '@tarojs/components'
import { FC, useState } from 'react'
import { Button, Form, Input, Dialog, Radio, Toast, Space } from 'sard-taro'

interface Values {
  title: string
  description: string
  modifier: string
}

interface CollectionCreateFormProps {
  visible: boolean
  onCreate: (values: Values) => void
  onVisible: (visible: boolean) => void
}

const CollectionCreateForm: FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onVisible,
}) => {
  const [form] = Form.useForm()
  return (
    <Dialog
      visible={visible}
      headed
      buttonType="round"
      title="Create a new collection"
      confirmText="Create"
      showCancel
      cancelText="Cancel"
      onVisible={onVisible}
      onConfirm={() => {
        return form
          .validate()
          .then((values) => {
            form.reset()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
            throw info
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ modifier: 'public' }}
        style={{ paddingTop: 10, paddingBottom: 16 }}
      >
        <Form.Field
          underline={false}
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Field>
        <Form.Field underline={false} name="description" label="Description">
          <Input type="textarea" />
        </Form.Field>
        <Form.Field
          underline={false}
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Space direction="horizontal" gap="medium">
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Space>
          </Radio.Group>
        </Form.Field>
      </Form>
    </Dialog>
  )
}

function App() {
  const [visible, setVisible] = useState(false)

  const onCreate = (values) => {
    Toast.show('success')
    console.log('Received values of form: ', values)
    setVisible(false)
  }

  return (
    <>
      <View style={{ padding: 20 }}>
        <Button
          onClick={() => {
            setVisible(true)
          }}
        >
          New Collection
        </Button>
      </View>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onVisible={setVisible}
      />
    </>
  )
}

App.title = '弹出层中的新建表单'

export default App
