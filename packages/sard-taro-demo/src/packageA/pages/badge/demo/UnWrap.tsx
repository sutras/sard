import { Badge, Button } from 'sard-taro'

export default () => {
  return (
    <Button style={{ position: 'relative', overflow: 'visible' }}>
      消息 <Badge fixed value={5}></Badge>
    </Button>
  )
}
