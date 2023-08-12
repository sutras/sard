import { NumberKeyboard, Toast } from 'sard-taro'

export default () => {
  return (
    <NumberKeyboard
      random
      onInput={Toast.show}
      onDelete={() => Toast.show('Delete')}
    />
  )
}
