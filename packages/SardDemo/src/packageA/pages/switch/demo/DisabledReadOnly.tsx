import { Space, Switch } from 'sard'

export default () => {
  return (
    <Space>
      <Space direction="horizontal">
        <Switch readOnly />
        <Switch defaultChecked readOnly />
      </Space>

      <Space direction="horizontal">
        <Switch disabled />
        <Switch defaultChecked disabled />
      </Space>
    </Space>
  )
}
