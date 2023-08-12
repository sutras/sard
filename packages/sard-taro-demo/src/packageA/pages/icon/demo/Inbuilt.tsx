import { Mesh } from 'sard-taro'

const inbuiltIcons = [
  'play',
  'caret-down-fill',
  'caret-left-fill',
  'caret-right-fill',
  'caret-up-fill',
  'keyboard-hide',
  'caret-down',
  'backspace',
  'record-circle',
  'file',
  'x-circle-fill',
  'square',
  'check-square-fill',
  'image',
  'star',
  'star-fill',
  'x-circle',
  'circle-fill',
  'empty',
  'warning-fill',
  'info-circle-fill',
  'question-circle-fill',
  'x-octagon-fill',
  'check-circle-fill',
  'person',
  'fail',
  'success',
  'close',
  'question',
  'info',
  'minus',
  'plus',
  'up',
  'down',
  'left',
  'right',
  'search',
  'circle',
]

export default () => {
  return (
    <Mesh>
      {inbuiltIcons.map((name) => {
        return (
          <Mesh.Item
            wrapperStyle={{ justifyContent: 'flex-start' }}
            key={name}
            iconProps={{ name }}
            text={name}
          ></Mesh.Item>
        )
      })}
    </Mesh>
  )
}
