import { Badge, Space } from 'sard'
import BadgeBox from '../BadgeBox'

export default () => {
  return (
    <Space gap="medium" direction="horizontal">
      <Badge value={0}>
        <BadgeBox />
      </Badge>

      <Badge value={0} showZero>
        <BadgeBox />
      </Badge>
    </Space>
  )
}
