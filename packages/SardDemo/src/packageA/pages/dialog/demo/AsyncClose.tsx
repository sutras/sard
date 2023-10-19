import { List, Dialog } from 'sard'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="确定按钮异步关闭"
        onClick={() => {
          Dialog.confirm({
            title: '提示',
            message: '点击确定按钮会在一秒钟后关闭',
            onConfirm: () => {
              return new Promise<void>((resolve) => {
                setTimeout(resolve, 1000)
              })
            },
          })
        }}
      />

      <List.Item
        linkable
        title="取消按钮异步关闭"
        onClick={() => {
          Dialog.confirm({
            title: '提示',
            message: '点击取消按钮会在一秒钟后关闭',
            onCancel: () => {
              return new Promise<void>((resolve) => {
                setTimeout(resolve, 1000)
              })
            },
          })
        }}
      />
    </List>
  )
}
