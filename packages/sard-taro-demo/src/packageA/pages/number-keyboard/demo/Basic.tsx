import { NumberKeyboard, Toast } from 'sard-taro'

export default () => {
  return (
    <NumberKeyboard
      onInput={Toast.show}
      onDelete={() => Toast.show('Delete')}
    />
  )
}
