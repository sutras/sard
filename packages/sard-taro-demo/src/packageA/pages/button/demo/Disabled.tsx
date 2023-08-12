import { Button, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Button disabled>default</Button>
      <Button disabled type="pale">
        pale
      </Button>
      <Button disabled type="mild">
        mild
      </Button>
      <Button disabled type="outline">
        outline
      </Button>
      <Button disabled type="text">
        text
      </Button>
      <Button disabled type="pale-text">
        pale-text
      </Button>
    </Space>
  )
}
