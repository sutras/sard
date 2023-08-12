import { Button, Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Badge value={0}>
        <Button>消息</Button>
      </Badge>
      <Badge value={0} showZero style={{ marginLeft: '20px' }}>
        <Button>消息</Button>
      </Badge>
    </Space>
  )
}
