import { View } from '@tarojs/components'
import {
  ReactElement,
  ReactNode,
  createElement,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Cell, Popup } from 'sard-taro'

interface DemoPopup {
  children?: ReactNode
  demo?: ReactElement
}

function DemoPopup(props) {
  const { demo } = props

  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setVisible(mounted)
  }, [mounted])

  const element = useMemo(() => {
    return createElement(demo)
  }, [demo])

  return (
    <View>
      {mounted && (
        <Popup
          effect="slide-bottom"
          visible={visible}
          onExited={() => setMounted(false)}
          onMaskClick={() => setVisible(false)}
          style={{
            maxHeight: '80%',
            overflowY: 'auto',
            overflowX: 'hidden',
            background: 'var(--sar-emphasis-bg)',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          {element}
        </Popup>
      )}
      <Cell title={demo.title} linkable onClick={() => setMounted(true)}></Cell>
    </View>
  )
}

export default DemoPopup
