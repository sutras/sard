import {
  Button,
  Calendar,
  Cascader,
  Checkbox,
  DatetimePicker,
  Form,
  Icon,
  Input,
  PasswordInput,
  Picker,
  Popout,
  Radio,
  Rate,
  Slider,
  Stepper,
  Switch,
  Toast,
  Upload,
} from 'sard-taro'
import { View } from '@tarojs/components'

import { useState } from 'react'
import { getRegionData } from 'region-data'

import pic1 from '@/static/pic1.jpg'

const regionData = getRegionData()

const Demo1 = () => {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    console.log(values)
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
    nativePlace: [440000, 440100, 440111],
    address: '广东省广州市xxx xxx xxx 16号',
    birthday: new Date(2000, 0, 1),
    married: true,
    education: ['e2'],
    avatar: [
      {
        url: pic1,
      },
    ],
    hobbies: ['h1', 'h2'],
    pressure: 50,
    happiness: 2,
    travelDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  }

  const handleValidate = () => {
    form
      .validateFields()
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

  setDisabled

  return (
    <Form
      onSuccess={handleSubmit}
      initialValues={{}}
      form={form}
      scrollToFirstError
      disabled={disabled}
    >
      <Form.Field label="用户名" name="username" rules={[{ required: true }]}>
        <Input placeholder="请输入用户名" inlaid clearable></Input>
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
        <Input
          type="password"
          placeholder="请输入密码"
          inlaid
          clearable
        ></Input>
      </Form.Field>

      <Form.Field
        label="邮箱"
        name="email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Input placeholder="请输入邮箱" inlaid clearable></Input>
      </Form.Field>

      <Form.Field
        label="手机号"
        name="phone"
        rules={[{ required: true, pattern: /^13\d{9}$/ }]}
      >
        <Input placeholder="请输入手机号" inlaid clearable></Input>
      </Form.Field>

      <Form.Field
        label="验证码"
        name="captcha"
        layout="vertical"
        style={{
          paddingBottom: 0,
          '--sar-form-item-border-color': 'transparent',
          '--sar-password-input-height': '40px',
        }}
        rules={[{ required: true, len: 6 }]}
      >
        <PasswordInput disabled={disabled} type="underline" plainText />
      </Form.Field>

      <Form.Field label="姓名" name="name" rules={[{ required: true }]}>
        <Input placeholder="请输入姓名" inlaid clearable></Input>
      </Form.Field>

      <Form.Field
        label="性别"
        name="gender"
        rules={[{ required: true, message: '请选择${label}' }]}
      >
        <Radio.Group>
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </Radio.Group>
      </Form.Field>

      <Form.Field label="年龄" name="age" rules={[{ required: true }]}>
        <Stepper min={1} max={150} precision={0} />
      </Form.Field>

      <Form.Field label="身份证号" name="idNumber" rules={[{ required: true }]}>
        <Input
          readOnly
          disabled={disabled}
          inlaid
          placeholder="请输入身份证号"
          clearable
        />
      </Form.Field>

      <Form.Field label="籍贯" name="nativePlace" rules={[{ required: true }]}>
        <Popout title="请选择省市区" fast showConfirm={false}>
          <Popout.Outlet>
            {({ triggerArgs: [, options = []], setVisible, setValue }) => (
              <Input
                readOnly
                disabled={disabled}
                inlaid
                placeholder="请选择省市区"
                append={<Icon color="#ccc" name="bi-caret-right-fill"></Icon>}
                value={options.map((option) => option.name).join('/')}
                clearable
                onClear={() => setValue()}
                onClick={() => setVisible(true)}
              />
            )}
          </Popout.Outlet>
          <Popout.Target>
            <Cascader
              options={regionData}
              fieldNames={{ label: 'name', value: 'code' }}
            />
          </Popout.Target>
        </Popout>
      </Form.Field>

      <Form.Field label="现住址" name="address" rules={[{ required: true }]}>
        <Input
          inlaid
          clearable
          type="textarea"
          placeholder="请输入现住址"
          autoHeight
          style={{ minHeight: 100, maxHeight: 200 }}
        />
      </Form.Field>

      <Form.Field label="出生日期" name="birthday" rules={[{ required: true }]}>
        <Popout title="请选择出生日期">
          <Popout.Outlet>
            {({ value, setVisible, setValue }) => (
              <Input
                readOnly
                disabled={disabled}
                inlaid
                placeholder="请选择出生日期"
                append={<Icon color="#ccc" name="bi-caret-right-fill"></Icon>}
                value={value?.toLocaleDateString() || ''}
                clearable
                onClear={() => setValue()}
                onClick={() => setVisible(true)}
              />
            )}
          </Popout.Outlet>
          <Popout.Target>
            <DatetimePicker
              type="yMd"
              min={new Date(1900, 0, 1)}
              max={new Date()}
            />
          </Popout.Target>
        </Popout>
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
        <Popout title="请选择学历">
          <Popout.Outlet>
            {({
              value,
              triggerArgs: [, options = []],
              setVisible,
              setValue,
            }) => (
              <Input
                readOnly
                disabled={disabled}
                inlaid
                placeholder="请选择学历"
                append={<Icon color="#ccc" name="bi-caret-right-fill"></Icon>}
                value={(value?.length && options[0]?.label) || ''}
                clearable
                onClear={() => setValue()}
                onClick={() => setVisible(true)}
              />
            )}
          </Popout.Outlet>
          <Popout.Target>
            <Picker
              columns={[
                [
                  {
                    label: '小学',
                    value: 'e1',
                  },
                  {
                    label: '初中',
                    value: 'e2',
                  },
                  {
                    label: '高中',
                    value: 'e3',
                  },
                  {
                    label: '专科',
                    value: 'e4',
                  },
                  {
                    label: '本科',
                    value: 'e5',
                  },
                  {
                    label: '研究生',
                    value: 'e6',
                  },
                ],
              ]}
            ></Picker>
          </Popout.Target>
        </Popout>
      </Form.Field>

      <Form.Field
        label="头像"
        name="avatar"
        valuePropName="fileList"
        rules={[{ required: true }]}
      >
        <Upload maxCount={1} />
      </Form.Field>

      <Form.Field label="兴趣爱好" name="hobbies" rules={[{ required: true }]}>
        <Checkbox.Group vertical>
          <Checkbox value="h1">运动</Checkbox>
          <Checkbox value="h2">读书</Checkbox>
          <Checkbox value="h3">旅行</Checkbox>
          <Checkbox value="h4">购物</Checkbox>
        </Checkbox.Group>
      </Form.Field>

      <Form.Field
        label="工作压力程度"
        name="pressure"
        rules={[{ required: true }]}
      >
        <Slider />
      </Form.Field>

      <Form.Field label="幸福度" name="happiness" rules={[{ required: true }]}>
        <Rate allowHalf allowClear />
      </Form.Field>

      <Form.Field
        label="下次旅游时间"
        name="travelDate"
        rules={[{ required: true }]}
      >
        <Popout title="请选择日期">
          <Popout.Outlet>
            {({ value, setVisible, setValue }) => (
              <Input
                readOnly
                disabled={disabled}
                inlaid
                placeholder="请选择日期"
                append={<Icon color="#ccc" name="bi-caret-right-fill"></Icon>}
                value={value?.toLocaleDateString() || ''}
                clearable
                onClear={() => setValue()}
                onClick={() => setVisible(true)}
              />
            )}
          </Popout.Outlet>
          <Popout.Target>
            <Calendar />
          </Popout.Target>
        </Popout>
      </Form.Field>

      <View style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: 15 }}>
        <Button formType="submit">提交</Button>
        <Button formType="reset">重置</Button>
        <Button onClick={() => form.setFieldsValue(filledData)}>
          数据填充
        </Button>
        <Button onClick={handleValidate}>验证</Button>
      </View>
    </Form>
  )
}

Demo1.title = '基础案例'

export default Demo1
