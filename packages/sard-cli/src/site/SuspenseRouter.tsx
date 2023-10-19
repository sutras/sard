import { RouterProvider } from 'react-router-dom'
import router from './router'

router.subscribe(() => {
  window.scrollTo(0, 0)
})

export function SuspenseRouter() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  )
}
