import { Badge, Space } from 'sard'
import BadgeBox from '../BadgeBox'

export default () => {
  return (
    <Space gap="medium" direction="horizontal">
      <Badge isDot>
        <BadgeBox />
      </Badge>
    </Space>
  )
}
