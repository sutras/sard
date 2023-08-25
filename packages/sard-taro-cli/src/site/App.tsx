import { RouterProvider } from 'react-router-dom'
import router from './router'
import useHash from './use/useHash'
import { useChannel } from './use/useChannel'
// import React from 'react'

router.subscribe(() => {
  window.scrollTo(0, 0)
})

function App() {
  const channel = useChannel()

  useHash(`.doc-anchor, .doc-catalog-link`, (id) => {
    channel.emit('scrollTo', id)
  })

  // console.log(`[React.version] ${React.version}`)

  return <RouterProvider router={router} />
}

export default App
