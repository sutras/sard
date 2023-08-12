import {
  ReactElement,
  ReactNode,
  createElement,
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

  const element = useMemo(() => {
    return createElement(demo)
  }, [demo])

  return (
    <>
      <Popup
        effect="slide-bottom"
        visible={visible}
        onMaskClick={() => setVisible(false)}
        style={{
          maxHeight: '80%',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: '#fff',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        {element}
      </Popup>
      <Cell title={demo.title} linkable onClick={() => setVisible(true)}></Cell>
    </>
  )
}

export default DemoPopup
