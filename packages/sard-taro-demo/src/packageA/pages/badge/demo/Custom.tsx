import { Badge, Icon, Space } from 'sard-taro'

import BadgeBox from './BadgeBox'

export default () => {
  return (
    <Space gap="medium" direction="horizontal">
      <Badge value={<Icon name="question" color="white" />}>
        <BadgeBox />
      </Badge>
    </Space>
  )
}
