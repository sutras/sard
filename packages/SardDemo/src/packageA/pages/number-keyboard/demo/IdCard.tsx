import { NumberKeyboard, Toast } from 'sard'

export default () => {
  return (
    <NumberKeyboard
      extraKey="X"
      onInput={Toast.show}
      onDelete={() => Toast.show('Delete')}
    />
  )
}
