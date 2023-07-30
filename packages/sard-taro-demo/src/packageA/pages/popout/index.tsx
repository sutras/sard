import Demo from '@/components/demo'
import Page from '@/components/page'
import {
  Calendar,
  Cascader,
  Cell,
  DatetimePicker,
  Popout,
  Toast,
} from 'sard-taro'
import { useState } from 'react'
import { View } from '@tarojs/components'
import { getRegionData } from 'region-data'

import './index.scss'

const regionData = getRegionData()

export default () => {
  const [visible, setVisible] = useState(false)

  const [visible2, setVisible2] = useState(false)

  const [visible3, setVisible3] = useState(false)
  const [date, setDate] = useState<Date>()
  const [value, setValue] = useState('')

  const [value5, setValue5] = useState(new Date())

  return (
    <Page className="page-popout">
      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell linkable title="显示弹出框" onClick={() => setVisible(true)} />
        </Cell.Group>

        <Popout
          visible={visible}
          title="标题"
          onClose={setVisible}
          onConfirm={() => Toast.show('确定')}
          onCancel={() => Toast.show('取消')}
        >
          <View>弹出框内容</View>
          <View>弹出框内容</View>
          <View>弹出框内容</View>
        </Popout>
      </Demo>

      <Demo title="紧凑类型" full>
        <Cell.Group card>
          <Cell linkable title="显示弹出框" onClick={() => setVisible2(true)} />
        </Cell.Group>
        <Popout
          visible={visible2}
          title="标题"
          type="compact"
          onClose={setVisible2}
          onConfirm={() => Toast.show('确定')}
          onCancel={() => Toast.show('取消')}
        >
          <View>弹出框内容</View>
          <View>弹出框内容</View>
          <View>弹出框内容</View>
        </Popout>
      </Demo>

      <Demo title="结合日期组件" full>
        <Cell.Group card>
          <Cell
            linkable
            title="请选择日期"
            value={value}
            onClick={() => setVisible3(true)}
          />
        </Cell.Group>

        <Popout
          title="请选择日期"
          visible={visible3}
          onClose={setVisible3}
          onConfirm={() => setValue(date?.toLocaleDateString() || '')}
        >
          <Calendar value={date} onChange={setDate} />
        </Popout>
      </Demo>

      <Demo title="简化操作" full>
        <Popout title="请选择日期">
          <Popout.Outlet>
            {({ value, setVisible }) => (
              <Cell.Group card>
                <Cell
                  linkable
                  title="请选择日期"
                  value={value?.toLocaleDateString() || ''}
                  onClick={() => setVisible(true)}
                />
              </Cell.Group>
            )}
          </Popout.Outlet>
          <Popout.Target>
            <Calendar />
          </Popout.Target>
        </Popout>
      </Demo>

      <Demo title="受控的弹出框" full>
        <Popout title="请选择日期" value={value5} onChange={setValue5}>
          <Popout.Outlet>
            {({ value, setVisible }) => (
              <Cell.Group card>
                <Cell
                  linkable
                  title="请选择日期"
                  value={value?.toLocaleDateString() || ''}
                  onClick={() => setVisible(true)}
                />
              </Cell.Group>
            )}
          </Popout.Outlet>
          <Popout.Target>
            <Calendar />
          </Popout.Target>
        </Popout>
      </Demo>

      <Demo title="快捷确认" full>
        <Popout title="请选择日期" fast showConfirm={false}>
          <Popout.Outlet>
            {({ value, setVisible }) => (
              <Cell.Group card>
                <Cell
                  linkable
                  title="请选择日期"
                  value={value?.toLocaleDateString() || ''}
                  onClick={() => setVisible(true)}
                />
              </Cell.Group>
            )}
          </Popout.Outlet>
          <Popout.Target>
            <Calendar />
          </Popout.Target>
        </Popout>
      </Demo>

      <Demo title="结合 Cell 组件使用" full>
        <Cell.Group card>
          <Popout title="日历">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  onClick={() => setVisible(true)}
                  value={value?.toLocaleDateString()}
                  title="日历"
                  linkable
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar />
            </Popout.Target>
          </Popout>

          <Popout title="级联选择">
            <Popout.Outlet>
              {({ triggerArgs: [, options = []], setVisible }) => (
                <Cell
                  onClick={() => setVisible(true)}
                  value={options.map((option) => option.name).join('/')}
                  title="级联选择"
                  linkable
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Cascader
                options={regionData}
                fieldNames={{ label: 'name', value: 'code' }}
              />
            </Popout.Target>
          </Popout>

          <Popout title="日期时间">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  onClick={() => setVisible(true)}
                  value={value?.toLocaleString()}
                  title="日期时间"
                  linkable
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <DatetimePicker />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>
    </Page>
  )
}
