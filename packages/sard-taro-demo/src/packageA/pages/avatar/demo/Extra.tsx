import { Avatar, Badge, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Avatar shape="square" extra={<Badge fixed value={5} />} />

      <Avatar
        extra={
          <Badge
            fixed
            value={5}
            style={{ top: '14.6447%', right: '14.6447%' }}
          />
        }
      />
    </Space>
  )
}
