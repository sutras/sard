import { Button, Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Badge value={100}>
        <Button>消息</Button>
      </Badge>
      <Badge value={100} max={200} style={{ marginLeft: '20px' }}>
        <Button>消息</Button>
      </Badge>
    </Space>
  )
}
