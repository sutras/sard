import { Icon, Navbar } from 'sard'

export default () => {
  return (
    <Navbar
      flow
      left={
        <Navbar.Item>
          <Icon family="demo-icons" name="list-task" size={20} />
        </Navbar.Item>
      }
      title="发现"
      right={
        <>
          <Navbar.Item>
            <Icon family="demo-icons" name="share" size={18} />
          </Navbar.Item>
          <Navbar.Item>
            <Icon family="demo-icons" name="star" size={20} />
          </Navbar.Item>
          <Navbar.Item>
            <Icon family="demo-icons" name="heart" size={18} />
          </Navbar.Item>
        </>
      }
    />
  )
}
