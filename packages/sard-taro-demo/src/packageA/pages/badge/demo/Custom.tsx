import { Badge, Button, Icon } from 'sard-taro'

export default () => {
  return (
    <Badge value={<Icon name="question"></Icon>}>
      <Button>消息</Button>
    </Badge>
  )
}
