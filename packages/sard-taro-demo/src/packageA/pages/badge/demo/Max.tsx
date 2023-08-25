import { Button, Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="medium">
      <Badge value={100}>
        <Button>消息</Button>
      </Badge>

      <Badge value={100} max={200}>
        <Button>消息</Button>
      </Badge>
    </Space>
  )
}
