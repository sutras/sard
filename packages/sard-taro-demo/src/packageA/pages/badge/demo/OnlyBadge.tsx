import { Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="medium">
      <Badge value={10}></Badge>
      <Badge isDot></Badge>
    </Space>
  )
}
