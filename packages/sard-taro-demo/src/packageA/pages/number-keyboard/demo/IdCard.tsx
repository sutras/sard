import { NumberKeyboard, Toast } from 'sard-taro'

export default () => {
  return (
    <NumberKeyboard
      extraKey="X"
      onInput={Toast.show}
      onDelete={() => Toast.show('Delete')}
    />
  )
}
