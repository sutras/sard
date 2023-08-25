import { Button, Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="medium">
      <Badge value={0}>
        <Button>消息</Button>
      </Badge>

      <Badge value={0} showZero>
        <Button>消息</Button>
      </Badge>
    </Space>
  )
}
