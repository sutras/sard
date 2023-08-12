import { Button, Icon, Input, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Input
        placeholder="请输入"
        prepend={<Icon name="search" color="var(--sar-tertiary-color)" />}
      />
      <Input
        placeholder="请输入"
        append={<Button size="small">发送验证码</Button>}
        style={{ marginTop: 10 }}
        clearable
      />
    </Space>
  )
}
