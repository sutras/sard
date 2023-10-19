import { useEffect, useMemo } from 'react'
import { useBuildChannel, useChannel } from '../../use/useChannel'

import { useLocation } from 'react-router-dom'
import useEvent from '../../use/useEvent'

function getComponentPathName(path: string) {
  return path.replace(/^.*\//, '')
}

export default function Mobile() {
  const baseUrl = '__MOBILE_URL_PLACEHOLDER__'
  const url = baseUrl

  const location = useLocation()

  const visible = useMemo(() => {
    return /^\/components/.test(location.pathname)
  }, [location.pathname])

  const { build, destroy } = useBuildChannel()

  const iframeCb = (iframe: HTMLIFrameElement) => {
    if (iframe) {
      build(iframe)
    } else {
      destroy()
    }
  }

  const channel = useChannel()

  const emitRoute = useEvent(() => {
    channel.emit('route', getComponentPathName(location.pathname))
  })

  useEffect(() => {
    channel.on('loaded', emitRoute)

    return () => {
      channel.off('loaded', emitRoute)
    }
  }, [])

  useEffect(() => {
    emitRoute()
  }, [location.pathname])

  return (
    <>
      {visible && (
        <div className="doc-mobile">
          <iframe
            src={url}
            ref={iframeCb}
            className="doc-mobile-iframe"
          ></iframe>
          <div className="doc-mobile-toolbar">
            <div
              className="doc-mobile-open"
              onClick={() => {
                window.open(
                  `${baseUrl}/#/packageA/pages/${getComponentPathName(
                    location.pathname,
                  )}/index`,
                )
              }}
            >
              在新窗口打开⤴
            </div>
          </div>
        </div>
      )}
    </>
  )
}
