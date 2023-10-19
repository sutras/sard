import { NumberKeyboard, Toast } from 'sard'

export default () => {
  return (
    <NumberKeyboard
      onInput={Toast.show}
      onDelete={() => Toast.show('Delete')}
    />
  )
}
