import { Input } from 'sard-taro'

export default () => {
  return (
    <Input
      placeholder="请输入"
      borderless
      style={{
        height: 30,
        borderRadius: 'var(--sar-rounded-full)',
        backgroundColor: 'var(--sar-secondary-bg)',
      }}
    />
  )
}
