import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import sardConfig from 'virtual:sard-config'
import Theme from './Theme'

const {
  site: { title, logo, routes },
} = sardConfig

export default function Header() {
  return (
    <div className="doc-layout-header">
      <h1 className="doc-brand">
        <img src={logo} alt="" />
        <span>{title}</span>
      </h1>
      <ul className="doc-topnav">
        {routes.map((route) => {
          return (
            <li className="doc-topnav-item" key={route.path}>
              <NavLink
                className={({ isActive }) =>
                  classNames('doc-topnav-link', {
                    active: isActive,
                  })
                }
                to={route.path}
                end={route.path === '/'}
              >
                {route.title}
              </NavLink>
            </li>
          )
        })}
        <li className="doc-topnav-divide"></li>
        <li className="doc-topnav-item">
          <Theme></Theme>
        </li>
      </ul>
    </div>
  )
}
