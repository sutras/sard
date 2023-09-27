import { Result } from 'sard-taro'

export default () => {
  return (
    <Result
      iconProps={{
        family: 'demo-icons',
        name: 'emoji-smile',
        color: 'black',
      }}
      title="笑一笑"
      description="请根据提示进行操作"
    />
  )
}
