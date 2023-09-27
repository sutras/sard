import { List, Toast } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="文本提示"
        onClick={() => Toast.show('文本提示')}
      />
      <List.Item
        linkable
        title="很长的文本"
        onClick={() =>
          Toast.show(
            '春山暖日和风，阑干楼阁帘栊，杨柳秋千院中。啼莺舞燕，小桥流水飞红。',
          )
        }
      />
      <List.Item
        linkable
        title="成功提示"
        onClick={() => Toast.success('成功')}
      />
      <List.Item linkable title="失败提示" onClick={() => Toast.fail('失败')} />
      <List.Item
        linkable
        title="加载中提示"
        onClick={() => Toast.loading('加载中')}
      />
      <List.Item linkable title="隐藏提示" onClick={() => Toast.hide()} />
    </List>
  )
}
