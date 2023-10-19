import { Button, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Space direction="horizontal" gap="small">
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
      </Space>

      <Space direction="horizontal" gap="medium">
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
      </Space>

      <Space direction="horizontal" gap="large">
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
      </Space>

      <Space direction="horizontal" gap={40}>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
      </Space>
    </Space>
  )
}
