import { List } from 'sard-taro'

export default () => {
  return (
    <List>
      <List.Item linkable title="标题" />
      <List.Item linkable title="标题" value="值" arrowDirection="down" />
      <List.Item linkable clickable={false} title="标题" />
    </List>
  )
}
