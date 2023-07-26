import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Notify } from 'sard-taro'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <Page className="page-notify">
      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell isLink title="显示通知" onClick={() => setVisible(true)} />
          <Cell isLink title="隐藏通知" onClick={() => setVisible(false)} />
        </Cell.Group>

        <Notify
          visible={visible}
          message="这是一条通知"
          onTimeout={setVisible}
        />
      </Demo>

      <Demo title="命令式" full>
        <Notify.Agent />

        <Cell.Group card>
          <Cell
            isLink
            title="显示通知"
            onClick={() => Notify.show('这是一条通知')}
          />
          <Cell isLink title="隐藏通知" onClick={() => Notify.hide()} />
        </Cell.Group>
      </Demo>

      <Demo title="类型" full>
        <Cell.Group card>
          <Cell
            isLink
            title="成功通知"
            onClick={() => Notify.success('这是一条通知')}
          />
          <Cell
            isLink
            title="警告通知"
            onClick={() => Notify.warning('这是一条通知')}
          />
          <Cell
            isLink
            title="错误通知"
            onClick={() => Notify.error('这是一条通知')}
          />
          <Cell isLink title="隐藏通知" onClick={() => Notify.hide()} />
        </Cell.Group>
      </Demo>

      <Demo title="自定义颜色" full>
        <Cell.Group card>
          <Cell
            isLink
            title="显示通知"
            onClick={() =>
              Notify.show('这是一条通知', {
                color: 'black',
                background: 'fuchsia',
              })
            }
          />
          <Cell isLink title="隐藏通知" onClick={() => Notify.hide()} />
        </Cell.Group>
      </Demo>

      <Demo title="自定义时长" full>
        <Cell.Group card>
          <Cell
            isLink
            title="显示不会消失的通知"
            onClick={() =>
              Notify.show('这是一条通知', {
                duration: 0,
              })
            }
          />
          <Cell isLink title="隐藏通知" onClick={() => Notify.hide()} />
        </Cell.Group>
      </Demo>

      <Demo title="自定义位置" full>
        <Cell.Group card>
          <Cell
            isLink
            title="在底部显示通知"
            onClick={() =>
              Notify.show('这是一条通知', {
                placement: 'bottom',
              })
            }
          />
          <Cell isLink title="隐藏通知" onClick={() => Notify.hide()} />
        </Cell.Group>
      </Demo>
    </Page>
  )
}
