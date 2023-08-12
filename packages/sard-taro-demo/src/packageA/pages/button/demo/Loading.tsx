import { Button, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Button loading>primary</Button>
      <Button loading loadingText="加载中">
        primary
      </Button>
      <Button loading loadingText="加载中" loadingProps={{ type: 'clock' }}>
        primary
      </Button>
    </Space>
  )
}
