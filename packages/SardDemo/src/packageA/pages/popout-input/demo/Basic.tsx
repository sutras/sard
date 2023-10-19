import {
  Calendar,
  Cascader,
  List,
  DatetimePicker,
  Picker,
  PopoutInput,
} from 'sard'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  return (
    <List card bodyStyle={{ width: 88, flexGrow: 0 }}>
      <List.Item
        title="日历"
        footer={
          <PopoutInput title="日历" inputProps={{ placeholder: '请选择' }}>
            <Calendar />
          </PopoutInput>
        }
      />

      <List.Item
        title="级联选择"
        footer={
          <PopoutInput title="级联选择" inputProps={{ placeholder: '请选择' }}>
            <Cascader
              options={regionData}
              fieldNames={{ label: 'name', value: 'code' }}
            />
          </PopoutInput>
        }
      />

      <List.Item
        title="日期时间"
        footer={
          <PopoutInput title="日期时间" inputProps={{ placeholder: '请选择' }}>
            <DatetimePicker />
          </PopoutInput>
        }
      />

      <List.Item
        title="选择器"
        footer={
          <PopoutInput title="选择器" inputProps={{ placeholder: '请选择' }}>
            <Picker
              columns={Array(5)
                .fill(0)
                .map((_, i) => `选项${i}`)}
            />
          </PopoutInput>
        }
      />
    </List>
  )
}
