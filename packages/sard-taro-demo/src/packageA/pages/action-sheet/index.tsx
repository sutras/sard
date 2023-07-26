import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'
import { useState } from 'react'
import { ActionSheet, ActionSheetItemProps, Cell, Toast } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible4, setVisible4] = useState(false)
  const [visible5, setVisible5] = useState(false)
  const [visible6, setVisible6] = useState(false)

  const handleSelect = (item: ActionSheetItemProps, index: number) => {
    Toast.show(JSON.stringify(item) + `, 下标：${index}`)
  }

  const itemList = [
    {
      title: '动作1',
    },
    {
      title: '动作2',
      label: '这是一个描述',
    },
    {
      title: '动作3',
    },
  ]

  return (
    <Page className="page-action-sheet">
      <Toast.Agent />

      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell isLink title="显示动作面板" onClick={() => setVisible(true)} />
        </Cell.Group>

        <ActionSheet
          visible={visible}
          itemList={itemList}
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible}
        />
      </Demo>

      <Demo title="手动声明项目组件" full>
        <Cell.Group card>
          <Cell isLink title="显示动作面板" onClick={() => setVisible6(true)} />
        </Cell.Group>

        <ActionSheet
          visible={visible6}
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible6}
        >
          <ActionSheet.Item title="动作1" />
          <ActionSheet.Item title="动作2" label="这是一个描述" />
          <ActionSheet.Item title="动作3" />
        </ActionSheet>
      </Demo>

      <Demo title="取消按钮" full>
        <Cell.Group card>
          <Cell isLink title="显示动作面板" onClick={() => setVisible2(true)} />
        </Cell.Group>

        <ActionSheet
          visible={visible2}
          cancel="取消"
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible2}
        >
          <ActionSheet.Item title="动作1" />
          <ActionSheet.Item title="动作2" />
          <ActionSheet.Item title="动作3" />
        </ActionSheet>
      </Demo>

      <Demo title="状态" full>
        <Cell.Group card>
          <Cell isLink title="显示动作面板" onClick={() => setVisible4(true)} />
        </Cell.Group>

        <ActionSheet
          visible={visible4}
          cancel="取消"
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible4}
        >
          <ActionSheet.Item title="动作1" color="red" />
          <ActionSheet.Item title="动作2" disabled />
          <ActionSheet.Item title="动作3" loading />
        </ActionSheet>
      </Demo>

      <Demo title="标题&描述" full>
        <Cell.Group card>
          <Cell isLink title="显示动作面板" onClick={() => setVisible5(true)} />
        </Cell.Group>

        <ActionSheet
          title="这是标题"
          description="这是描述"
          visible={visible5}
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible5}
        >
          <ActionSheet.Item title="动作1" />
          <ActionSheet.Item title="动作2" />
          <ActionSheet.Item title="动作3" />
        </ActionSheet>
      </Demo>
    </Page>
  )
}
