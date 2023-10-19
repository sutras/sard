import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {
  FunctionComponent,
  ReactNode,
  createElement,
  useMemo,
  useState,
} from 'react'
import { List, Popout, PopoutProps } from 'sard'
import { useKeyboard } from './useKeyboard'

export const systemInfo = Taro.getSystemInfoSync()

interface DemoPopupProps {
  children?: ReactNode
  demo: FunctionComponent & { title?: ReactNode }
  index?: number
  popoutProps?: PopoutProps
}

function DemoPopup(props: DemoPopupProps) {
  const { demo, index, popoutProps } = props

  const [visible, setVisible] = useState(false)

  const keyboardHeight = useKeyboard()

  const element = useMemo(() => {
    return createElement(demo)
  }, [demo])

  return (
    <>
      <Popout
        {...popoutProps}
        visible={visible}
        onVisible={setVisible}
        title={`${index}. ${demo.title}`}
        showFooter={false}
      >
        {element}
        <View style={{ height: keyboardHeight }}></View>
      </Popout>

      <List.Item
        title={`${index}. ${demo.title}`}
        linkable
        onClick={() => {
          setVisible(true)
        }}
      />
    </>
  )
}

export default DemoPopup
