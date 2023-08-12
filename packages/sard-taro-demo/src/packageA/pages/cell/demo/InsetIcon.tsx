import { Cell, Icon } from 'sard-taro'

export default () => {
  return (
    <Cell.Group inset>
      <Cell
        title="下载"
        linkable
        icon={
          <Icon
            size={20}
            prefix="demo-icon"
            name="arrow-down-square-fill"
            color="#4994EC"
          />
        }
      />
      <Cell
        title="订阅"
        linkable
        icon={
          <Icon size={20} prefix="demo-icon" name="rss-fill" color="#E78A3D" />
        }
      />
      <Cell
        title="视频"
        linkable
        icon={
          <Icon
            size={20}
            prefix="demo-icon"
            name="caret-left-square-fill"
            color="#C24F4A"
          />
        }
      />
    </Cell.Group>
  )
}
