import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Dialog } from 'sard-taro'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  return (
    <Page className="page-dialog">
      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell linkable title="显示提示框" onClick={() => setVisible(true)} />
          <Cell linkable title="显示确认框" onClick={() => setVisible2(true)} />
        </Cell.Group>

        <Dialog
          visible={visible}
          title="提示"
          message="此功能暂时无法使用"
          onVisible={setVisible}
        ></Dialog>

        <Dialog
          visible={visible2}
          title="提示"
          message="此功能暂时无法使用"
          onVisible={setVisible2}
          showCancel
        ></Dialog>
      </Demo>

      <Demo title="命令式" full>
        <Dialog.Agent />

        <Cell.Group card>
          <Cell
            linkable
            title="显示提示框"
            onClick={() => {
              Dialog.alert({
                title: '提示',
                message: '此功能暂时无法使用',
              })
            }}
          />
          <Cell
            linkable
            title="显示确定框"
            onClick={() => {
              Dialog.confirm({
                title: '提示',
                message: '确定删除？',
              })
            }}
          />
        </Cell.Group>
      </Demo>

      <Demo title="异步关闭" full>
        <Cell.Group card>
          <Cell
            linkable
            title="done 回调异步关闭"
            onClick={() => {
              Dialog.confirm({
                title: '提示',
                message: '确定删除？',
                beforeClose: (done, type) => {
                  if (type === 'confirm') {
                    setTimeout(() => {
                      done()
                    }, 1000)
                  } else {
                    done()
                  }
                },
              })
            }}
          />
          <Cell
            linkable
            title="Promise 异步关闭"
            onClick={() => {
              Dialog.confirm({
                title: '提示',
                message: '确定删除？',
                beforeClose: (_, type) => {
                  return new Promise<void>((resolve) => {
                    if (type === 'confirm') {
                      setTimeout(() => {
                        resolve()
                      }, 1000)
                    } else {
                      resolve()
                    }
                  })
                },
              })
            }}
          />
        </Cell.Group>
      </Demo>

      <Demo title="圆角按钮" full>
        <Cell.Group card>
          <Cell
            linkable
            title="显示提示框"
            onClick={() => {
              Dialog.alert({
                title: '提示',
                message: '此功能暂时无法使用',
                buttonType: 'round',
              })
            }}
          />
          <Cell
            linkable
            title="显示确定框"
            onClick={() => {
              Dialog.confirm({
                title: '提示',
                message: '确定删除？',
                buttonType: 'round',
              })
            }}
          />
        </Cell.Group>
      </Demo>

      <Demo title="有头部的" full>
        <Cell.Group card>
          <Cell
            linkable
            title="显示提示框"
            onClick={() => {
              Dialog.alert({
                title: '提示',
                message: '此功能暂时无法使用',
                buttonType: 'round',
                headed: true,
              })
            }}
          />
          <Cell
            linkable
            title="显示确定框"
            onClick={() => {
              Dialog.confirm({
                title: '提示',
                message: '确定删除？',
                buttonType: 'round',
                headed: true,
              })
            }}
          />
          <Cell
            linkable
            title="显示提示框-无标题"
            onClick={() => {
              Dialog.alert({
                message: '此功能暂时无法使用',
                buttonType: 'round',
                headed: true,
              })
            }}
          />
          <Cell
            linkable
            title="显示确定框-无标题"
            onClick={() => {
              Dialog.confirm({
                message: '确定删除？',
                buttonType: 'round',
                headed: true,
              })
            }}
          />
        </Cell.Group>
      </Demo>
    </Page>
  )
}
