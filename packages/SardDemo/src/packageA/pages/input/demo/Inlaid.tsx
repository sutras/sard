import { List, Input } from 'sard'

export default () => {
  return (
    <List bodyStyle={{ flexGrow: 0, width: 80 }}>
      <List.Item
        title="用户名"
        footer={<Input inlaid placeholder="嵌入的" />}
      />
      <List.Item
        title="密码"
        footer={<Input inlaid type="password" placeholder="嵌入的" />}
      />
    </List>
  )
}
