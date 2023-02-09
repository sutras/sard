/*
### 圆角按钮
*/

import { Dialog, Button } from 'sard'

export default function () {
  const showAlert = () => {
    Dialog.alert({
      title: '提示',
      message: '此功能暂时无法使用',
      buttonType: 'round',
    })
  }

  const showConfirm = () => {
    Dialog.confirm({
      title: '提示',
      message: '确定删除？',
      buttonType: 'round',
    })
  }

  return (
    <>
      <Button onClick={showAlert}>显示提示框</Button>{' '}
      <Button onClick={showConfirm}>显示确定框</Button>
    </>
  )
}
