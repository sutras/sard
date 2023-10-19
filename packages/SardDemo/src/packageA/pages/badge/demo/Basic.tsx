import { Badge, Space } from 'sard'
import BadgeBox from '../BadgeBox'

export default () => {
  return (
    <Space gap="medium" direction="horizontal">
      <Badge value={5}>
        <BadgeBox />
      </Badge>
    </Space>
  )
}
