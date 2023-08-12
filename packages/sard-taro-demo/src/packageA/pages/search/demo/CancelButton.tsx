import { Search, Toast } from 'sard-taro'

export default () => {
  return (
    <Search
      placeholder="请输入关键词"
      cancel="取消"
      onCancel={() => Toast.show('取消')}
    />
  )
}
