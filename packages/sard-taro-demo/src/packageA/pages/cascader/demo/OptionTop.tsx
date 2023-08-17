import { Cascader, Cell, PopoutInput } from 'sard-taro'
import { getRegionData } from 'region-data'
import { View } from '@tarojs/components'

const regionData = getRegionData()

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
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
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
