import { Checkbox, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Checkbox disabled checked>
        复选框
      </Checkbox>
      <Checkbox disabled>复选框</Checkbox>
    </Space>
  )
}
