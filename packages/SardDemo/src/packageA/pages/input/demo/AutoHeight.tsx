import { Input, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Input type="textarea" autoHeight placeholder="autoHeight" />
      <Input
        type="textarea"
        autoHeight
        style={{ maxHeight: 100 }}
        placeholder="{ maxHeight: 100 }"
      />
      <Input
        type="textarea"
        autoHeight
        style={{ minHeight: 100, maxHeight: 200 }}
        placeholder="{ minHeight: 100, maxHeight: 200 }"
      />
    </Space>
  )
}
