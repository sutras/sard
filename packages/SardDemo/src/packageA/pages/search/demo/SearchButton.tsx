import { Search, Toast } from 'sard'

export default () => {
  return (
    <Search placeholder="请输入关键词" search="搜索" onSearch={Toast.show} />
  )
}
