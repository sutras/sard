import { useState } from 'react'
import { Space, Switch } from 'sard-taro'

export default () => {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleChange = (checked: boolean) => {
    setLoading(true)
    setTimeout(() => {
      setChecked(checked)
      setLoading(false)
    }, 500)
  }

  return (
    <Space vertical>
      <Switch checked={checked} loading={loading} onChange={handleChange} />
    </Space>
  )
}
