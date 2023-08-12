import { Loading, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Loading
        color="var(--sar-primary)"
        textColor="var(--sar-primary)"
        text="加载中"
      />
      <Loading
        color="var(--sar-primary)"
        textColor="var(--sar-primary)"
        text="加载中"
        type="clock"
      />
    </Space>
  )
}
