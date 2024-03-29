import {
  Button,
  Calendar,
  Cascader,
  Checkbox,
  DatetimePicker,
  Form,
  Input,
  PasswordInput,
  Picker,
  PopoutInput,
  Radio,
  Rate,
  Slider,
  Space,
  Stepper,
  Switch,
  Toast,
  Upload,
} from 'sard'

import { useState } from 'react'
import { getRegionData } from 'region-data'

import DemoScrollView from '../DemoScrollView'

const regionData = getRegionData()

function App() {
  const [form] = Form.useForm()

  const handleSuccess = (values) => {
    Toast.show('success')
    console.log(values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const filledData = {
    username: 'root',
    password: 'root123456',
    email: 'root@email.com',
    phone: '13800000000',
    captcha: '123456',
    name: '管理员',
    gender: 'male',
    age: 18,
    idNumber: '000000000000000000',
    nativePlace: 440111,
    address: '广东省广州市xxx xxx xxx 16号',
    birthday: new Date(2000, 7, 12),
    married: true,
    education: '初中',
    avatar: [
      {
        url: 'https://unpkg.com/@sard/assets@1.2.0/images/pic1.jpg',
      },
    ],
    hobbies: ['h1', 'h2'],
    pressure: 50,
    happiness: 2,
    travelDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  }

  const handleValidate = () => {
    form
      .validate()
      .then((values) => {
        Toast.show('验证通过')
        console.log(values)
      })
      .catch((errors) => {
        Toast.show('验证失败')
        console.log(errors)
      })
  }

  const [disabled, setDisabled] = useState(false)
  const [readOnly, setReadOnly] = useState(false)

  return (
    <DemoScrollView
      footer={
        <>
          <Button
            style={{ flexGrow: 1 }}
            disabled={disabled}
            onClick={() => form.submit()}
          >
            提交
          </Button>
          <Button
            style={{ flexGrow: 1 }}
            disabled={disabled}
            onClick={() => form.reset()}
          >
            重置
          </Button>
          <Button
            style={{ flexGrow: 1 }}
            disabled={disabled}
            onClick={() => form.setValues(filledData)}
          >
            数据填充
          </Button>
          <Button
            style={{ flexGrow: 1 }}
            disabled={disabled}
            onClick={handleValidate}
          >
            验证
          </Button>
        </>
      }
    >
      <Form
        onSuccess={handleSuccess}
        onFail={handleFail}
        initialValues={{}}
        form={form}
        disabled={disabled}
        readOnly={readOnly}
        starPosition="left"
        labelWidth={100}
      >
        <Space
          direction="horizontal"
          style={{ paddingLeft: 15, paddingBottom: 10 }}
        >
          <Switch checked={disabled} onChange={setDisabled} /> 禁用
          <Switch checked={readOnly} onChange={setReadOnly} /> 只读
        </Space>

        <Form.Field label="用户名" name="username" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名" inlaid clearable />
        </Form.Field>

        <Form.Field
          label="密码"
          name="password"
          rules={[
            { required: true },
            { min: 6, max: 12 },
            {
              validator: (value) => {
                return /[a-zA-Z]/.test(value) && /\d/.test(value)
              },
              message: '必须包含字母和数字',
            },
          ]}
          extra="密码长度为6-12个字符"
          validateFirst={false}
        >
          <Input type="password" placeholder="请输入密码" inlaid clearable />
        </Form.Field>

        <Form.Field
          label="邮箱"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder="请输入邮箱" inlaid clearable />
        </Form.Field>

        <Form.Field
          label="手机号"
          name="phone"
          rules={[{ required: true, pattern: /^13\d{9}$/ }]}
        >
          <Input placeholder="请输入手机号" inlaid clearable />
        </Form.Field>

        <Form.Field
          label="验证码"
          name="captcha"
          layout="vertical"
          underline={false}
          rules={[{ required: true, len: 6 }]}
        >
          <PasswordInput type="underline" plainText />
        </Form.Field>

        <Form.Field label="姓名" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" inlaid clearable />
        </Form.Field>

        <Form.Field
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择${label}' }]}
        >
          <Radio.Group>
            <Space direction="horizontal" gap="medium">
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </Space>
          </Radio.Group>
        </Form.Field>

        <Form.Field label="年龄" name="age" rules={[{ required: true }]}>
          <Stepper min={0} max={150} precision={0} />
        </Form.Field>

        <Form.Field
          label="身份证号"
          name="idNumber"
          rules={[{ required: true }]}
        >
          <Input readOnly inlaid placeholder="请输入身份证号" clearable />
        </Form.Field>

        <Form.Field
          label="籍贯"
          name="nativePlace"
          rules={[{ required: true }]}
        >
          <PopoutInput
            title="请选择省市区"
            inputProps={{ placeholder: '请选择', clearable: true }}
          >
            <Cascader
              options={regionData}
              fieldNames={{ label: 'name', value: 'code' }}
            />
          </PopoutInput>
        </Form.Field>

        <Form.Field label="现住址" name="address" rules={[{ required: true }]}>
          <Input inlaid clearable type="textarea" placeholder="请输入现住址" />
        </Form.Field>

        <Form.Field
          label="出生日期"
          name="birthday"
          rules={[{ required: true }]}
        >
          <PopoutInput
            title="请选择出生日期"
            inputProps={{ placeholder: '请选择' }}
          >
            <DatetimePicker
              type="yMd"
              min={new Date(1900, 0, 1)}
              max={new Date()}
            />
          </PopoutInput>
        </Form.Field>

        <Form.Field
          label="是否已婚"
          name="married"
          initialValue={false}
          valuePropName="checked"
          rules={[{ required: true }]}
        >
          <Switch />
        </Form.Field>

        <Form.Field label="学历" name="education" rules={[{ required: true }]}>
          <PopoutInput
            title="请选择学历"
            inputProps={{ placeholder: '请选择' }}
          >
            <Picker
              columns={['小学', '初中', '高中', '专科', '本科', '研究生']}
            />
          </PopoutInput>
        </Form.Field>

        <Form.Field
          label="头像"
          name="avatar"
          valuePropName="fileList"
          rules={[{ required: true }]}
        >
          <Upload maxCount={1} />
        </Form.Field>

        <Form.Field
          label="兴趣爱好"
          name="hobbies"
          rules={[{ required: true }]}
        >
          <Checkbox.Group>
            <Space gap="medium">
              <Checkbox value="h1">运动</Checkbox>
              <Checkbox value="h2">读书</Checkbox>
              <Checkbox value="h3">旅行</Checkbox>
              <Checkbox value="h4">购物</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Field>

        <Form.Field
          label="工作压力程度"
          name="pressure"
          rules={[{ required: true }]}
        >
          <Slider />
        </Form.Field>

        <Form.Field
          label="幸福度"
          name="happiness"
          rules={[{ required: true }]}
        >
          <Rate allowHalf clearable />
        </Form.Field>

        <Form.Field
          label="下次旅游时间"
          name="travelDate"
          rules={[{ required: true }]}
        >
          <PopoutInput
            title="请选择日期"
            inputProps={{ placeholder: '请选择' }}
          >
            <Calendar />
          </PopoutInput>
        </Form.Field>
      </Form>
    </DemoScrollView>
  )
}

App.title = '表单只读和禁用'

export default App
