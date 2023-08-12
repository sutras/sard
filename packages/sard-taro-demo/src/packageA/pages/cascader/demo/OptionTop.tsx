import { Cascader, Cell, Popout } from 'sard-taro'
import { getRegionData } from 'region-data'
import { View } from '@tarojs/components'

const regionData = getRegionData()

export default () => {
  return (
    <Cell.Group card bodyStyle={{ flex: 'none' }}>
      <Popout title="请选择">
        <Popout.Outlet>
          {({ triggerArgs: [, options = []], setVisible }) => (
            <Cell
              title="请选择"
              value={options.map((option) => option.name).join('/')}
              onClick={() => setVisible(true)}
              linkable
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
  )
}
