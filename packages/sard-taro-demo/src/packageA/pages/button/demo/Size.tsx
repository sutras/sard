import { Button, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Button size="mini">迷你尺寸</Button>
      <Button size="small">小尺寸</Button>
      <Button>默认尺寸</Button>
      <Button size="large">大尺寸</Button>
    </Space>
  )
}
