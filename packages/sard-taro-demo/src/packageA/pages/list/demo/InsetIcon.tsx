import { List, Icon } from 'sard-taro'

export default () => {
  return (
    <List inset>
      <List.Item
        title="下载"
        linkable
        icon={
          <Icon
            size={20}
            family="demo-icons"
            name="arrow-down-square-fill"
            color="#4994EC"
          />
        }
      />
      <List.Item
        title="订阅"
        linkable
        icon={
          <Icon size={20} family="demo-icons" name="rss-fill" color="#E78A3D" />
        }
      />
      <List.Item
        title="视频"
        linkable
        icon={
          <Icon
            size={20}
            family="demo-icons"
            name="caret-left-square-fill"
            color="#C24F4A"
          />
        }
      />
    </List>
  )
}
