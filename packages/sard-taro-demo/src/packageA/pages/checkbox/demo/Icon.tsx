import { Checkbox, Icon } from 'sard-taro'

export default () => {
  return (
    <Checkbox
      icon={(checked) => (
        <Icon
          family="demo-icons"
          size={20}
          color={checked ? 'tomato' : '#bbb'}
          name={checked ? 'heart-fill' : 'heart'}
        />
      )}
    >
      复选框
    </Checkbox>
  )
}
