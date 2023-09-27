import { List, Input } from 'sard-taro'

export default () => {
  return (
    <List card bodyStyle={{ maxWidth: 80 }}>
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
