import { Input, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Input placeholder="文本" type="text" />
      <Input placeholder="数字" type="number" />
      <Input placeholder="身份证" type="idcard" />
      <Input placeholder="带小数点数字" type="digit" />
      <Input placeholder="密码" type="password" />
      <Input placeholder="文本域" type="textarea" />
    </Space>
  )
}
