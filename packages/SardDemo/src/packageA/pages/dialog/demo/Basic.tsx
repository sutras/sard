import { List, Dialog } from 'sard'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="显示提示框"
        onClick={() => {
          Dialog.alert({
            title: '提示',
            message: '此功能暂时无法使用',
          })
        }}
      />
      <List.Item
        linkable
        title="显示确定框"
        onClick={() => {
          Dialog.confirm({
            title: '提示',
            message: '确定删除？',
          })
        }}
      />
      <List.Item
        linkable
        title="无标题"
        onClick={() => {
          Dialog.confirm({
            message:
              '孤村落日残霞，轻烟老树寒鸦，一点飞鸿影下。青山绿水，白草红叶黄花。',
          })
        }}
      />
    </List>
  )
}
