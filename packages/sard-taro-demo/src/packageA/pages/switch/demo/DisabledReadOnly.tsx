import { Space, Switch } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Switch disabled />
      <Switch defaultChecked disabled />

      <Switch readOnly />
      <Switch defaultChecked readOnly />
    </Space>
  )
}
