import { ActionSheet, List, Toast } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="显示动作面板"
        onClick={() =>
          ActionSheet.show({
            itemList: ['动作1', '动作2', '动作3'],
            onSelect(index) {
              Toast.show(index)
            },
          })
        }
      />
    </List>
  )
}
