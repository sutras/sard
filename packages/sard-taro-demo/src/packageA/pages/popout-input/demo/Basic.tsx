import {
  Calendar,
  Cascader,
  DatetimePicker,
  Form,
  Picker,
  PopoutInput,
} from 'sard-taro'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  return (
    <Form>
      <Form.Field label="日历">
        <PopoutInput title="日历" inputProps={{ placeholder: '请选择' }}>
          <Calendar />
        </PopoutInput>
      </Form.Field>

      <Form.Field label="级联选择">
        <PopoutInput title="级联选择" inputProps={{ placeholder: '请选择' }}>
          <Cascader
            options={regionData}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </PopoutInput>
      </Form.Field>

      <Form.Field label="日期时间">
        <PopoutInput title="日期时间" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker />
        </PopoutInput>
      </Form.Field>

      <Form.Field label="选择器">
        <PopoutInput title="选择器" inputProps={{ placeholder: '请选择' }}>
          <Picker
            columns={Array(5)
              .fill(0)
              .map((_, i) => `选项${i}`)}
          />
        </PopoutInput>
      </Form.Field>
    </Form>
  )
}
