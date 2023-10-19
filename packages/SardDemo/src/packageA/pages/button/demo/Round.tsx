import { Button, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Button round>default</Button>
      <Button round type="pale">
        pale
      </Button>
      <Button round type="mild">
        mild
      </Button>
      <Button round type="outline">
        outline
      </Button>
      <Button round type="text">
        text
      </Button>
      <Button round type="pale-text">
        pale-text
      </Button>
    </Space>
  )
}
