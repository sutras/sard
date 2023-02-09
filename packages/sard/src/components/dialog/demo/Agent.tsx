/*
### 代理

代理通过预先放置带有可选id属性的组件，通过命令式指定id进行调用。
*/

import { Dialog, Button } from 'sard'

export default function () {
  const showAlert = () => {
    Dialog.alert({
      title: '提示',
      message: '此功能暂时无法使用',
    })
  }

  const showConfirm = () => {
    Dialog.confirm({
      title: '提示',
      message: '确定删除？',
    })
  }

  const asyncClose = () => {
    Dialog.confirm({
      title: '提示',
      message: '确定删除？',
      showCancel: true,
      beforeClose(done, type) {
        if (type === 'confirm') {
          setTimeout(done, 1000)
        } else {
          done()
        }
      },
    })
  }

  return (
    <>
      <Button onClick={showAlert}>显示提示框</Button>{' '}
      <Button onClick={showConfirm}>显示确定框</Button>{' '}
      <Button onClick={asyncClose}>异步关闭</Button>
      <Dialog.Agent />
    </>
  )
}
