import { Result } from 'sard'

export default () => {
  return (
    <Result
      iconProps={{
        family: 'demo-icons',
        name: 'emoji-smile',
        color: 'tomato',
      }}
      title="笑一笑"
      description="请根据提示进行操作"
    />
  )
}
