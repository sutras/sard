import { List } from 'sard-taro'

export default () => {
  return (
    <List>
      <List.Item title="标题" />
      <List.Item title="标题" value="值" />
      <List.Item title="标题" value="值" label="标签" />
      <List.Item
        title="很长的标题标题标题标题标题标题标题标题标题标题标题标题"
        value="值值"
      />
      <List.Item
        title="标题"
        value="很长的值值值值值值值值值值值值值值值值值值值值值值值值"
      />
      <List.Item
        title="很长的标题标题标题标题标题标题标题标题"
        value="很长的值值值值值值值值值值值值值值值值"
        label="很长的标签标签标签标签标签标签标签标签"
      />
    </List>
  )
}
