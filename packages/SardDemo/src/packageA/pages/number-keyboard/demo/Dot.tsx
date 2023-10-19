import { NumberKeyboard, Toast } from 'sard'

export default () => {
  return (
    <NumberKeyboard
      extraKey="."
      onInput={Toast.show}
      onDelete={() => Toast.show('Delete')}
    />
  )
}
