import { View } from '@tarojs/components'
import {
  Button,
  Cascader,
  Checkbox,
  Form,
  Input,
  Stepper,
  Toast,
  Picker,
  CascaderProps,
  PopoutInput,
  Row,
  Col,
} from 'sard-taro'

const residences: CascaderProps['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  const prefixSelector = (
    <Form.Field name="prefix" unstyled>
      <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
        <Picker
          columns={[
            { label: '+86', value: '86' },
            { label: '+87', value: '87' },
          ]}
        />
      </PopoutInput>
    </Form.Field>
  )

  const suffixSelector = (
    <Form.Field name="suffix" unstyled>
      <PopoutInput
        title="请选择"
        inputProps={{ placeholder: '请选择', style: { textAlign: 'center' } }}
      >
        <Picker
          columns={[
            { label: '$', value: 'USD' },
            { label: '¥', value: 'CNY' },
          ]}
        />
      </PopoutInput>
    </Form.Field>
  )

  return (
    <Form
      onSuccess={handleSuccess}
      onFail={handleFail}
      form={form}
      initialValues={{
        residence: 'xihu',
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Field
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input inlaid placeholder="请输入" />
      </Form.Field>

      <Form.Field
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input inlaid type="password" placeholder="请输入" />
      </Form.Field>

      <Form.Field
        name="confirm"
        label="Confirm Password"
        watch={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getValue }) => ({
            validator(value) {
              if (!value || getValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!'),
              )
            },
          }),
        ]}
      >
        <Input inlaid type="password" placeholder="请输入" />
      </Form.Field>

      <Form.Field
        name="nickname"
        label="Nickname"
        extra="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input inlaid placeholder="请输入" />
      </Form.Field>

      <Form.Field
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            required: true,
            message: 'Please select your habitual residence!',
          },
        ]}
      >
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <Cascader options={residences} />
        </PopoutInput>
      </Form.Field>

      <Form.Field
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input
          inlaid
          prepend={<View style={{ width: 60 }}>{prefixSelector}</View>}
          placeholder="请输入"
        />
      </Form.Field>

      <Form.Field label="Donation" required>
        <>
          <Row gap={10}>
            <Col>
              <Form.Field
                name="donation"
                underline={false}
                style={{ padding: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please input donation amount!',
                  },
                ]}
              >
                <Stepper />
              </Form.Field>
            </Col>
            <Col>
              <View style={{ width: 70, marginTop: 5 }}>{suffixSelector}</View>
            </Col>
          </Row>
        </>
      </Form.Field>

      <Form.Field
        name="website"
        label="Website"
        rules={[{ required: true, message: 'Please input website!' }]}
      >
        <Input inlaid placeholder="请输入" />
      </Form.Field>

      <Form.Field
        name="intro"
        label="Intro"
        rules={[{ required: true, message: 'Please input Intro' }]}
      >
        <Input inlaid type="textarea" showCount placeholder="请输入" />
      </Form.Field>

      <Form.Field
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <Picker
            columns={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
            ]}
          />
        </PopoutInput>
      </Form.Field>

      <Form.Field
        label="Captcha"
        name="captcha"
        extra="We must make sure that your are a human."
        rules={[
          {
            required: true,
            message: 'Please input the captcha you got!',
          },
        ]}
      >
        <Input
          inlaid
          placeholder="请输入"
          append={<Button size="small">Get captcha</Button>}
        />
      </Form.Field>

      <Form.Field
        name="agreement"
        valuePropName="checked"
        underline={false}
        rules={[
          {
            validator: (value) =>
              value
                ? Promise.resolve()
                : Promise.reject('Should accept agreement'),
          },
        ]}
      >
        <Checkbox>
          I have read the
          <View style={{ marginLeft: 10, color: 'var(--sar-primary)' }}>
            agreement
          </View>
        </Checkbox>
      </Form.Field>

      <Form.Field underline={false}>
        <Button block formType="submit">
          Register
        </Button>
      </Form.Field>
    </Form>
  )
}

App.title = '注册新用户'

export default App
