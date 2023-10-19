import { startTransition, useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { useTopRoute } from '../../use/useRoute'
import SiderToggle from './SiderToggle'
import Backdrop from './Backdrop'

export interface SidebarItem {
  title: string
  url: string
  value?: string
  end?: boolean
}
export interface SidebarGroup {
  title: string
  value: string
  children: SidebarItem[]
}

export interface SidebarProps {
  className?: string
}

export default function Sider() {
  const [show, setShow] = useState(false)

  const sidebarClass = classNames('doc-layout-sider', {
    show,
  })

  const topRoute = useTopRoute()

  const handleNavLinkClick = () => {
    startTransition(() => {
      setShow(false)
    })
  }

  if (
    !topRoute ||
    !Array.isArray(topRoute.children) ||
    topRoute.children.length === 0
  ) {
    return null
  }

  const renderLink = (item) => {
    return (
      <NavLink
        key={item.path}
        className={({ isActive }) =>
          classNames('doc-sidenav-link', {
            active: isActive,
          })
        }
        to={topRoute.path + '/' + item.path}
        onClick={handleNavLinkClick}
      >
        <span className="doc-sidenav-link-title">{item.title}</span>
      </NavLink>
    )
  }

  return (
    <>
      <div className={sidebarClass}>
        <nav className="doc-sidenav">
          {topRoute?.children?.map((groupOrItem) => [
            groupOrItem.type === 'group' ? (
              <div key={groupOrItem.title} className="doc-sidenav-title">
                {groupOrItem.title}
              </div>
            ) : (
              renderLink(groupOrItem)
            ),
            groupOrItem.items?.map((item) => renderLink(item)),
          ])}
        </nav>
      </div>
      <SiderToggle show={show} onClick={() => setShow(!show)}></SiderToggle>
      <Backdrop show={show} onClick={() => setShow(!show)}></Backdrop>
    </>
  )
}
