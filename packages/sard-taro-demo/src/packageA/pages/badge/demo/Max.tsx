import { Badge, Space } from 'sard-taro'
import BadgeBox from './BadgeBox'

export default () => {
  return (
    <Space gap="medium" direction="horizontal">
      <Badge value={100}>
        <BadgeBox />
      </Badge>

      <Badge value={100} max={200}>
        <BadgeBox />
      </Badge>
    </Space>
  )
}
