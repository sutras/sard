import { Icon, Pagination } from 'sard'

export default () => {
  return (
    <Pagination
      total={100}
      pageSize={10}
      prev={<Icon name="left" />}
      next={<Icon name="right" />}
      page={(page) =>
        page === 2 ? <Icon family="demo-icons" name="emoji-smile" /> : page
      }
    />
  )
}
