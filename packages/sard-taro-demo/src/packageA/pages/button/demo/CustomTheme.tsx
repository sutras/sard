import { Button, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Button style={{ background: 'fuchsia' }}>default</Button>
      <Button
        style={{ background: 'rgba(255, 0, 255, 0.2)', color: 'fuchsia' }}
        type="pale"
      >
        pale
      </Button>
      <Button style={{ color: 'fuchsia' }} type="mild">
        mild
      </Button>
      <Button style={{ color: 'fuchsia' }} type="outline">
        outline
      </Button>
      <Button style={{ color: 'fuchsia' }} type="text">
        text
      </Button>
      <Button style={{ color: 'fuchsia' }} type="pale-text">
        pale-text
      </Button>
      <Button
        style={{ background: 'linear-gradient(to right, orange, fuchsia)' }}
      >
        渐变色
      </Button>
    </Space>
  )
}
