/*
### 命令式
 */

import { Toast, Button } from 'sard'

export default function () {
  return (
    <>
      <Button onClick={() => Toast.show('文本提示')}>文本提示</Button>{' '}
      <Button onClick={() => Toast.success('成功')}>成功提示</Button>{' '}
      <Button
        onClick={() =>
          Toast.fail('失败', {
            onTimeout() {
              console.log('onTimeout')
            },
          })
        }
      >
        失败提示
      </Button>{' '}
      <Button onClick={() => Toast.loading('加载中')}>加载中提示</Button>{' '}
      <Button onClick={() => Toast.hide()}>隐藏提示</Button>
    </>
  )
}
