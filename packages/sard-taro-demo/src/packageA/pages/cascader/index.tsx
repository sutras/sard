import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cascader, Cell, Popout, Toast } from 'sard-taro'
import { useState } from 'react'
import { View } from '@tarojs/components'
import { getRegionData } from 'region-data'

import './index.scss'

const regionData = getRegionData()

export default () => {
  const handleChange = (_, otpions) => {
    Toast.show(otpions.map((item) => item.name).join('/'))
  }

  const [options, setOptions] = useState(
    Array(10)
      .fill(0)
      .map((_, i) => {
        return {
          label: 'label' + i,
          value: i,
          children: [],
        }
      }),
  )

  const handleSelect = (option, columnIndex) => {
    if (columnIndex < 2 && option.children.length === 0) {
      Toast.loading('加载中')

      setTimeout(() => {
        option.children = Array(10)
          .fill(0)
          .map((_, i) => {
            return {
              label: option.label + '-label' + i,
              value: option.value + '-' + i,
              children: columnIndex < 1 ? [] : null,
            }
          })

        setOptions(options.slice())
        Toast.hide()
      }, 500)
    }
  }

  const disabledOptions = Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        label: `label${i}`,
        value: `${i}`,
        disabled: i < 3,
        children: Array(10)
          .fill(0)
          .map((_, j) => {
            return {
              label: `label${i}-label${j}`,
              value: `${i}-${j}`,
              disabled: j < 3,
            }
          }),
      }
    })

  return (
    <Page className="page-cascader">
      <Toast.Agent />

      <Demo title="基础使用">
        <Cascader
          options={regionData}
          value={440111}
          fieldNames={{ label: 'name', value: 'code' }}
          onChange={handleChange}
        />
      </Demo>

      <Demo title="配合弹出框使用" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择省市区">
            <Popout.Outlet>
              {({ value, triggerArgs: [, options = []], setVisible }) => (
                <Cell
                  isLink
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
              <Cascader
                defaultValue={440111}
                options={regionData}
                fieldNames={{ label: 'name', value: 'code' }}
              />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="异步加载" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择">
            <Popout.Outlet>
              {({ value, triggerArgs: [, options = []], setVisible }) => (
                <Cell
                  title="请选择"
                  value={
                    (value &&
                      options.map((option) => option.label).join('/')) ||
                    ''
                  }
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Cascader options={options} onSelect={handleSelect} />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="自定义选项上方内容" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择">
            <Popout.Outlet>
              {({ value, triggerArgs: [, options = []], setVisible }) => (
                <Cell
                  title="请选择"
                  value={
                    (value && options.map((option) => option.name).join('/')) ||
                    ''
                  }
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Cascader
                options={regionData}
                fieldNames={{ label: 'name', value: 'code' }}
                optionTop={(columnIndex) => (
                  <View
                    style={{
                      padding: '8px var(--sar-cascader-option-padding-x)',
                      backgroundColor: 'rgba(var(--sar-warning-rgb), 0.1)',
                      color: 'var(--sar-warning-text)',
                    }}
                  >
                    当前为第{columnIndex + 1}级
                  </View>
                )}
              />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="禁选选项" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择">
            <Popout.Outlet>
              {({ value, triggerArgs: [, options = []], setVisible }) => (
                <Cell
                  title="请选择"
                  value={
                    (value &&
                      options.map((option) => option.label).join('/')) ||
                    ''
                  }
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Cascader options={disabledOptions} />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>
    </Page>
  )
}
