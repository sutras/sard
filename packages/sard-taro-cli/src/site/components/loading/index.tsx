import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
// import { useLocation, useNavigation, useNavigationType } from 'react-router-dom'

export interface LoadingProps {
  className?: string
}

export default function Loading() {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  // const navigationType = useNavigationType()
  // const location = useLocation()

  return <div className="doc-loading">加载中...</div>
}
