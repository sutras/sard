import { Button, Icon, Input, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Input placeholder="请输入" prepend={<Icon name="search" />} />
      <Input
        placeholder="请输入"
        append={<Button size="small">发送验证码</Button>}
        clearable
      />
    </Space>
  )
}
