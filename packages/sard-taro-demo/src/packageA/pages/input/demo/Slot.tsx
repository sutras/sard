import { Button, Icon, Input, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Input placeholder="请输入" prepend={<Icon name="search" />} />
      <Input
        placeholder="请输入"
        append={<Button size="mini">发送验证码</Button>}
        style={{ marginTop: 10 }}
        clearable
      />
    </Space>
  )
}
