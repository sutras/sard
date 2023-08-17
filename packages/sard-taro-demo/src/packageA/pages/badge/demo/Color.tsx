import { Button, Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Badge value={5} color="var(--sar-pink)">
        <Button>消息</Button>
      </Badge>
      <Badge isDot color="var(--sar-pink)" style={{ marginLeft: '20px' }}>
        <Button>消息</Button>
      </Badge>
      <Badge
        value={5}
        color="#eee"
        textColor="#222"
        style={{ marginLeft: '20px' }}
      >
        <Button>消息</Button>
      </Badge>
    </Space>
  )
}
