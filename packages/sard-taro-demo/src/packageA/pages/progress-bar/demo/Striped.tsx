import { ProgressBar, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <ProgressBar
        percent={50}
        striped
        thickness="10px"
        style={{ marginBottom: 10 }}
      />
      <ProgressBar percent={50} striped thickness="10px" animated />
    </Space>
  )
}
