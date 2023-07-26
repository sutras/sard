import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Toast, ToastProps } from 'sard-taro'
import { useState } from 'react'

import './index.scss'
import pic1 from '@/static/pic1.jpg'

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
    <Page className="page-toast">
      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell
            isLink
            title="文本提示"
            onClick={() => showToast('text', '文本提示')}
          />
          <Cell
            isLink
            title="成功提示"
            onClick={() => showToast('success', '成功')}
          />

          <Cell
            isLink
            title="失败提示"
            onClick={() => showToast('fail', '失败')}
          />
          <Cell
            isLink
            title="加载中提示"
            onClick={() => showToast('loading', '加载中')}
          />
          <Cell isLink title="隐藏提示" onClick={() => setVisible(false)} />
        </Cell.Group>

        <Toast
          visible={visible}
          type={type}
          title={title}
          onTimeout={setVisible}
        ></Toast>
      </Demo>

      <Demo title="命令式" full>
        <Toast.Agent />

        <Cell.Group card>
          <Cell
            isLink
            title="文本提示"
            onClick={() => Toast.show('文本提示')}
          />
          <Cell isLink title="成功提示" onClick={() => Toast.success('成功')} />
          <Cell isLink title="失败提示" onClick={() => Toast.fail('失败')} />
          <Cell
            isLink
            title="加载中提示"
            onClick={() => Toast.loading('加载中')}
          />
          <Cell isLink title="隐藏提示" onClick={() => Toast.hide()} />
        </Cell.Group>
      </Demo>

      <Demo title="自定义图标" full>
        <Cell.Group card>
          <Cell
            isLink
            title="图标提示框"
            onClick={() => {
              Toast.show('笑一笑', {
                iconProps: {
                  prefix: 'demo-icon',
                  name: 'emoji-smile',
                },
              })
            }}
          />
          <Cell
            isLink
            title="图片提示框"
            onClick={() => {
              Toast.show('Sard', {
                iconProps: {
                  name: pic1,
                },
              })
            }}
          />
        </Cell.Group>
      </Demo>

      <Demo title="自定义位置" full>
        <Cell.Group card>
          <Cell
            isLink
            title="顶部位置"
            onClick={() => {
              Toast.show('顶部位置', {
                placement: 'top',
              })
            }}
          />
          <Cell
            isLink
            title="底部位置"
            onClick={() => {
              Toast.show('底部位置', {
                placement: 'bottom',
              })
            }}
          />
        </Cell.Group>
      </Demo>

      <Demo title="加载中的背景" full>
        <Cell.Group card>
          <Cell
            isLink
            title="显示背景"
            onClick={() => {
              Toast.loading('加载中', {
                mask: true,
              })

              setTimeout(() => {
                Toast.hide()
              }, 2000)
            }}
          />

          <Cell
            isLink
            title="透明背景"
            onClick={() => {
              Toast.loading('加载中', {
                mask: true,
                clearMask: true,
              })

              setTimeout(() => {
                Toast.hide()
              }, 2000)
            }}
          />
        </Cell.Group>
      </Demo>
    </Page>
  )
}
