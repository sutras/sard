import { Cascader, List, PopoutInput } from 'sard-taro'
import { getRegionData } from 'region-data'
import { Text, View } from '@tarojs/components'

const regionData = getRegionData()

export default () => {
  return (
    <List card>
      <List.Item>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <Cascader
            options={regionData}
            fieldNames={{ label: 'name', value: 'code' }}
            optionTop={(columnIndex) => (
              <View
                style={{
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Text style={{ color: 'tomato' }}>
                  当前为第{columnIndex + 1}级
                </Text>
              </View>
            )}
          />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
