import { Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Badge value={10}></Badge>
      <Badge isDot style={{ marginLeft: '10px' }}></Badge>
    </Space>
  )
}
