/*
### 基础使用
*/

import { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Switch,
  Checkbox,
  Upload,
  Slider,
  Rate,
  Stepper,
  Popout,
  Cascader,
  Calendar,
  Icon,
  CascaderOption,
  DatetimePicker,
} from 'sard'
import area from '../../../../assets/area.json'

export default function () {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <>
      <Form
        onSuccess={handleSubmit}
        initialValue={{
          username: 'root',
          password: '123456',
          gender: 'male',
          married: false,
          hobbies: ['2', '3'],
          remarks: '这是备注',
        }}
      >
        <Form.Item label="用户名" name="username">
          <Input placeholder="请输入用户名" inlaid></Input>
        </Form.Item>

        <Form.Item label="密码" error="密码错误" name="password">
          <Input type="password" placeholder="请输入密码" inlaid></Input>
        </Form.Item>

        <Form.Item label="性别" name="gender" initialValue="female">
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="是否已婚" name="married">
          <Switch />
        </Form.Item>

        <Form.Item label="兴趣爱好" name="hobbies" initialValue={['1', '2']}>
          <Checkbox.Group vertical>
            <Checkbox value="1">运动</Checkbox>
            <Checkbox value="2">读书</Checkbox>
            <Checkbox value="3">旅行</Checkbox>
            <Checkbox value="4">游戏</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="头像" name="avatar">
          <Upload maxCount={1} />
        </Form.Item>

        <Form.Item label="工作压力程度" name="pressure" initialValue={25}>
          <Slider />
        </Form.Item>

        <Form.Item label="幸福度" name="happiness" initialValue={3}>
          <Rate allowHalf allowClear />
        </Form.Item>

        <Form.Item label="年龄" name="age" initialValue={1}>
          <Stepper />
        </Form.Item>

        <Form.Item label="备注" name="remarks">
          <Input
            inlaid
            type="textarea"
            placeholder="请输入备注"
            autoHeight={{ minHeight: 40, maxHeight: 100 }}
          />
        </Form.Item>

        <Form.Item label="籍贯" name="nativePlace">
          <Popout title="请选择省市区" fast showConfirm={false}>
            <Popout.Outlet>
              {({
                value,
                triggerArgs: [, options = []],
                setVisible,
                setValue,
              }) => (
                <Input
                  value={
                    (value?.length &&
                      options.map((option) => option.name).join('/')) ||
                    ''
                  }
                  clearable
                  onClear={() => setValue([])}
                  onClick={() => setVisible(true)}
                  readOnly
                  inlaid
                  placeholder="请选择省市区"
                  append={<Icon color="#ccc" name="bi-caret-right-fill"></Icon>}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Cascader
                options={area}
                fieldNames={{ label: 'name', value: 'code' }}
              />
            </Popout.Target>
          </Popout>
        </Form.Item>

        <Form.Item label="出生日期" name="birthday">
          <Popout title="请选择出生日期">
            <Popout.Outlet>
              {({ value, setVisible, setValue }) => (
                <Input
                  value={value?.toLocaleDateString() || ''}
                  clearable
                  onClear={() => setValue(null)}
                  onClick={() => setVisible(true)}
                  readOnly
                  inlaid
                  placeholder="请选择出生日期"
                  append={<Icon color="#ccc" name="bi-caret-right-fill"></Icon>}
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
        </Form.Item>

        <Form.Item label="计划下一次旅游时间" name="travelDate">
          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible, setValue }) => (
                <Input
                  value={value || ''}
                  clearable
                  onClear={() => setValue(null)}
                  onClick={() => setVisible(true)}
                  readOnly
                  inlaid
                  placeholder="请选择日期"
                  append={<Icon color="#ccc" name="bi-caret-right-fill"></Icon>}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar />
            </Popout.Target>
          </Popout>
        </Form.Item>

        <div style={{ margin: 15 }}>
          <Button block htmlType="submit">
            提交
          </Button>
        </div>
      </Form>
    </>
  )
}
