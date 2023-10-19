import { Input } from 'sard'

export default () => {
  return (
    <Input
      defaultValue="可清除的"
      placeholder="可清除的"
      clearable
      showClearOnlyFocus
    />
  )
}
