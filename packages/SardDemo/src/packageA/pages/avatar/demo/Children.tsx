import { Avatar, Icon, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Avatar>
        <Icon name="question" size={32} color="#666" />
      </Avatar>

      <Avatar>字</Avatar>
    </Space>
  )
}
