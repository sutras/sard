import { useState } from 'react'
import { Cell, Toast, ToastProps } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<ToastProps['type']>('text')
  const [title, setTitle] = useState<ToastProps['title']>('')

  const showToast = (type: ToastProps['type'], title: ToastProps['title']) => {
    setType(type)
    setTitle(title)
    setVisible(true)
  }

  return (
    <>
      <Cell.Group card>
        <Cell
          linkable
          title="文本提示"
          onClick={() => showToast('text', '文本提示')}
        />
        <Cell
          linkable
          title="成功提示"
          onClick={() => showToast('success', '成功')}
        />

        <Cell
          linkable
          title="失败提示"
          onClick={() => showToast('fail', '失败')}
        />
        <Cell
          linkable
          title="加载中提示"
          onClick={() => showToast('loading', '加载中')}
        />
        <Cell linkable title="隐藏提示" onClick={() => setVisible(false)} />
      </Cell.Group>

      <Toast
        visible={visible}
        type={type}
        title={title}
        onTimeout={setVisible}
      />
    </>
  )
}
