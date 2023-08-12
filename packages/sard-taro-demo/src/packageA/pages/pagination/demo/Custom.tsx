import { Icon, Pagination } from 'sard-taro'

export default () => {
  return (
    <Pagination
      total={100}
      pageSize={10}
      prev={<Icon name="left"></Icon>}
      next={<Icon name="right"></Icon>}
      page={(page) =>
        page === 2 ? <Icon prefix="demo-icon" name="emoji-smile"></Icon> : page
      }
    />
  )
}
