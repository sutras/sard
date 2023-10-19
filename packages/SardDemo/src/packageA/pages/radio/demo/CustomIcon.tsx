import { Icon, Radio, Space } from 'sard'

export default () => {
  return (
    <Radio.Group
      defaultValue="option1"
      icon={(checked) => (
        <Icon
          family="demo-icons"
          size={20}
          color={checked ? 'tomato' : '#bbb'}
          name={checked ? 'heart-fill' : 'heart'}
        />
      )}
    >
      <Space gap="medium">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </Space>
    </Radio.Group>
  )
}
