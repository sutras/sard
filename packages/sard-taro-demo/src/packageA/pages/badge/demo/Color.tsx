import { Button, Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="medium">
      <Badge value={5} color="var(--sar-pink)">
        <Button>消息</Button>
      </Badge>

      <Badge isDot color="var(--sar-pink)">
        <Button>消息</Button>
      </Badge>

      <Badge value={5} color="#eee" textColor="#222">
        <Button>消息</Button>
      </Badge>
    </Space>
  )
}
