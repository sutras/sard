import { Input } from 'sard-taro'

export default () => {
  return (
    <Input
      placeholder="请输入"
      style={{
        borderRadius: 9999,
        borderColor: 'var(--sar-pink)',
        backgroundColor: '#fff',
      }}
    />
  )
}
