import { Loading, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Loading />
      <Loading type="clock" />
    </Space>
  )
}
