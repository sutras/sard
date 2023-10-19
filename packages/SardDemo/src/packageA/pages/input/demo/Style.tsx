import { Input } from 'sard'

export default () => {
  return (
    <Input
      placeholder="请输入"
      borderless
      style={{
        height: 32,
        borderRadius: 9999,
        color: 'white',
        backgroundColor: 'tomato',
        textAlign: 'center',
      }}
      placeholderStyle="color: rgba(255,255,255,.6)"
    />
  )
}
