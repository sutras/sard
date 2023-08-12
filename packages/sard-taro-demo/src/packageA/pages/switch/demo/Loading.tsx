import { Space, Switch } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Switch loading />
      <Switch defaultChecked loading />
    </Space>
  )
}
