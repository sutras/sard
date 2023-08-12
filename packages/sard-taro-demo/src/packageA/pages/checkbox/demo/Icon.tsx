import { Checkbox, Icon } from 'sard-taro'

export default () => {
  return (
    <Checkbox
      icon={(checked) => (
        <Icon prefix="demo-icon" name={checked ? 'heart-fill' : 'heart'} />
      )}
    >
      复选框
    </Checkbox>
  )
}
