import { Cascader, Toast } from 'sard-taro'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

export default () => {
  const handleChange = (_, otpions) => {
    Toast.show(otpions.map((item) => item.name).join('/'))
  }

  return (
    <Cascader
      options={regionData}
      value={440111}
      fieldNames={{ label: 'name', value: 'code' }}
      onChange={handleChange}
    />
  )
}
