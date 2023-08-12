import { Icon, Result } from 'sard-taro'

export default () => {
  return (
    <Result
      icon={
        <Icon
          prefix="demo-icon"
          name="emoji-smile"
          color="var(--sar-tertiary-color)"
        />
      }
      title="笑一笑"
      description="请根据提示进行操作"
    />
  )
}
