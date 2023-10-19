import { Badge, Space } from 'sard'

import BadgeBox from '../BadgeBox'

export default () => {
  return (
    <Space gap="medium" direction="horizontal">
      <Badge value={5} color="tomato">
        <BadgeBox />
      </Badge>

      <Badge isDot color="tomato">
        <BadgeBox />
      </Badge>

      <Badge value={5} color="#e3e3e3" textColor="#262626">
        <BadgeBox />
      </Badge>
    </Space>
  )
}
