/*
### 有头部的
*/

import { Dialog, Button } from 'sard'

export default function () {
  const showAlert = () => {
    Dialog.alert({
      title: '提示',
      message: '此功能暂时无法使用',
      buttonType: 'round',
      headed: true,
    })
  }

  const showConfirm = () => {
    Dialog.confirm({
      title: '提示',
      message: '确定删除？',
      buttonType: 'round',
      headed: true,
    })
  }

  const showUntitledAlert = () => {
    Dialog.alert({
      message: '此功能暂时无法使用',
      buttonType: 'round',
      headed: true,
    })
  }

  const showUntitledConfirm = () => {
    Dialog.confirm({
      message: '确定删除？',
      buttonType: 'round',
      headed: true,
    })
  }

  return (
    <>
      <Button onClick={showAlert}>显示提示框</Button>{' '}
      <Button onClick={showConfirm}>显示确定框</Button>{' '}
      <Button onClick={showUntitledAlert}>显示提示框-无标题</Button>{' '}
      <Button onClick={showUntitledConfirm}>显示确定框-无标题</Button>{' '}
    </>
  )
}
