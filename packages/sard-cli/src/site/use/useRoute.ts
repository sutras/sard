import { useLocation } from 'react-router-dom'

import sardConfig from 'virtual:sard-config'

const { site: { routes } = { routes: [] } } = sardConfig

export function useTopRoute() {
  const location = useLocation()

  return routes.find((route) => {
    return route.path === '/'
      ? location.pathname === route.path
      : location.pathname.startsWith(route.path)
  })
}

export default useTopRoute
