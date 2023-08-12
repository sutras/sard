import { Cell, Input } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card bodyStyle={{ maxWidth: 80 }}>
      <Cell
        title="用户名"
        footer={<Input inlaid placeholder="嵌入的" />}
      ></Cell>
      <Cell
        title="密码"
        footer={<Input inlaid type="password" placeholder="嵌入的" />}
      ></Cell>
    </Cell.Group>
  )
}
