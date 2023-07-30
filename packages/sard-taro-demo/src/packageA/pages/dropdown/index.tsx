import Demo from '@/components/demo'
import Page from '@/components/page'
import { Button, Cell, Dropdown, Icon, Switch } from 'sard-taro'
import { useState } from 'react'

import './index.scss'

export default () => {
  const options1 = [
    {
      label: '距离优先',
      value: '1',
    },
    {
      label: '速度优先',
      value: '2',
    },
    {
      label: '评分优先',
      value: '3',
    },
  ]
  const options2 = [
    {
      label: '30分钟内',
      value: '1',
    },
    {
      label: '40分钟内',
      value: '2',
    },
    {
      label: '50分钟内',
      value: '3',
    },
  ]

  const [visible, setVisible] = useState(false)

  return (
    <Page className="page-dropdown">
      <Demo title="基础使用" full>
        <Dropdown>
          <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
          <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
        </Dropdown>
      </Demo>

      <Demo title="占位符" full>
        <Dropdown>
          <Dropdown.Item options={options1} placeholder="排序"></Dropdown.Item>
          <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
        </Dropdown>
      </Demo>

      <Demo title="添加 label" full>
        <Dropdown>
          <Dropdown.Item label="排序" options={options1}></Dropdown.Item>
          <Dropdown.Item
            label="速度"
            options={options2}
            defaultValue="2"
          ></Dropdown.Item>
        </Dropdown>
      </Demo>

      <Demo title="向上展开" full>
        <Dropdown direction="up">
          <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
          <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
        </Dropdown>
      </Demo>

      <Demo title="禁用" full>
        <Dropdown disabled>
          <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
          <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
        </Dropdown>
      </Demo>

      <Demo title="自定义箭头" full>
        <Dropdown
          arrow={(visible) => {
            return <Icon name={visible ? 'up' : 'down'}></Icon>
          }}
        >
          <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
          <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
        </Dropdown>
      </Demo>

      <Demo title="自定义内容" full>
        <Dropdown>
          <Dropdown.Item options={options1} defaultValue="1"></Dropdown.Item>
          <Dropdown.Item title="筛选" visible={visible} onVisible={setVisible}>
            <Cell.Group inlaid>
              <Cell title="包邮" value={<Switch></Switch>}></Cell>
              <Cell title="团购" value={<Switch></Switch>}></Cell>
              <Cell>
                <Button block onClick={() => setVisible(false)}>
                  确认
                </Button>
              </Cell>
            </Cell.Group>
          </Dropdown.Item>
        </Dropdown>
      </Demo>
    </Page>
  )
}
