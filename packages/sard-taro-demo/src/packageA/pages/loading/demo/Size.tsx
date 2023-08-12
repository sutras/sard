import { Loading, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Loading size={24} />
      <Loading size={24} type="clock" />
    </Space>
  )
}
