import classNames from 'classnames'
import { useRef, useEffect } from 'react'

export default function Backdrop({ show, onClick, ...restProps }) {
  const elRef = useRef(null)
  const toggleClass = classNames(`doc-layout-backdrop`, {
    show,
  })

  useEffect(() => {
    const handler = (event) => {
      if (event) {
        event.preventDefault()
      }
    }
    if (elRef.current) {
      elRef.current.addEventListener('touchmove', handler, {
        passive: false,
      })
    }
    return () => {
      if (elRef.current) {
        elRef.current.removeEventListener('touchmove', handler)
      }
    }
  }, [])

  return (
    <div
      {...restProps}
      className={toggleClass}
      onClick={onClick}
      ref={elRef}
    ></div>
  )
}
