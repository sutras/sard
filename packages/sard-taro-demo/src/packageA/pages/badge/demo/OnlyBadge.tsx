import { Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="medium" direction="horizontal">
      <Badge value={10} />
      <Badge isDot />
    </Space>
  )
}
