import { Input } from 'sard-taro'

export default () => {
  return (
    <Input
      placeholder="请输入"
      style={{
        color: 'orange',
        borderColor: 'orange',
        textAlign: 'center',
        borderRadius: '9999px',
        background: 'rgba(0,0,0,.05)',
      }}
    />
  )
}
