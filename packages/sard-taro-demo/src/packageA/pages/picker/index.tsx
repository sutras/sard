import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Picker, Popout, Toast } from 'sard-taro'
import { getRegionData } from 'region-data'
import { useState } from 'react'

import './index.scss'

export default () => {
  const regionData = getRegionData()

  const handleChange = (value, selectedOptions, selectedIndex) => {
    console.log('change: ', value, selectedOptions, selectedIndex)
    Toast.show(JSON.stringify(value))
  }

  const [arrayValue, setArrayValue] = useState<(string | number)[]>()
  const array = ['北京市', '天津市', '河北省', '山东省']

  const [objectArrayValue, setObjectArrayValue] =
    useState<(string | number)[]>()
  const objectArray = [
    {
      code: 110000,
      name: '北京市',
    },
    {
      code: 120000,
      name: '天津市',
    },
    {
      code: 130000,
      name: '河北省',
    },
    {
      code: 140000,
      name: '山东省',
    },
  ]

  const [multiArrayValue, setMultiArrayValue] = useState<(string | number)[]>()
  const multiArray = [
    Array(10)
      .fill(0)
      .map((_, index) => 2000 + index + '年'),
    Array(12)
      .fill(0)
      .map((_, index) => 1 + index + '月'),
  ]

  const [objectMultiArrayValue, setObjectMultiArrayValue] =
    useState<(string | number)[]>()
  const objectMultiArray = [
    Array(10)
      .fill(0)
      .map((_, index) => ({
        value: 2000 + index,
        label: 2000 + index + '年',
      })),
    Array(12)
      .fill(0)
      .map((_, index) => ({
        value: 1 + index,
        label: 1 + index + '月',
      })),
  ]

  const [cascaderValue, setCascaderValue] = useState<(number | string)[]>()
  const [popoutCascaderValue, setPopoutCascaderValue] = useState<number[]>()

  return (
    <Page className="page-Picker">
      <Toast.Agent />

      <Demo title="普通选择器" full>
        <Cell.Group card>
          <Cell
            linkable
            title="设置为: 天津市"
            onClick={() => setArrayValue(['天津市'])}
          />
          <Cell>
            <Picker
              value={arrayValue}
              columns={array}
              onChange={(value, ...restArgs) => {
                setArrayValue(value)
                handleChange(value, ...restArgs)
              }}
            />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="对象类型数组" full>
        <Cell.Group card>
          <Cell
            linkable
            title="设置为: 天津市"
            onClick={() => setObjectArrayValue([120000])}
          />
          <Cell>
            <Picker
              value={objectArrayValue}
              columns={objectArray}
              optionKeys={{ label: 'name', value: 'code' }}
              onChange={(value, ...restArgs) => {
                setObjectArrayValue(value)
                handleChange(value, ...restArgs)
              }}
            />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="多列" full>
        <Cell.Group card>
          <Cell
            linkable
            title="设置为: 2003年10月"
            onClick={() => setMultiArrayValue(['2003年', '10月'])}
          />
          <Cell>
            <Picker
              value={multiArrayValue}
              columns={multiArray}
              onChange={(value, ...restArgs) => {
                setMultiArrayValue(value)
                handleChange(value, ...restArgs)
              }}
            />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="对象类型多列" full>
        <Cell.Group card>
          <Cell
            linkable
            title="设置为: 2003年10月"
            onClick={() => setObjectMultiArrayValue([2003, 10])}
          />
          <Cell>
            <Picker
              value={objectMultiArrayValue}
              columns={objectMultiArray}
              onChange={(value, ...restArgs) => {
                setObjectMultiArrayValue(value)
                handleChange(value, ...restArgs)
              }}
            />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="级联选择" full>
        <Cell.Group card>
          <Cell
            linkable
            title="设置为: 广东省/广州市/天河区"
            onClick={() => setCascaderValue([440000, 440100, 440106])}
          />
          <Cell>
            <Picker
              value={cascaderValue}
              columns={regionData}
              optionKeys={{ label: 'name', value: 'code' }}
              onChange={(value, ...restArgs) => {
                setCascaderValue(value)
                handleChange(value, ...restArgs)
              }}
            />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="配合弹出框" full>
        <Cell.Group card>
          <Cell
            linkable
            title="广东省/广州市/天河区"
            onClick={() => setPopoutCascaderValue([440000, 440100, 440106])}
          />
          <Popout title="请选择省市区">
            <Popout.Outlet>
              {({ value, triggerArgs: [, options = []], setVisible }) => (
                <Cell
                  linkable
                  title="请选择省市区"
                  value={
                    (value && options.map((option) => option.name).join('/')) ||
                    ''
                  }
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Picker
                value={popoutCascaderValue}
                columns={regionData}
                optionKeys={{ label: 'name', value: 'code' }}
              />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>
    </Page>
  )
}
