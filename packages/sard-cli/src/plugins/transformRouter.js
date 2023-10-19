import { resolve } from 'node:path'
import { normalizePath } from 'vite'
import {
  DEFAULT_README_NAME,
  MD_PATH_R,
  CWD_DIR,
  ROUTER_PATH_R,
  sardConfig,
} from '../utils/constants.js'

function deepMapRoutes(routes) {
  function recurse(routes) {
    const mapRoutes = routes
      .map((route) => {
        return route.type === 'group' ? route.items : route
      })
      .flat()
      .map(({ path, filePath, children, index }) => {
        if (filePath && !MD_PATH_R.test(filePath)) {
          filePath = resolve(filePath, DEFAULT_README_NAME)
        }

        if (filePath) {
          filePath = normalizePath(resolve(CWD_DIR, filePath))
        }

        const indexRoute = index
          ? `{
            index: true,
            element: <Navigate to="${index}"></Navigate>
          }`
          : ''

        return `{
          path: '${path}',
          element: ${
            filePath
              ? `React.createElement(React.lazy(() => {
                  NProgress.start()
                  return import('${filePath}').finally(() => {
                    NProgress.done()
                  })
                }))`
              : '<Outlet></Outlet>'
          },
          children: ${
            Array.isArray(children)
              ? index
                ? `[${indexRoute},${recurse(children).slice(1)}`
                : recurse(children)
              : null
          },
        }`
      })

    return '[' + mapRoutes.join(',') + ']'
  }

  return recurse(routes)
}

async function transform(id) {
  if (!ROUTER_PATH_R.test(id)) {
    return
  }

  const {
    site: { routes },
  } = sardConfig

  const routesStr = deepMapRoutes(routes)

  const code = `import React from 'react'
    import { createHashRouter, Navigate, Outlet } from 'react-router-dom'
    import BasicLayout from '@@/components/layout/BasicLayout.tsx'
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css'

    const router = createHashRouter([
      {
        path: '/',
        element: <BasicLayout />,
        children: ${routesStr}
      }
    ])

    export default router`

  return code
}

export function transformRouter() {
  return {
    name: 'transformRouter',
    enforce: 'pre',
    transform(_, id) {
      return transform(id)
    },
  }
}
