import { Search, Toast } from 'sard-taro'

export default () => {
  return (
    <Search placeholder="请输入关键词" search="搜索" onSearch={Toast.show} />
  )
}
