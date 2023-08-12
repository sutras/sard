import { NumberKeyboard, Toast } from 'sard-taro'

export default () => {
  return (
    <NumberKeyboard
      extraKey="."
      onInput={Toast.show}
      onDelete={() => Toast.show('Delete')}
    />
  )
}
